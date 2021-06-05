import { useSelected, useFocused } from 'slate-react'
import { Transforms } from 'slate'

const MentionElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      @{element.character}
      {children}
    </span>
  )
}

export const withMentions = (editor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}

export const insertMention = (editor, character) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

export default MentionElement
