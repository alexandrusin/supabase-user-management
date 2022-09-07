import { Profile } from '../lib/constants'
import Avatar from './Avatar'

type Props = {
  profile: Profile
  onClick: () => void
}

export default function ProfileCard({ profile, onClick }: Props) {
  const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null

  return (
    <div className="profile-card card" onClick={onClick}>
      <Avatar url={profile.avatar_url} size={250} />
      <br />
      <h3 className="user-name headline4">{profile.first_name}</h3>
      <div className="user-info caption text-grey">
        {profile.user_type} <br />
        {profile.company ? profile.company : ''} <br />
        Last updated{' '}
        {lastUpdated
          ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
          : 'Never'}
      </div>
    </div>
  )
}
