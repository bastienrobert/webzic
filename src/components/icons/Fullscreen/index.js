import React from 'react'
import classnames from 'classnames/bind'

import css from './styles.scss'
const cx = classnames.bind(css)

export default function Fullscreen({ className, negative = false } = {}) {
  const componentStyle = cx(css.Fullscreen, className, {
    negative
  })

  return <div className={componentStyle} />
}
