import React from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
  children: JSX.Element[] | JSX.Element
  open: boolean
  onClose: any // TODO: this needs a type
}

export default function Modal({ children, open, onClose }: Props) {
  const handleClose = () => {
    onClose()
  }

  return (
    <div className="modal">
      <div className="card">
        <MdClose className="close-btn" onClick={() => handleClose()} />
        {children}
      </div>
      <div className="backdrop" onClick={() => handleClose()}></div>
    </div>
  )
}
