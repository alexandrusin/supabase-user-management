import { useState } from 'react'
import { Profile } from '../lib/constants'
import Avatar from './Avatar'
import Modal from './Modal'

export default function ProfileCard({ profile }: { profile: Profile }) {
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
    <>
      <div
        className="profile-card card"
        onClick={() => setShowModal(!showModal)}
      >
        <Avatar url={profile.avatar_url} size={250} />
        <div className="user-info">
          <p className="user-name">{profile.first_name}</p>

          <p className="user-age">
            {profile.user_type} <br />
            <br />
            {profile.company ? profile.company : ''}
            {profile.birthday ? calculateAge(profile.birthday) + ' ani' : ''}
          </p>
          <p className="caption text-grey">
            Last updated{' '}
            {lastUpdated
              ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
              : 'Never'}
          </p>
        </div>
        <div />
      </div>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="profile-card">
            <Avatar url={profile.avatar_url} size={250} />
            <div className="user-info">
              <p className="user-name">{profile.first_name}</p>

              <p className="user-age">
                {profile.user_type} <br />
                <br />
                {profile.company ? profile.company : ''}
                {profile.birthday
                  ? calculateAge(profile.birthday) + ' ani'
                  : ''}
              </p>
              <p className="caption text-grey">
                Last updated{' '}
                {lastUpdated
                  ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                  : 'Never'}
              </p>
            </div>
            <div />
          </div>
        </Modal>
      )}
    </>
  )
}
