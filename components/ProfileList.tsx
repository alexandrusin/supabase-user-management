import ProfileCard from '../components/ProfileCard'
import { Profile } from '../lib/constants'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useReducer, useState } from 'react'
import ProfileModal from './ProfileModal'

/**
 * Since we want this component to update in realtime,
 * we should use "useReducer" for sending Realtime events
 */

type State = {
  profiles: Profile[]
}
type Action = {
  type?: string
  payload: any
}
type ProfileListProps = {
  profiles: Profile[]
}

const handleDatabaseEvent = (state: State, action: Action) => {
  if (action.type === 'upsert') {
    const otherProfiles = state.profiles.filter(
      (x) => x.id != action.payload.id
      // (x) => x.id != action.payload.id && x.user_type === 'model'
    )
    return {
      profiles: [action.payload, ...otherProfiles],
    }
  } else if (action.type === 'set') {
    return {
      profiles: action.payload,
    }
  }
  return { profiles: [] }
}

export default function ProfileList({ profiles }: ProfileListProps) {
  const initialState: State = { profiles }
  const [state, dispatch] = useReducer(handleDatabaseEvent, initialState)
  const [showModal, setShowModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  useEffect(() => {
    supabase
      .channel('subscription', {})
      .on(
        'realtime',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {}
      )
      .subscribe()

    return () => {
      supabase
        .channel('subscription', {})
        .on(
          'realtime',
          { event: '*', schema: 'public', table: 'profiles' },
          () => {}
        )
        .unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch({ type: 'set', payload: profiles })
  }, [profiles])

  return (
    <>
      {state.profiles.length === 0 ? (
        <p className="opacity-half m-0 font-light">
          There are no public profiles created yet
        </p>
      ) : (
        <>
          <h3>Model Profiles</h3>
          <hr />
          <br />
          <div className="profile-list">
            {state.profiles
              ?.filter((profile: any) => profile.user_type === 'model')
              .map((profile: any) => (
                <ProfileCard
                  profile={profile}
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                />
              ))}
          </div>
          {selectedProfile && (
            <ProfileModal
              profile={selectedProfile}
              key={selectedProfile.id}
              onClose={() => setSelectedProfile(null)}
            />
          )}
          <br />
          <br />
          <h3>Client Profiles</h3>
          <hr />
          <br />
          <div className="profile-list">
            {state.profiles
              ?.filter((profile: any) => profile.user_type === 'client')
              .map((profile: any) => (
                <ProfileCard
                  profile={profile}
                  key={profile.id}
                  onClick={() => setShowModal(!showModal)}
                />
              ))}
          </div>
        </>
      )}
    </>
  )
}
