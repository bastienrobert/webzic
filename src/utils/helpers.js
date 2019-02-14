export function generateGuid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

export function objectToQuerystring(data, ready = false) {
  const querystring = Object.keys(data)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
  return ready ? '?' + querystring : querystring
}

export function querystringToObject(data) {
  return data.split('&').reduce((obj, el) => {
    const split = el.split('=')
    if (split.length < 2) return null
    obj[split[0].replace(/\s+/g, '')] = split[1].trim()
    return obj
  }, {})
}
