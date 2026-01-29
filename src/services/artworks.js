import { supabase } from "./supabase";

// Get all published artworks (for homepage masonry)
export async function getArtworks() {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("published", true)
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get artworks filtered by category
export async function getArtworksByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("published", true)
    .eq("category_slug", categorySlug)
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get all artworks for a specific project (even if unpublished)
export async function getArtworksByProject(projectSlug) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("project_slug", projectSlug)
    .order("order_index");

  if (error) throw error;
  return data;
}
