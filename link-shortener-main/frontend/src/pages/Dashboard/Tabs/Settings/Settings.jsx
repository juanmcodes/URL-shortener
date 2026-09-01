import React from 'react'
import { useSettingsLogic } from './SettingsLogic.js'
import './Settings.css'
import Button from '../../../../components/Button/Button.jsx'
import ConfirmAlert from '../../../../components/ConfirmAlert/ConfirmAlert.jsx'
import { IoWarningOutline } from 'react-icons/io5'
import { FiLock } from 'react-icons/fi'
import { FiDownload } from 'react-icons/fi'
import { TbHeartBroken } from 'react-icons/tb'

const Settings = ({ userInfoSettings, userSession, feedToast }) => {
  const {
    deleteUserAccount,
    downloadLinksAsJson,
    isConfirmAlertOpen,
    onOpenConfirmAlert,
    onCloseConfirmAlert,
  } = useSettingsLogic(userSession, feedToast)

  return (
    <div id="settings-window">
      <div className="user-section">
        <p className="title">General</p>
        <div className="info-section">
          <div className="data-section">
            <label className="label">Your name:</label>
            <div className="input-section">
              <input 
                className="input" 
                value={userInfoSettings.userName} 
                readOnly
              />
              <FiLock className="lock-icon" />
            </div>
          </div>
          <div className="data-section">
            <label className="label">Your email:</label>
            <div className="input-section">
              <input 
                className="input" 
                value={userInfoSettings.userEmail} 
                readOnly
                />
              <FiLock className="lock-icon" />
            </div>
          </div>
        </div>
        <p className="subtitle">
          <IoWarningOutline /> Personal information is managed by your OAuth
          provider.
        </p>
      </div>
      <div className="account-section">
        <p className="title">Account</p>
        <div className="manage-section">
          <div className="export-section">
            <label className="label">Export to JSON:</label>
            <Button
              className="export"
              Icon={FiDownload}
              onClick={downloadLinksAsJson}
            >
              Export All Links
            </Button>
          </div>
          <div className="delete-user-section">
            <label className="label">Delete account:</label>
            <Button
              className="delete-user"
              Icon={TbHeartBroken}
              onClick={onOpenConfirmAlert}
            >
              Delete Account
            </Button>
          </div>
        </div>
        <p className="subtitle">Developed by BeruzDev.</p>
      </div>
      <ConfirmAlert
        isVisible={isConfirmAlertOpen}
        onCloseConfirmAlert={onCloseConfirmAlert}
        deleteUserAccount={deleteUserAccount}
      />
    </div>
  )
}

export default Settings
