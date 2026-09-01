import React, { useEffect } from 'react'
import './Dashboard.css'
import { useDashboard } from './DashboardLogic.js'
import Button from '../../components/Button/Button.jsx'
import { FaLink } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'

const Dashboard = ({ feedToast, userSession, userInfoSettings }) => {
  const {
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
  } = useDashboard(userSession)


  const TabComponent = tabs[activeTab]
  
  useEffect(() => {
    if (activeTab === 'links' && userSession.accessToken) {
      getUserLinks()
    }
  }, [activeTab, userSession.accessToken, getUserLinks])

  return (
    <div className={`dashboard ${isCrafterModalOpen || isAnyModalOpen ? 'is-modal-open' : ''}`}>
      <div className="nav-links">
        <Button
          className={`windows ${activeTab === 'links' ? 'active-button' : ''}`}
          Icon={FaLink}
          onClick={() => setActiveTab('links')}
        >
          Links
        </Button>
        <Button
          className={`windows ${
            activeTab === 'settings' ? 'active-button' : ''
          }`}
          Icon={IoMdSettings}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </Button>
      </div>
      <div id="windows-container">
        <TabComponent
          isCrafterModalOpen={isCrafterModalOpen}
          setisAnyModalOpen={setisAnyModalOpen}
          onOpenCrafterModal={onOpenCrafterModal}
          onCloseCrafterModal={onCloseCrafterModal}
          userSession={userSession}
          userInfoSettings={userInfoSettings}
          linkStored={linkStored}
          isLoading={isLoading}
          getUserLinks={getUserLinks}
          feedToast={feedToast}
        />
      </div>
    </div>
  )
}

export default Dashboard
