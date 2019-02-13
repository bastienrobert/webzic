import React from 'react'
import classnames from 'classnames'

import Typography from 'components/typography'

import css from './styles.scss'

export default function Chart({ legend = '23', className } = {}) {
  const componentStyle = classnames(css.Chart, className)

  return (
    <div className={componentStyle}>
      <div className={css.icon}>
        <div />
        <div />
        <div />
      </div>
      <Typography subtitle className={css.text}>
        <span>{legend}</span>
      </Typography>
    </div>
  )
}
