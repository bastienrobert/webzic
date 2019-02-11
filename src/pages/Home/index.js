import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Typography from 'components/typography'
import {
  Arrow as ArrowIcon,
  Plus as PlusIcon,
  Chart as ChartIcon,
  Double as DoubleIcon
} from 'components/icons'

import css from './styles.scss'
import Separator from 'components/shared/Separator'

export default class Home extends Component {
  render() {
    return (
      <div className={css.Home}>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className={css.left}>
          <ArrowIcon className={css.top} />
          <ArrowIcon className={css.bottom} />
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <ChartIcon />
            <Typography subtitle className={css.text}>
              <span>23</span>
            </Typography>
          </div>
          <div className={css.bottom}>
            <PlusIcon />
            <Typography subtitle className={css.text}>
              <div>
                <span>more</span>
                <span>info</span>
              </div>
            </Typography>
          </div>
        </div>
        <div className={css.footer}>
          <DoubleIcon />
          <Typography subtitle className={css.text}>
            <span>drag up or down to open</span>
          </Typography>
        </div>
        <Separator />
      </div>
    )
  }
}
