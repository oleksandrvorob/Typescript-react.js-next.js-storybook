import styled from 'styled-components'
import MaterialButton from '@material-ui/core/Button'
import isHotkey from 'is-hotkey'
import Leaf from './Leaf'
import Element from './Element'
import Portal from './Portal'
import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Node, Range } from 'slate'
import { withHistory } from 'slate-history'
import {
  FormatItalic,
  FormatBold,
  Code,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
} from '@material-ui/icons'
import { Toolbar } from './ButtonComponents'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { withMentions, insertMention } from './MentionElement'
import { toggleMark } from './ToggleStyles'
import { MarkButton, BlockButton } from './ButtonComponents'

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('')
}

const emptyValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const EditorWrapper = styled.div`
  position: relative;
  margin: 0.5rem 1rem;
  padding: 0 1rem;
  padding-top: 0.5rem;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 4px;
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`
const checkDisablity = (arr) => {
  return !serialize(arr)
}

const editorStyles = makeStyles(() =>
  createStyles({
    cancelButton: {
      marginRight: '1rem',
    },
  }),
)

const CommentEditor = ({
  onSubmit,
  replyBox = false,
  onCancel = () => {},
  edit = false,
  initialValue = emptyValue,
  CHARACTERS,
}) => {
  const ref = useRef<HTMLDivElement | null>()
  const [value, setValue] = useState<Node[]>(initialValue)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const [index, setIndex] = useState(0)
  const [target, setTarget] = useState<Range | undefined>()
  const [search, setSearch] = useState('')
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withMentions(withReact(withHistory(createEditor()))), [])
  const classes = editorStyles()

  const chars = CHARACTERS.filter((c) => c.toLowerCase().startsWith(search.toLowerCase())).slice(
    0,
    10,
  )

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, chars[index])
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
        }
      }
    },
    [index, search, target],
  )

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target])

  return (
    <EditorWrapper>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value)
          const { selection } = editor

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, { unit: 'word' })
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange)
              setSearch(beforeMatch[1])
              setIndex(0)
              return
            }
          }

          setTarget(null)
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Start typing a comment..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
            onKeyDown(event)
          }}
        />
        {target && chars.length > 0 && (
          <Portal>
            <div
              ref={ref}
              style={{
                top: '-9999px',
                left: '-9999px',
                position: 'absolute',
                zIndex: 1,
                padding: '3px',
                background: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
              }}
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  style={{
                    padding: '1px 3px',
                    borderRadius: '3px',
                    background: i === index ? '#B4D5FF' : 'transparent',
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </Portal>
        )}
        <Toolbar>
          <MarkButton format="bold" Icon={() => <FormatBold />} />
          <MarkButton format="italic" Icon={() => <FormatItalic />} />
          <MarkButton format="underline" Icon={() => <FormatUnderlined />} />
          <MarkButton format="code" Icon={() => <Code />} />
          <BlockButton format="heading-one" Icon={() => <LooksOne />} />
          <BlockButton format="heading-two" Icon={() => <LooksTwo />} />
          <BlockButton format="block-quote" Icon={() => <FormatQuote />} />
          <BlockButton format="numbered-list" Icon={() => <FormatListNumbered />} />
          <BlockButton format="bulleted-list" Icon={() => <FormatListBulleted />} />
        </Toolbar>
        <ButtonContainer>
          {(replyBox || edit) && (
            <MaterialButton
              className={classes.cancelButton}
              color="default"
              variant="text"
              onClick={onCancel}
            >
              Cancel
            </MaterialButton>
          )}
          <MaterialButton
            onClick={() => {
              onSubmit(value)
              Transforms.deselect(editor)
              setValue(emptyValue)
            }}
            color="secondary"
            variant="contained"
            disabled={checkDisablity(value)}
          >
            {edit ? 'Edit' : 'Send'}
          </MaterialButton>
        </ButtonContainer>
      </Slate>
    </EditorWrapper>
  )
}

export default CommentEditor
