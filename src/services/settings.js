import { supabase } from './supabase'
import { withCache } from './cache'

export async function getSettings() {
  return withCache('settings', async () => {
    const { data, error } = await supabase.from('settings').select('*')
    if (error) throw error
    const settings = {}
    data.forEach((item) => { settings[item.key] = item.value })
    return settings
  })
}

export async function getSetting(key) {
  const settings = await getSettings()
  return settings[key] ?? null
}
