import React, { FC, useRef } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select, { SelectProps } from '@material-ui/core/Select'
import { getRegisteredStyles } from 'emotion'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: (props) => ({
      // margin: theme.spacing(1),
      // @ts-ignore
      minWidth: `${props.label.length + 8}ch`,
      width: "100%"
    }),
  }),
)

type Value = string | number

interface Item {
  value: Value
  label: string
}

interface Props extends SelectProps {
  menuItems: Item[],
  register: () => void,
  parentClass: string
}

interface Props extends Omit<SelectProps, 'label'> {
  label: string
}

const SelectField: FC<Props> = ({ id, className = "", register, parentClass = "", label = '', menuItems = [], value, ...props }) => {
  const classes = useStyles({ label })
  return (
    <div className={parentClass}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id={`select-field-${label}-label`} style={{ minWidth: 'max-content' }}>
          {label}
        </InputLabel>
        <Select
          labelId={`select-field-${label}-label`}
          id={`select-field-${label}`}
          name={id}
          inputProps={{
            inputRef: (ref) => {
              if (!ref) return;
              register({
                name: id,
                value: ref.value
              })
            }
          }}
          label={label}
          className={className}
        >
          {!props.required && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          {menuItems.map(({ value, label }, key) => (
            <MenuItem key={key} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectField
