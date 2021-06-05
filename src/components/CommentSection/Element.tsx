import MentionElement from './MentionElement'
import { Typography } from '@material-ui/core'

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <MentionElement {...props} />
    case 'block-quote':
      return (
        <Typography variant="caption" gutterBottom {...attributes}>
          {children}
        </Typography>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return (
        <Typography variant="h5" {...attributes}>
          {children}
        </Typography>
      )
    case 'heading-two':
      return (
        <Typography variant="h6" {...attributes}>
          {children}
        </Typography>
      )
    case 'list-item':
      return (
        <li {...attributes}>
          <Typography>{children}</Typography>
        </li>
      )
    case 'numbered-list':
      return (
        <ol {...attributes}>
          <Typography>{children}</Typography>
        </ol>
      )
    default:
      return <Typography {...attributes}>{children}</Typography>
  }
}

export default Element
