export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const DEFAULT_AVATARS_BUCKET = 'avatars'

export type Profile = {
  id: string
  user_type: string
  updated_at: string
  avatar_url: string

  first_name: string
  last_name: string

  phone_number: string
  address: string
  city: string
  country: string

  birthday: string
  gender: string
  height: number
  weight: number
  measurements: string
  eye_color: string
  hair_color: string
  skin_color: string

  company: string
  website: string
}

export type ModelProfile = Profile & {
  birthday: string
}

export type ClientProfile = Profile & {
  company: string
  website: string
}
