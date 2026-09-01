import React from 'react'
import './LogModal.css'
import Button from '../Button/Button.jsx'
import logo from '../../assets/logos/logo6.png'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { useLogModal } from './LogModalLogic.js'

const LogModal = ({ isVisible, feedToast }) => {
  const { loading, handleGoogleLogin, handleGitHubLogin } = useLogModal(feedToast)

  return (
    <div id="log" className={isVisible ? 'visible' : 'hidden'}>
      <div id="log-cont">
        <img id="logo" src={logo} alt="Log in logo" />
        <h2 id="title-log">Log in to Craft it!</h2>
        <p id="text-log">
          Log in with your favourite social provider to get started:
        </p>
        <Button 
					className="login-button" 
					Icon={FcGoogle}
					onClick={handleGoogleLogin}
					disabled={loading}
				>
          {loading ? 'Logging in...' : 'Continue with Google'}
        </Button>
        <Button 
					className="login-button" 
					Icon={BsGithub}
					onClick={handleGitHubLogin}
					disabled={loading}
				>
          {loading ? 'Logging in...' : 'Continue with GitHub'}
        </Button>
      </div>
    </div>
  )
}

export default LogModal
