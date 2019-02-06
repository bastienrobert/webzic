import React, { Component } from 'react'
import page from 'page'

import { generateGuid } from 'utils/helpers'
import routes from 'src/app/routes'
import values from 'values'

export default class Router extends Component {
  state = {
    firstPage: true,
    locale: values.locale,
    previousRouteName: null,
    previousRoute: null,
    currentRouteName: null,
    currentRoute: null,
    ctx: null,
    pages: []
  }

  static getPath(route) {
    const locale = values.locale
    const find = routes.routes.find(({ name }) => name === route)
    return find ? find.paths[locale] || find.paths['all'] : null
  }

  static getRouteWithParams(path, params) {
    return Object.keys(params).reduce(
      (acc, key) =>
        acc.replace(
          new RegExp(':' + key + '(\\?|\\*)?', 'i'),
          params[key] || ''
        ),
      path
    )
  }

  static linkResolver = doc => {
    const matchingRoute = routes.routes.find(
      ({ name }) => name === (doc.type || null)
    )
    if (matchingRoute) {
      const locale = values.locale
      const localizedPath =
        matchingRoute.paths[locale] || matchingRoute.paths['all']

      const slug = doc.data ? doc.data.slug : null

      return Router.getRouteWithParams(localizedPath, { slug })
    }

    return '/'
  }

  static goto = path => {
    if (path === page.current) return

    if (path.indexOf('://') === -1) {
      page((path.indexOf('/') === 0 ? '' : '/') + path)
    } else {
      window.location.href = path
    }
  }

  componentWillMount() {
    if (routes.base) page.base(routes.base)

    routes.routes.forEach(route => {
      const { paths } = route
      const path = paths.all || paths[this.state.locale]

      page(path, ctx => {
        return this.setState(state => {
          return this.getPageData(route, state, ctx)
        }, this.startTransition)
      })
    })

    page.start(routes.opts)
  }

  getPageData(route, state, ctx, replace) {
    const newPage = this.createPage(route.name, ctx.path)
    ctx.name = newPage.route ? newPage.route.name : null
    ctx.pageUid = generateGuid()

    return {
      noContent: false,
      ctx,
      previousRouteName: state.currentRouteName,
      previousRoute: state.currentRoute,
      currentRouteName: ctx.name,
      currentRoute: ctx.path,
      pages: replace ? [newPage] : state.pages.concat(newPage)
    }
  }

  getRouteIndex(path) {
    return this.state.pages.findIndex(page => page.path === path)
  }

  startTransition() {
    const length = this.state.pages.length

    if (length > 1) {
      const previousIndex = this.state.pages.length - 2
      const currentIndex = this.state.pages.length - 1

      if (previousIndex === currentIndex) return
      const previousGuid = this.state.pages[previousIndex].guid

      this.destroyPage(previousGuid)
    }
  }

  renderNotFound = () => {
    this.setState(state => {
      return this.getPageData({ name: 'notfound' }, state, { path: '*' }, true)
    })
  }

  destroyPage(guid) {
    this.setState(state => ({
      pages: state.pages.filter(page => page.guid !== guid)
    }))
  }

  createPage(name, path) {
    return {
      guid: generateGuid(),
      path,
      route: this.getRouteObject(name)
    }
  }

  getRouteObject(name) {
    return routes.routes.find(route => route.name === name) || null
  }

  savePageRef = (page, guid) => {
    page && this.pages.push({ ref: page, guid })
  }

  render() {
    const { ctx, locale } = this.state

    this.pages = []

    return (
      <React.Fragment>
        {this.state.pages.map(page => {
          return (
            <page.route.component
              key={page.guid}
              ref={el => el && this.savePageRef(el, page.guid)}
              {...{ ctx, locale }}
            />
          )
        })}
      </React.Fragment>
    )
  }
}
