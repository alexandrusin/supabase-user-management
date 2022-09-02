export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const DEFAULT_AVATARS_BUCKET = 'avatars'

export type Profile = {
  id: string
  avatar_url: string
  first_name: string
  last_name: string
  phone_number: string
  updated_at: string
  user_type: string
  company: string
  birthday: string
}


export type ModelProfile = Profile & {
  birthday: string
}


export type ClientProfile = Profile & {
  company: string
  website: string
}
