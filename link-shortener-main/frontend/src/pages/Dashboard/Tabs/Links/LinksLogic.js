import { useState } from 'react'
import callToBackend from '../../../../config/config.js'

export const useLinksLogic = (
  feedToast,
  userSession,
  onCloseCrafterModal,
  getUserLinks,
  linkStored,
  setisAnyModalOpen
) => {
  const [linkDataUser, setlinkDataUser] = useState({
    originalUrl: '',
    shortUrl: '',
    userId: '',
  })
  const [linkToSearch, setLinkToSearch] = useState({ findShortUrl: '' })
  const [searchResults, setSearchResults] = useState([])
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [linkDataUpdate, setLinkDataUpdate] = useState({
    linkId: '',
    originalUrl: '',
    shortUrl: '',
  })

  const getSearchInputElement = (element) => {
    const { name, value } = element.target
    setLinkToSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (value === '') {
      setSearchResults([])
    }
  }

  const clearLinkToSearch = () => {
    setLinkToSearch({ findShortUrl: '' })
    setSearchResults([])
    getUserLinks()
  }

  const searchLink = async () => {
    const { findShortUrl } = linkToSearch
    const { accessToken } = userSession

    try {
      const response = await fetch(
        `${callToBackend}/links/search-link?findShortUrl=${findShortUrl}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!response.ok) throw new Error("Can't fetch search results")
      const data = await response.json()

      const formattedLinks = data.map((link) => ({
        id: link.id,
        originalUrl: link.original_url,
        shortUrl: link.short_url,
        userId: link.user_id,
        createdAt: link.created_at,
      }))

      setSearchResults(formattedLinks)
    } catch (error) {
      console.error('Error while searching links: ', error)
      feedToast('error') //!! <- pasar a no hay coincidencias
    }
  }

  const getCreateInputElement = (element) => {
    const { name, value } = element.target
    setlinkDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const createButton = async () => {
    const { originalUrl, shortUrl } = linkDataUser
    const updatedLinkData = { ...linkDataUser, userId: userSession.userId }

    if (!originalUrl || !shortUrl) {
      feedToast('both')
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLinkData),
      })

      if (response.ok) {
        const result = await response.json()
        feedToast('created')
        setlinkDataUser({ originalUrl: '', shortUrl: '' })
        onCloseCrafterModal()
      } else {
        const errorResponse = await response.json()
        if (
          response.status === 409 &&
          errorResponse.code === 'DUPLICATE_SHORTURL'
        ) {
          feedToast('duplicate')
        } else {
          feedToast('error')
        }
      }
    } catch (error) {
      console.error('Error while crafting a link:', error)
      feedToast('error')
    }
  }

  const handleCopy = (shortUrl) => {
    const domain = window.location.origin
    const fullUrl = `${domain}/${shortUrl}`

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        feedToast('copy')
      })
      .catch((err) => {
        console.error('Error to copy:', err)
        feedToast('error')
      })
  }

  const handleDelete = async (id) => {
    const { accessToken } = userSession

    if (!id) {
      feedToast('error')
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) throw new Error("Can't delete the link")

      const data = await response.json()

      feedToast('delete')

      setTimeout(() => {
        getUserLinks()
      }, 300)
    } catch (error) {
      console.error('Error while deleteing a link:', error)
      feedToast('error')
    }
  }

  const onOpenUpdateModal = (id) => {
    const selectedLink = linkStored.find((link) => link.id === id)
    if (selectedLink) {
      setLinkDataUpdate({
        linkId: selectedLink.id,
        originalUrl: selectedLink.originalUrl,
        shortUrl: selectedLink.shortUrl,
        userId: selectedLink.userId,
      })
      setIsUpdateModalOpen(true)
      setisAnyModalOpen(true)
    }
  }

  const onCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setisAnyModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLinkDataUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUpdateLink = async () => {
    const { linkId, shortUrl } = linkDataUpdate
    const { accessToken } = userSession

    if (!linkId) {
      console.error('Link ID is undefined')
      feedToast('error')
      return
    }

    if (!shortUrl) {
      feedToast('both')
      return
    }

    try {
      const response = await fetch(`${callToBackend}/links/${linkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newShortUrl: shortUrl }),
      })

      if (!response.ok) throw new Error("Can't update the link")
      const data = await response.json()

      feedToast('update')
      getUserLinks()
      onCloseUpdateModal()
    } catch (error) {
      console.error('Error while updating the link: ', error)
      feetToast('error')
    }
  }

  return {
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
  }
}
