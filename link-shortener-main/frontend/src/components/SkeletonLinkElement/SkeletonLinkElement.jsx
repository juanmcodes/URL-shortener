import React from 'react'
import './SkeletonLinkElement.css'

const SkeletonLinkElement = () => {
	return (
		<div className='skeleton'>
			<div className='top-section'>
				<div className='short-url'/>
				<div className='buttons-section'>
					<div className='circle'/>
					<div className='circle'/>
					<div className='circle'/>
				</div>
			</div>
			<div className='mid-section'>
				<div className='original-url'/>
			</div>
			<div className='bot-section'>
				<div className='date'/>
			</div>
		</div>
	)
}

export default SkeletonLinkElement
