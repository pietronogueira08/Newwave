import { createClient } from '@supabase/supabase-js'

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface CoverageLead {
  bairro_ou_cep: string
  nome?: string
  whatsapp?: string
  coberto: boolean
}

export async function saveCoverageLead(lead: CoverageLead) {
  const { data, error } = await supabase
    .from('coverage_leads')
    .insert([lead])
    .select()

  if (error) {
    console.error('[Supabase] Error saving lead:', error)
    throw error
  }

  return data
}
