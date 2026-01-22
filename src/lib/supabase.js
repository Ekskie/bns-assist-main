"use client";
import { createClient } from "@supabase/supabase-js";

let _client; // singleton

export function getSupabase() {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  
  if (!url || !key) {
    // Return null or throw depending on preference. Throwing ensures we catch config errors.
    console.error("Missing Supabase URL or Key");
    return null;
  }

  _client = createClient(url, key);
  return _client;
}

// 🔹 Added named export 'supabase' to fix the import error in widgets
export const supabase = getSupabase();