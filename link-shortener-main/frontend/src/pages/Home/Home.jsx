import React from 'react'
import { useHomeLogic } from './HomeLogic.js'
import './Home.css'
import InputLink from '../../components/InputLink/InputLink.jsx'
import InputShort from '../../components/InputShort/InputShort.jsx'
import Button from '../../components/Button/Button.jsx'
import { TiArrowRightOutline } from 'react-icons/ti'
import SkeletonLinkElement from '../../components/SkeletonLinkElement/SkeletonLinkElement.jsx'

const Home = ({ feedToast, guestId }) => {
  const { linkData, getInputElement, craftButton } = useHomeLogic(feedToast, guestId)

  return (
    <div id="home">
      <h1 id="title">Craft it!</h1>
      <p id="subtitle">
        Manage your endpoints and share your links easily, clearly, and
        securely.
      </p>
      <div id="crafter">
        <InputLink
          name="originalUrl"
          value={linkData.originalUrl}
          onChange={getInputElement}
        />
        <Button
          className="crafter-button"
          aria-label="Short your link"
          Icon={TiArrowRightOutline}
          onClick={() => {
            craftButton()
            navigator.clipboard.writeText(`https://albertcastro.es/${linkData.shortUrl}`)
          }}
        />
        <InputShort
          name="shortUrl"
          value={linkData.shortUrl}
          onChange={getInputElement}
        />
      </div>
    </div>
  )
}

export default Home
