import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Chip, Paper } from '@material-ui/core'

import { FilterChipsProps } from './types'

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
      background: 'transparent',
    },
  }),
)

export default function ChipsArray({ filters = [], setFilters }: FilterChipsProps) {
  const classes = useStyles()

  return (
    <Paper component="ul" className={classes.root} elevation={0}>
      {filters.map((data, idx) => {
        return (
          <li key={idx}>
            <Chip
              label={`${data.field} ${data.action} ${data.value}`}
              onDelete={() =>
                setFilters((prev) => {
                  const p1 = prev.slice(0, idx)
                  const p2 = prev.slice(idx + 1)
                  return [...p1, ...p2]
                })
              }
              className={classes.chip}
              variant="outlined"
              size="small"
            />
          </li>
        )
      })}
    </Paper>
  )
}
