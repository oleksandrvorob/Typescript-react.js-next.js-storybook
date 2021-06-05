import { forwardRef, FunctionComponent } from 'react'
import MaskedInput from 'react-text-mask'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  })

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={currencyMask}
      inputMode="numeric"
    />
  )
}

const Currency: FunctionComponent<TextFieldProps> = ({ InputProps, ...props }, ref) => {
  return (
    <TextField
      // fullWidth
      {...props}
      ref={ref}
      id="formatted-numberformat-input"
      placeholder="$0.00"
      InputProps={{
        ...InputProps,
        inputComponent: TextMaskCustom,
      }}
    />
  )
}

export default forwardRef(Currency)
