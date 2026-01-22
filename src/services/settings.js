import { supabase } from './supabase'

// Get all settings (returns object with key-value pairs)
export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')

  if (error) throw error

  // Convert array to object: { site_title: "Kata Studio", ... }
  const settings = {}
  data.forEach((item) => {
    settings[item.key] = item.value
  })

  return settings
}

// Get single setting by key
export async function getSetting(key) {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) throw error
  return data.value
}
