import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import isValid from 'date-fns/isValid'

const convertString = (timestamp: string, separator) => {
  const valid = isValid(parseISO(timestamp))
  const _date = valid ? new Date(timestamp) : null
  const date = _date ? format(_date, `MM${separator}dd${separator}yyyy`) : '-'
  return date
}

const convertDate = (timestamp: Date, separator) => {
  const valid = isValid(timestamp)
  const _date = valid ? timestamp : null
  const date = _date ? format(_date, `MM${separator}dd${separator}yyyy`) : '-'
  return date
}

export const getTimeStamp = (timestamp: string | Date, separator: string = '/') => {
  switch (typeof timestamp) {
    case 'string':
      return convertString(timestamp, separator)
    default:
      return convertDate(timestamp, separator)
  }
}
