import React from 'react'
import classnames from 'classnames'

import css from './styles.scss'

export default function Chart({ legend = '23', className } = {}) {
  const componentStyle = classnames(css.Chart, className)

  return (
    <div className={componentStyle}>
      <div />
      <div />
      <div />
    </div>
  )
}
