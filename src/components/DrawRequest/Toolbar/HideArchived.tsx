import { FunctionComponent, Dispatch, SetStateAction, useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone'
import ToggleButton from '@material-ui/lab/ToggleButton'

import { Filter } from 'components/Table-Toolbar/types'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(0.5),
  },
}))

interface Props {
  filters: Filter[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
}

const HideArchived: FunctionComponent<Props> = ({ filters, setFilters }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState(false)

  const handleChange = () => {
    const newStatus = !selected
    setSelected(newStatus)

    if (newStatus) {
      setFilters((x) => [...x, { field: 'archived', action: 'is', value: 'false' }])
    } else {
      setFilters((x) =>
        x.filter(
          (item) => !(item.action === 'is' && item.field === 'archived' && item.value === 'false'),
        ),
      )
    }
  }

  return (
    <ToggleButton
      value="hideArchived"
      selected={selected}
      onChange={() => {
        handleChange()
      }}
    >
      {selected ? (
        <CheckBoxTwoToneIcon fontSize="small" className={classes.button} />
      ) : (
        <CheckBoxOutlineBlankIcon fontSize="small" className={classes.button} />
      )}
      Hide Archived
    </ToggleButton>
  )
}

export default HideArchived
