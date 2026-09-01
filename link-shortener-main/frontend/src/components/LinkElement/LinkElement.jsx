import React from 'react'
import './LinkElement.css'
import Button from '../Button/Button.jsx'
import { HiOutlineDuplicate } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { CgFormatSlash } from "react-icons/cg";

const LinkElement = ({ id, originalUrl, shortUrl, createdAt, handleCopy, handleDelete, onOpenUpdateModal}) => {
	return (
		<div id='link-element'>
			<div className='top-section'>
				<div className='short-url'>
					<CgFormatSlash className='slash-icon'/>
					{shortUrl}
				</div>
				<div className='buttons-section'>
					<Button
						className="copy-link"
						aria-label='Copy shortened link to clipboard'
						Icon={HiOutlineDuplicate}
						onClick={handleCopy}
					/>
					<Button
						className="edit-link"
						aria-label='Open a popup to edit the link'
						Icon={TbEdit}
						onClick={onOpenUpdateModal}
					/>
					<Button
						className="delete-link"
						aria-label='Delete the link permanently'
						Icon={RiDeleteBin7Line}
						onClick={handleDelete}
					/>
				</div>
			</div>
			<div className='mid-section'>
				<div className='original-url'>
					{originalUrl}
				</div>
			</div>
			<div className='bot-section'>
				<div className='date'>
					{new Date(createdAt).toLocaleDateString('en-GB', {
						day: '2-digit',
						month: 'long', 
						year: 'numeric'
					})}
				</div>
			</div>
		</div>
	)
}

export default LinkElement
