import React, { Component } from 'react'
import i18n from 'locales'
import { Helmet } from 'react-helmet'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import Footer from 'components/shared/Footer'
import {
  Plus as PlusIcon,
  Chart as ChartIcon,
  Gobelins as GobelinsIcon
} from 'components/icons'

import css from './styles.scss'

export default class About extends Component {
  render() {
    return (
      <div className={css.About}>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div className={css.left}>
          <Link name="home" className={css.top}>
            <PlusIcon className={css.close} />
            <Typography subtitle className={css.text}>
              <div>
                <span>{i18n.cta.close}</span>
                <span>{i18n.cta.this}</span>
              </div>
            </Typography>
          </Link>
        </div>
        <div className={css.center}>
          <Typography title className={css.title}>
            <h1>{i18n.about.title}</h1>
          </Typography>
          <Footer Icon={GobelinsIcon} content={i18n.about.footer} />
        </div>
        <div className={css.right}>
          <Link name="experiences">
            <ChartIcon legend="23" className={css.top} />
          </Link>
        </div>
        <div className={css.separator} />
      </div>
    )
  }
}
