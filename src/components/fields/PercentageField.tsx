import { forwardRef, FC } from 'react'
import MaskedInput from 'react-text-mask'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '%',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 3, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    min: 0,
    max: 100
  })

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={currencyMask}
      inputMode="decimal"
    />
  )
}

const Percentage: FC<TextFieldProps> = ({ InputProps, ...props }, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      id="formatted-numberformat-input"
      placeholder="0%"
      InputProps={{
        ...InputProps,
        inputComponent: TextMaskCustom,
      }}
    />
  )
}

export default forwardRef(Percentage)
