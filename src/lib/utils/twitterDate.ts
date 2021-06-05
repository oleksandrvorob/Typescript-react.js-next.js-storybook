import distanceInWords from 'date-fns/formatDistanceToNow'
import isValid from 'date-fns/isValid'

const getFormat = (d: string) => {
  const date = new Date(d)
  const words = distanceInWords(date, { addSuffix: true })
  return words
}
export const getTwitterDate = (timestamp: string) => {
  const date = isValid(new Date(timestamp)) ? getFormat(timestamp) : '-'
  return date
}
