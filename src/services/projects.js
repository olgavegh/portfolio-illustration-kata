import { supabase } from './supabase'

// Get all published projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('order_index')

  if (error) throw error
  return data
}

// Get single project by slug (for project detail page)
export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data
}
