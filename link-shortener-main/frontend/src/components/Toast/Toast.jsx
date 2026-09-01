import React, { useEffect, useState } from 'react'
import './Toast.css'

const Toast = ({icon, message, classIcon, confirmAdvice}) => {
	const [toastClass, setToastClass] = useState('toast-enter');

	useEffect(() => {
		if (confirmAdvice) {
			setToastClass('toast-enter')
			setTimeout(() => {
				setToastClass('toast-exit')
			}, 2000);
		}
	}, [confirmAdvice]);

	return (
		<div id='toast' className={`${toastClass}`}>
			<div className={`toast-icon ${classIcon}`}>{icon}</div>
			<div className='toast-message'>{message}</div>
		</div>
	)
}

export default Toast
