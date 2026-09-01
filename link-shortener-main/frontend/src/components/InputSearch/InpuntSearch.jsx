import React from 'react'
import './InputSearch.css'
import Button from '../Button/Button.jsx'
import { BsSearch } from "react-icons/bs";
import { IoIosClose } from 'react-icons/io'


const InpuntSearch = ({name, value, onChange, clearLinkToSearch, onKeyDown }) => {
	return (
		<div id='input-search'>
			<BsSearch className='search-icon'/>
			<input
				type='text'
				id='input'
				name={name}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder='Search Link'
			/>
			{value && (
				<Button 
				className="clear-button"
				Icon={IoIosClose}
				onClick={clearLinkToSearch}
			/>
			)}
		</div>
	)
}

export default InpuntSearch
