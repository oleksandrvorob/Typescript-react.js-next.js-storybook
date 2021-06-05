import List from '@material-ui/core/List'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Comment } from './Comment'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

const CommentsContainer = ({ comments, onReply, onEdit, CHARACTERS }) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {comments.map(({ id, name, timestamp, comment, ownComment, replies }, index) => (
        <Comment
          id={id}
          CHARACTERS={CHARACTERS}
          key={index}
          comment={comment}
          onReply={onReply}
          name={name}
          onEdit={onEdit}
          timestamp={timestamp}
          replies={replies}
          ownComment={ownComment}
          lastComment={index === comments.length - 1}
        />
      ))}
    </List>
  )
}

export default CommentsContainer
