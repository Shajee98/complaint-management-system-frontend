import { ChangeEvent, createRef, forwardRef } from "react"
import './FormInput.scss'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onFocus?: () => void
  onBlur?: () => void,

}

const FormInput = forwardRef<HTMLInputElement, InputProps>(({error, label, name, onChange, placeholder, type, value, disabled, onFocus, onBlur}, ref) => {

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        ref={ref}
        className="form-input"
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {value.toString().length == 0 && error ? <p className="error">This feild is required</p> : <p className="error"></p>}
    </div>
  )
}
)

export default FormInput