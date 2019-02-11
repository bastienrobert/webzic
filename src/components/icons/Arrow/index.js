import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Arrow({ className }) {
  const componentStyle = classnames(css.Arrow, className)

  return <div className={componentStyle} />
}
