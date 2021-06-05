import styled from 'styled-components'
import useToggle from 'lib/hooks/useToggle'
import Editor from './Editor'
import SlateRender from './SlateRender'
import { ListItem, ListItemAvatar, ListItemText, Button, Divider, Avatar } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Comment as CommentIcon, Reply, Edit, ArrowUpward } from '@material-ui/icons'

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`
const commentStyles = makeStyles(() =>
  createStyles({
    button: {
      marginRight: '1rem',
    },
    comment: {
      marginTop: '1rem',
    },
    subComment: {
      marginTop: '1rem',
      marginLeft: '3rem',
    },
    subCommentText: {
      marginLeft: '3rem',
    },
    subCommentDivider: {
      marginLeft: '4rem',
    },
    subCommentButtonContainer: {
      marginLeft: '3rem',
    },
  }),
)

export const SubComment = ({
  id,
  name,
  timestamp,
  comment,
  ownComment,
  onEdit,
  onClickReply,
  CHARACTERS,
}) => {
  const [edit, toggleEdit] = useToggle(false)
  const classes = commentStyles()
  return (
    <>
      <ListItem className={classes.subComment}>
        <ListItemAvatar>
          <Avatar>{name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${name}${ownComment ? ' (You)' : ''}`} secondary={timestamp} />
      </ListItem>
      {edit ? (
        <div className={classes.subComment}>
          <Editor
            edit
            CHARACTERS={CHARACTERS}
            initialValue={comment}
            replyBox={true}
            onCancel={toggleEdit}
            onSubmit={(comment) => {
              onEdit(comment, id, true)
              toggleEdit()
            }}
          />
        </div>
      ) : (
        <>
          <ListItem className={classes.subCommentText}>
            <SlateRender value={comment} />
          </ListItem>
          <ListItem>
            <ButtonContainer className={classes.subCommentButtonContainer}>
              <Button onClick={onClickReply} className={classes.button} startIcon={<Reply />}>
                Reply
              </Button>
              {ownComment && (
                <Button onClick={toggleEdit} className={classes.button} startIcon={<Edit />}>
                  Edit
                </Button>
              )}
            </ButtonContainer>
          </ListItem>
        </>
      )}
      <Divider className={classes.subCommentDivider} variant="middle" component="li" />
    </>
  )
}

export const Comment = ({
  id,
  name,
  timestamp,
  comment,
  replies,
  ownComment,
  lastComment,
  CHARACTERS,
  onReply,
  onEdit,
}) => {
  const classes = commentStyles()
  const [extend, toggleExtend] = useToggle(false)
  const [reply, toggleReply] = useToggle(false)
  const [edit, toggleEdit] = useToggle(false)

  const onEditComment = (comment, cId, subComment) => {
    onEdit(comment, cId !== undefined ? cId : id, { subComment, parentId: id })
    if (!subComment) {
      toggleEdit()
      !extend && toggleExtend()
    }
  }

  return (
    <>
      <ListItem className={classes.comment}>
        <ListItemAvatar>
          <Avatar>{name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${name}${ownComment ? ' (You)' : ''}`} secondary={timestamp} />
      </ListItem>
      {edit ? (
        <Editor
          edit
          initialValue={comment}
          CHARACTERS={CHARACTERS}
          replyBox={false}
          onCancel={toggleEdit}
          onSubmit={onEditComment}
        />
      ) : (
        <>
          <ListItem>
            <SlateRender value={comment} />
          </ListItem>
          <ListItem>
            <ButtonContainer>
              {!!replies.length && (
                <Button
                  onClick={toggleExtend}
                  className={classes.button}
                  startIcon={extend ? <ArrowUpward /> : <CommentIcon />}
                >
                  {extend ? `Collapse Comments` : `${replies.length} Comments`}
                </Button>
              )}
              <Button onClick={toggleReply} className={classes.button} startIcon={<Reply />}>
                Reply
              </Button>
              {ownComment && (
                <Button onClick={toggleEdit} className={classes.button} startIcon={<Edit />}>
                  Edit
                </Button>
              )}
            </ButtonContainer>
          </ListItem>
        </>
      )}
      {(!lastComment || extend) && !reply && <Divider variant="middle" component="li" />}
      {extend &&
        replies.map(({ name, comment, timestamp, ownComment, id }, index) => (
          <SubComment
            id={id}
            onClickReply={toggleReply}
            CHARACTERS={CHARACTERS}
            onEdit={onEditComment}
            key={index}
            comment={comment}
            timestamp={timestamp}
            ownComment={ownComment}
            name={name}
          />
        ))}
      {reply && (
        <div className={classes.subComment}>
          <Editor
            replyBox={true}
            onCancel={toggleReply}
            CHARACTERS={CHARACTERS}
            onSubmit={(comment) => {
              onReply(comment, id)
              toggleReply()
              !extend && toggleExtend()
            }}
          />
        </div>
      )}
    </>
  )
}
