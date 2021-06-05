import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: ReactNode
}

const Portal = ({ children }: PortalProps) => {
  return ReactDOM.createPortal(children, document.body)
}

export default Portal
