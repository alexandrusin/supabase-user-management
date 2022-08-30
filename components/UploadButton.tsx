import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>
  loading: boolean
}

export default function UploadButton(props: UploadButtonProps) {
  return (
    <>
      <label className="button primary-button" htmlFor="single">
        {props.loading ? 'Uploading ...' : 'Upload'}
      </label>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: '200px',
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </>
  )
}
