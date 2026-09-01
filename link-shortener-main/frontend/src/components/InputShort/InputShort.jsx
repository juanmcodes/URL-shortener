import React from 'react'
import './InputShort.css'

const InputShort = ({name, value, onChange, className}) => {
	return (
		<div>
			<div className='input-group'>
			<input
				type='text'
				id='short'
				className={className}
				name={name}
				value={value}
				onChange={onChange}
				placeholder='/mylink'
				required
			/>
		</div>
		</div>
	)
}

export default InputShort
