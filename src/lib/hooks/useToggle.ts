import { useState } from 'react'

export default (initialValue) => {
  const [state, setState] = useState(initialValue)
  const toggle = () => {
    setState((prevState) => !prevState)
  }
  return [state, toggle]
}
