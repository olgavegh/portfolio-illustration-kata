import { supabase } from "./supabase";

// Get all published projects
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get single project by slug (for project detail page)
export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

// Only fetches slug + order_index — for dot navigation
export async function getProjectsIndex() {
  const { data } = await supabase
    .from('projects')
    .select('slug, order_index')
    .eq('published', true)
    .order('order_index')
  return data ?? []
}

// Only fetches slug + title — minimal payload
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