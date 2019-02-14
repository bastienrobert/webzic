import React, { Component } from 'react'
import i18n from 'locales'
import { Helmet } from 'react-helmet'
import experiences from 'app/experiences'

import Typography from 'components/typography'
import Link from 'components/shared/Link'
import Footer from 'components/shared/Footer'
import Preview from './Preview'
import {
  Arrow as ArrowIcon,
  Plus as PlusIcon,
  Chart as ChartIcon,
  Double as DoubleIcon
} from 'components/icons'

import css from './styles.scss'

export default class Home extends Component {
  id = null
  state = {
    experience: {}
  }

  componentWillMount() {
    this.id = Math.floor(Math.random() * experiences.length)
    this.setState({ experience: experiences[this.id] })
  }

  onArrowClick = i => {
    this.id += i
    if (this.id < 0) this.id = experiences.length - 1
    if (this.id > experiences.length - 1) this.id = 0
    this.setState({ experience: experiences[this.id] })
  }

  render() {
    const { experience } = this.state

    return (
      <div className={css.Home}>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className={css.left}>
          <div className={css.top} onClick={this.onArrowClick.bind(this, -1)}>
            <ArrowIcon />
          </div>
          <div className={css.bottom} onClick={this.onArrowClick.bind(this, 1)}>
            <ArrowIcon />
          </div>
        </div>
        <div className={css.center}>
          <Footer Icon={DoubleIcon} content={i18n.home.footer} />
          <Preview className={css.iframe} {...experience} />
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
