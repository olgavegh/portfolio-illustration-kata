import { supabase } from './supabase'

// Get all categories (for filter menu)
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index')

  if (error) throw error
  return data
}
