import React from 'react'
import './InputLink.css'

const InputLink = ({name, value, onChange, className }) => {
	return (
		<div className='input-group'>
			<input
				type='url'
				id='link'
				className={className}
				name={name}
				value={value}
				onChange={onChange}
				placeholder='https://'
				required
			/>
		</div>
	)
}

export default InputLink
