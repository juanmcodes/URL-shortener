import React from 'react'
import './UpdateModal.css'
import Button from '../Button/Button.jsx'
import InputLink from '../InputLink/InputLink.jsx'
import InputShort from '../InputShort/InputShort.jsx'
import { IoIosClose } from 'react-icons/io'
import { LuSave } from 'react-icons/lu'

const UpdateModal = ({
  isVisible,
  onCloseUpdateModal,
  originalUrl,
  shortUrl,
  handleInputChange,
  handleUpdateLink
}) => {
  return (
    <div id="update-modal" className={isVisible ? 'visible' : 'hidden'}>
      <div className="dialog">
        <div className="header">
          <p className="header-tittle">Edit your short</p>
          <div className="button-cont">
            <Button
              className="close"
              area-label="Close modal"
              Icon={IoIosClose}
              onClick={onCloseUpdateModal}
            />
          </div>
        </div>
        <div className="input-section">
          <div className="pair-elements">
            <label className="labels">Destination URL:</label>
            <div className='original-link-locker'>
              <InputLink
                className="inputs locked-input"
                readOnly
                name="originalUrl"
                value={originalUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pair-elements">
            <label className="labels">Short link:</label>
            <InputShort
              className="inputs"
              name="shortUrl"
              value={shortUrl}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="buttons-section">
          <Button className="cancel" onClick={onCloseUpdateModal}>
            Cancel
          </Button>
          <Button
            className="create-shortLink"
            Icon={LuSave}
            onClick={handleUpdateLink}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdateModal
