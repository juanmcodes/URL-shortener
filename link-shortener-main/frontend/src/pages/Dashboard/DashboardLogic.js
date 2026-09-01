import { useCallback, useState } from 'react'
import Links from './Tabs/Links/Links.jsx'
import Settings from './Tabs/Settings/Settings.jsx'
import callToBackend from '../../config/config.js'

export const useDashboard = (userSession) => {
  const [isCrafterModalOpen, setIsCrafterModalOpen] = useState(false)
  const [isAnyModalOpen, setisAnyModalOpen] = useState(false);
  const [linkStored, setLinkStored] = useState([])
  const [activeTab, setActiveTab] = useState('links')
  const [isLoading, setIsLoading] = useState(true);

  const onOpenCrafterModal = () => {
    setIsCrafterModalOpen(true)
  }

  const onCloseCrafterModal = () => {
    setIsCrafterModalOpen(false)
    getUserLinks()
  }

  const tabs = {
    links: Links,
    settings: Settings,
  }

  const getUserLinks = useCallback(async () => {
    const { accessToken } = userSession

    try {
      setIsLoading(true)
      const response = await fetch(`${callToBackend}/links/my-links`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) throw new Error("Can't get links")

      const data = await response.json()

      const formattedLinks = data.map(link => ({
        id: link.id,
        originalUrl: link.original_url,
        shortUrl: link.short_url,
        userId: link.user_id,
        createdAt: link.created_at
      }))

      setLinkStored(formattedLinks)

    } catch (error) {
      console.error('Error getting links from user:', error)
    } finally {
      setIsLoading(false)
    }
  },[userSession])

  return {
    isCrafterModalOpen,
    onOpenCrafterModal,
    onCloseCrafterModal,
    activeTab,
    setActiveTab,
    tabs,
    isLoading,
    getUserLinks,
    linkStored,
    isAnyModalOpen,
    setisAnyModalOpen
  }
}
