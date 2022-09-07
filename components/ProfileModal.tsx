import { useState } from 'react'
import { Profile } from '../lib/constants'
import Avatar from './Avatar'
import Modal from './Modal'

type Props = {
  profile: Profile
  onClose: () => void
}

export default function ProfileModal({ profile, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)
  console.log('PROFILE', profile)

  const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null
  const calculateAge = (birthday?: string) => {
    if (!birthday) return false
    var dob = new Date(birthday)
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime()
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff)
    //extract year from date
    var year = age_dt.getUTCFullYear()
    //now return the age of the user
    return Math.abs(year - 1970)
  }

  return (
    <Modal open={showModal} onClose={onClose}>
      <div className="user-profile">
        <Avatar url={profile.avatar_url} size={250} />
        <div className="user-data">
          <p className="user-name">
            {profile.first_name} ({profile.user_type})
          </p>

          <div className="row">
            <span className="label">Varsta</span>
            <span className="data">
              {profile.birthday ? calculateAge(profile.birthday) + ' ani' : ''}
            </span>
          </div>

          <div className="row">
            <span className="label">Gen</span>
            <span className="data">{profile.gender}</span>
          </div>

          <div className="row">
            <span className="label">Greutate</span>
            <span className="data">{profile.weight}</span>
          </div>
          <div className="row">
            <span className="label">Inaltime</span>
            <span className="data">{profile.height}</span>
          </div>
          <div className="row">
            <span className="label">Masuratori</span>
            <span className="data">{profile.measurements}</span>
          </div>
          <div className="row">
            <span className="label">Culoare ochi</span>
            <span className="data">{profile.eye_color}</span>
          </div>
          <div className="row">
            <span className="label">Culoare par</span>
            <span className="data">{profile.hair_color}</span>
          </div>
          <div className="row">
            <span className="label">Culoare piele</span>
            <span className="data">{profile.skin_color}</span>
          </div>

          <p className="helper-text">
            Last updated{' '}
            {lastUpdated
              ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
              : 'Never'}
          </p>
        </div>
        <div />
      </div>
    </Modal>
  )
}
