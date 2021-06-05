export const createQueryString = (path: string, params: Array<Array<string>>) => {
  const url = `/api/${path}`
  const p = new URLSearchParams(params)
  return `${url}?${p.toString()}`
}

export { getTwitterDate } from './twitterDate'
export { getTimeStamp } from './getTimeStamp'

export { default as getColorScale } from './getColorScale'
export { default as metricPrefix } from './metricPrefix'

export { default as getFloat } from './getFloat'
export { default as formatMoney } from './formatMoney'

export { default as getDiff } from './getDiff'
