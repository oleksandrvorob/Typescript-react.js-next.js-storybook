import CommentsContainer from './CommentsContainer'
import Typography from '@material-ui/core/Typography'
import Editor from './Editor'
import format from 'date-fns/format'
import Wrapper from './Wrapper'
import { useState, useCallback } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { comments } from './dummyComments'

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      padding: '0.5rem 1rem',
    },
  }),
)

const CommentSection = () => {
  const classes = useStyles()
  const [commentsData, setCommentsData] = useState(comments)

  const handleReply = useCallback(
    (comment, id) => {
      const newComments = commentsData.map((c) => {
        if (id === c.id) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Math.floor(Math.random() * 1000 + 50),
                name: 'Anonymous',
                timestamp: format(new Date(), 'LLL d yyyy, hh:mm a'),
                replies: [],
                ownComment: true,
                comment,
              },
            ],
          }
        } else {
          return { ...c }
        }
      })

      setCommentsData(newComments)
    },
    [commentsData],
  )

  const handleEdit = useCallback(
    (comment, id, { parentId, subComment }) => {
      if (subComment) {
        const newComments = commentsData.map((c) => {
          if (parentId === c.id) {
            const newReplies = c.replies.map((r) => {
              if (r.id === id) {
                return { ...r, comment }
              } else {
                return { ...r }
              }
            })
            return { ...c, replies: newReplies }
          } else {
            return { ...c }
          }
        })
        setCommentsData(newComments)
      } else {
        const newComments = commentsData.map((c) => {
          if (id === c.id) {
            return {
              ...c,
              comment,
            }
          } else {
            return { ...c }
          }
        })
        setCommentsData(newComments)
      }
    },
    [commentsData],
  )

  const handleComment = useCallback(
    (comment) => {
      setCommentsData([
        {
          id: Math.floor(Math.random() * 1000 + 50),
          name: 'Anonymous',
          timestamp: format(new Date(), 'LLL d yyyy, hh:mm a'),
          replies: [],
          ownComment: true,
          comment,
        },
        ...commentsData,
      ])
    },
    [commentsData],
  )

  return (
    <Wrapper>
      <Typography variant="body2" className={classes.heading} color="textSecondary">
        Comments
      </Typography>
      <Editor CHARACTERS={commentsData.map((c) => c.name)} onSubmit={handleComment} />
      <CommentsContainer
        CHARACTERS={commentsData.map((c) => c.name)}
        onEdit={handleEdit}
        onReply={handleReply}
        comments={commentsData}
      />
    </Wrapper>
  )
}

export default CommentSection
