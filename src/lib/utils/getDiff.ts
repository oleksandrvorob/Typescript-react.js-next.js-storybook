import _reduce from 'lodash/reduce'
import _pick from 'lodash/pick'

const getDiff = (a, b) => {
  a = JSON.parse(JSON.stringify(a))
  b = JSON.parse(JSON.stringify(b))
  const keys = _reduce(
    a,
    function (result, value, key) {
      return (key in b && value == b[key]) || !(key in b) ? result : result.concat(key)
    },
    [],
  )
  return _pick(b, keys)
}

export default getDiff
