import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Plus({ className }) {
  const componentStyle = classnames(css.Plus, className)

  return <div className={componentStyle} />
}
