import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Fullscreen({ className } = {}) {
  const componentStyle = classnames(css.Fullscreen, className)

  return <div className={componentStyle} />
}
