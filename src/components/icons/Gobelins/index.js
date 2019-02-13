import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Gobelins({ className, color = '#a3a3a3' } = {}) {
  const componentStyle = classnames(css.Gobelins, className)

  return (
    <div className={componentStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.71 40.23">
        <path
          d="M11.33,0A10.06,10.06,0,1,0,21.39,10.06,10.05,10.05,0,0,0,11.33,0Zm0,12.28a2.22,2.22,0,1,1,2.22-2.22A2.23,2.23,0,0,1,11.35,12.28Z"
          style={{ fill: color }}
        />
        <path
          d="M18.45,40.07l.4-.19c.4-.21,2.39-1.31,2-2.7a2.66,2.66,0,0,0-1.65-1.5s-8.38-2.51-13.58-4.2C.23,29.73.07,25.88,0,25.18A6.37,6.37,0,0,1,3.38,19l.25-.12.1.15-.18.1c-.27.14-1.87,1-1.65,2.19s1.61,1.51,1.61,1.51,8.38,2.51,13.58,4.2c5.39,1.76,5.55,5.6,5.6,6.3A6.69,6.69,0,0,1,19,40l-.41.2Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  )
}
