const getFloat = (num: string): number | null => {
  let _float: number | null
  try {
    _float = parseFloat(num.replace(/[^0-9-.]/g, ''))
  } catch (_) {
    _float = null
  }
  return _float
}

export default getFloat
