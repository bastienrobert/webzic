import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import Embed from './Embed'
import {
  Arrow as ArrowIcon,
  Plus as PlusIcon,
  Chart as ChartIcon,
  Double as DoubleIcon
} from 'components/icons'

import css from './styles.scss'

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
        <div className={css.center}>
          <div className={css.footer}>
            <DoubleIcon />
            <Typography subtitle className={css.text}>
              <span>drag up or down to open</span>
            </Typography>
          </div>
          <Embed
            title="Bastien Robert - Experience"
            src="http://bastienrobert-sound.surge.sh/"
            className={css.iframe}
            fullscreen
          />
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <Link name="experiences">
              <ChartIcon />
              <Typography subtitle className={css.text}>
                <span>23</span>
              </Typography>
            </Link>
          </div>
          <div className={css.bottom}>
            <Link name="about">
              <PlusIcon />
              <Typography subtitle className={css.text}>
                <div>
                  <span>more</span>
                  <span>info</span>
                </div>
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
