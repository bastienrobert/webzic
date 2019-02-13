import React, { Component } from 'react'
import i18n from 'locales'
import { Helmet } from 'react-helmet'
import experiences from 'app/experiences'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import Footer from 'components/shared/Footer'
import Embed from './Embed'
import {
  Arrow as ArrowIcon,
  Plus as PlusIcon,
  Chart as ChartIcon,
  Double as DoubleIcon
} from 'components/icons'

import css from './styles.scss'

export default class Home extends Component {
  componentWillMount() {
    this.experience =
      experiences[Math.floor(Math.random() * experiences.length)]
  }

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
          <Footer Icon={DoubleIcon} content={i18n.home.footer} />
          <Embed className={css.iframe} {...this.experience} />
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <Link name="experiences">
              <ChartIcon legend="23" />
            </Link>
          </div>
          <div className={css.bottom}>
            <Link name="about">
              <PlusIcon />
              <Typography subtitle className={css.text}>
                <div>
                  <span>{i18n.cta.more}</span>
                  <span>{i18n.cta.info}</span>
                </div>
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
