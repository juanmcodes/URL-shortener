import React from 'react'
import './CrafterModal.css'
import Button from '../Button/Button.jsx'
import InputLink from '../InputLink/InputLink.jsx'
import InputShort from '../InputShort/InputShort.jsx'
import { IoIosClose } from 'react-icons/io'
import { LuRocket } from 'react-icons/lu'

const CrafterModal = ({
  linkDataUser,
  isVisible,
  onCloseCrafterModal,
  getCreateInputElement,
  createButton,
}) => {
  return (
    <div id="crafter-modal" className={isVisible ? 'visible' : 'hidden'}>
      <div className="dialog">
        <div className="header">
          <p className="header-tittle">Create a link</p>
          <div className="button-cont">
            <Button
              area-label="Close modal"
              className={'close'}
              Icon={IoIosClose}
              onClick={onCloseCrafterModal}
            />
          </div>
        </div>
        <div className="input-section">
          <div className="pair-elements">
            <label className="labels">Destination URL:</label>
            <InputLink
              className={'inputs'}
              name="originalUrl"
              value={linkDataUser.originalUrl}
              onChange={getCreateInputElement}
            />
          </div>
          <div className="pair-elements">
            <label className="labels">Short link:</label>
            <InputShort
              className={'inputs'}
              name="shortUrl"
              value={linkDataUser.shortUrl}
              onChange={getCreateInputElement}
            />
          </div>
        </div>
        <div className="buttons-section">
          <Button className="cancel" onClick={onCloseCrafterModal}>
            Cancel
          </Button>
          <Button 
						className="create-shortLink" 
						Icon={LuRocket} 
						onClick={createButton}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CrafterModal
