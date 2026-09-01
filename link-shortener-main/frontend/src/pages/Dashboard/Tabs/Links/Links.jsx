import React from 'react'
import './Links.css'
import { useLinksLogic } from './LinksLogic.js'
import InpuntSearch from '../../../../components/InputSearch/InpuntSearch.jsx'
import Button from '../../../../components/Button/Button.jsx'
import CrafterModal from '../../../../components/CrafterModal/CrafterModal.jsx'
import LinkElement from '../../../../components/LinkElement/LinkElement.jsx'
import { FaPlus } from 'react-icons/fa6'
import UpdateModal from '../../../../components/UpdateModal/UpdateModal.jsx'
import SkeletonLinkElement from '../../../../components/SkeletonLinkElement/SkeletonLinkElement.jsx'

const Links = ({
  isCrafterModalOpen,
  onOpenCrafterModal,
  onCloseCrafterModal,
  feedToast,
  userSession,
  linkStored,
  isLoading,
  getUserLinks,
  setisAnyModalOpen
}) => {
  const {
    linkDataUser,
    linkToSearch,
    searchResults,
    getSearchInputElement,
    clearLinkToSearch,
    searchLink,
    getCreateInputElement,
    createButton,
    handleCopy,
    handleDelete,
    isUpdateModalOpen,
    onOpenUpdateModal,
    onCloseUpdateModal,
    linkDataUpdate,
    handleInputChange,
    handleUpdateLink,
  } = useLinksLogic(
    feedToast,
    userSession,
    onCloseCrafterModal,
    getUserLinks,
    linkStored,
    setisAnyModalOpen,
  )

  return (
    <div className="links-window">
      <div className="buttons-section">
        <InpuntSearch
          name="findShortUrl"
          value={linkToSearch.findShortUrl}
          onChange={getSearchInputElement}
          clearLinkToSearch={clearLinkToSearch}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchLink();
            }
          }}
        />
        <Button
          className="create-link"
          Icon={FaPlus}
          onClick={onOpenCrafterModal}
        >
          Create Link
        </Button>
      </div>
      <div className="bento-section">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLinkElement key={index} />
          ))
          : (searchResults.length > 0 ? searchResults : linkStored).map((link) => (
          <LinkElement
						key={link.id}
						id={link.id}
						originalUrl={link.originalUrl}
						shortUrl={link.shortUrl}
						createdAt={link.createdAt}
						handleCopy={() => handleCopy(link.shortUrl)}
						handleDelete={() => handleDelete(link.id)}
						onOpenUpdateModal={() => onOpenUpdateModal(link.id)}
						getCreateInputElement={getCreateInputElement}
					/>
        ))}
      </div>

      <CrafterModal
        linkDataUser={linkDataUser}
        isVisible={isCrafterModalOpen}
        onCloseCrafterModal={onCloseCrafterModal}
        createButton={createButton}
        getCreateInputElement={getCreateInputElement}
        userSession={userSession}
      />

      <UpdateModal
        isVisible={isUpdateModalOpen}
        onCloseUpdateModal={onCloseUpdateModal}
        handleInputChange={handleInputChange}
        handleUpdateLink={handleUpdateLink}
        id={linkDataUpdate.id}
        originalUrl={linkDataUpdate.originalUrl}
        shortUrl={linkDataUpdate.shortUrl}
      />
    </div>
  )
}

export default Links
