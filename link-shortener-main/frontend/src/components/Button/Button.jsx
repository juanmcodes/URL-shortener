import React from 'react'
import './Button.css'

const button = ({ Icon, onClick, className, children, ...props }) => {
  return (
    <button type="button" onClick={onClick} className={`button ${className}`} {...props}>
      {Icon && <Icon className="icon"/>}
      {children && <span className='button-text'>{children}</span>}
    </button>
  )
}

export default button
