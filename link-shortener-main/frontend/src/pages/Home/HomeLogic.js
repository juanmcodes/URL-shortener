import { useState } from 'react'
import callToBackend from '../../config/config.js'

export const useHomeLogic = (feedToast, guestId) => {
  const [linkData, setLinkData] = useState({ originalUrl: '', shortUrl: '' })

  const getInputElement = (element) => {
    const { name, value } = element.target
    setLinkData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const craftButton = async () => {
    const { originalUrl, shortUrl } = linkData

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
        body: JSON.stringify({
          originalUrl: originalUrl,
          shortUrl: shortUrl,
          guestId,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        feedToast('success')
      } else {
        feedToast('error')
      }
    } catch (error) {
      console.error('Error backend connection', error)
    }
  }

  return {
    linkData,
    getInputElement,
    craftButton,
  }
}
