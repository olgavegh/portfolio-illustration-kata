import { supabase } from "./supabase";

// Get artworks marked for homepage masonry (all/all)
export async function getArtworks() {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get artworks filtered by category (all/category)
export async function getArtworksByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("category_slug", categorySlug)
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get artworks one by project marked for homepage masonry (cover = true) (project/all)
export async function getProjectCovers() {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("cover", true)
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get project filtered by category (project/category)
export async function getProjectCoversByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("cover", true)
    .eq("category_slug", categorySlug)
    .order("order_index");

  if (error) throw error;
  return data;
}

// Get all artworks for a specific project
export async function getArtworksByProject(projectSlug) {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("project_slug", projectSlug)
    .order("order_index");

  if (error) throw error;
  return data;
}
