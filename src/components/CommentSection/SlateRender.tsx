import Leaf from './Leaf'
import Element from './Element'
import { useCallback, useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'

interface Props {
  value: Node[]
}

const SlateRender = ({ value }: Props) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate onChange={() => {}} editor={editor} value={value}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
    </Slate>
  )
}

export default SlateRender
