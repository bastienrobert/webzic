import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Double({ className }) {
  const componentStyle = classnames(css.Double, className)

  return (
    <div className={componentStyle}>
      <div />
      <div />
    </div>
  )
}
