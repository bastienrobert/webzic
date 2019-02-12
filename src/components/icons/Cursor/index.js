import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Cursor({ className, color = '#000' } = {}) {
  const componentStyle = classnames(css.Cursor, className)

  return (
    <div className={componentStyle}>
      <svg viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-75.000000, -432.000000)" fill={color}>
            <g id="links" transform="translate(72.000000, 355.000000)">
              <polygon points="3 77 14.84 82.95 10.5283237 84.7 14.7715607 89.67 13.3343353 91 9.09109827 85.96 6.83260116 90.02" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
