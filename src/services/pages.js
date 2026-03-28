import { supabase } from './supabase'
import { withCache } from './cache'

export async function getPageBySlug(slug) {
  return withCache(`page:${slug}`, async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    if (error) throw error
    return data
  })
}
