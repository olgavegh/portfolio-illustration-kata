import { supabase } from './supabase'
import { withCache } from './cache'

export async function getProjects() {
  return withCache('projects', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    if (error) throw error
    return data
  })
}

export async function getProjectBySlug(slug) {
  return withCache(`project:${slug}`, async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  })
}

export async function getProjectsIndex() {
  return withCache('projects:index', async () => {
    const { data } = await supabase
      .from('projects')
      .select('slug, order_index')
      .eq('published', true)
      .order('order_index')
    return data ?? []
  })
}

export async function getPrevProject(orderIndex) {
  const { data } = await supabase
    .from('projects')
    .select('slug, title')
    .lt('order_index', orderIndex)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data
}

export async function getNextProject(orderIndex) {
  const { data } = await supabase
    .from('projects')
    .select('slug, title')
    .gt('order_index', orderIndex)
    .order('order_index', { ascending: true })
    .limit(1)
    .maybeSingle()
  return data
}
