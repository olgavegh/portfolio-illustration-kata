import { supabase } from './supabase'

// Get page by slug (About, etc.)
export async function getPageBySlug(slug) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data
}
