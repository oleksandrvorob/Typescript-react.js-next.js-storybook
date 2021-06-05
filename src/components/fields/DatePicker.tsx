import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const DatePicker = ({ name, label, inputRef, ...props }: Partial<KeyboardDatePickerProps>) => {
  // const [selectedDate, setSelectedDate] = useState(new Date(''))

  // const handleDateChange = (date) => {
  //   setSelectedDate(date)
  // }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        name={name}
        id={name}
        label={label}
        value={props?.value}
        onChange={props?.onChange}
        inputRef={inputRef}
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        InputAdornmentProps={{ position: 'start' }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
