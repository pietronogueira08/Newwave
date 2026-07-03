import { createClient, SupabaseClient } from '@supabase/supabase-js'

/*
 * Supabase schema (run this SQL in your Supabase SQL Editor):
 *
 * create table coverage_leads (
 *   id         uuid primary key default gen_random_uuid(),
 *   created_at timestamptz default now(),
 *   bairro_ou_cep text not null,
 *   nome       text,
 *   whatsapp   text,
 *   coberto    boolean not null
 * );
 */

let _supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Supabase features will be disabled. ' +
      'Add them to .env.local or your Vercel environment variables.'
    )
    return null
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

export interface CoverageLead {
  bairro_ou_cep: string
  nome?: string
  whatsapp?: string
  coberto: boolean
}

export async function saveCoverageLead(lead: CoverageLead) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      console.warn('[Supabase] Client not available — skipping lead save.')
      return null
    }

    const { data, error } = await supabase
      .from('coverage_leads')
      .insert([lead])
      .select()

    if (error) {
      console.error('[Supabase] Error saving lead:', error)
      throw error
    }

    return data
  } catch (err) {
    console.error('[Supabase] Could not save lead:', err)
    // Don't crash the UI if Supabase isn't configured yet
    return null
  }
}
