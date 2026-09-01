import React from 'react'
import './ConfirmAlert.css'
import Button from '../Button/Button.jsx'
import { IoWarningOutline } from 'react-icons/io5'

const ConfirmAlert = ({isVisible, deleteUserAccount, onCloseConfirmAlert}) => {
  return (
    <div id="confirm-alert" className={isVisible ? 'visible' : 'hidden'}>
      <div className="dialog">
        <div className="alert">
          <IoWarningOutline className="warning" />
          <span className="text">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </span>
        </div>
        <div className="buttons">
          <Button 
						className="accept-delete"
						onClick={deleteUserAccount}
					>
						Accept
					</Button>
          <Button 
						className="cancel-delete"
						onClick={onCloseConfirmAlert}
					>
						Cancel
					</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAlert
