import React from 'react'
import './Navbar.css'
import {useNavBar} from './NavBarLogic.js'
import Button from '../Button/Button.jsx'
import { BsGithub } from "react-icons/bs"
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ onOpenModal, logoutSession }) => {
	const { isDashboard } = useNavBar()

	return (
		<nav id='navbar'>
			<p id='logo'>Craft it!</p>
			<div className='btn-zone'>
			<Button className="navbar-button" aria-label="Open the github project page" Icon={BsGithub} onClick={() => window.open('https://github.com/BeruzDev/link-shortener',  '_blank', 'noopener,noreferrer')} />

			{!isDashboard ? (
				<Button className="get-started" Icon={FaArrowRightLong} onClick={onOpenModal}>
					Get Started
				</Button>
			) : (
				<Button className="logout" Icon={IoLogOutOutline} onClick={logoutSession}>
					Logout
				</Button>
			)}
			</div>
		</nav>
	)
}

export default Navbar
