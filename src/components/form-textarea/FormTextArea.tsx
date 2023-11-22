import { ChangeEvent, createRef, forwardRef } from "react"
import './FormTextArea.scss'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  error?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  onFocus?: () => void
  onBlur?: () => void,

}

const FormTextArea = forwardRef<HTMLTextAreaElement, InputProps>(({error, label, name, onChange, placeholder, type, value, disabled, onFocus, onBlur}, ref) => {

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <textarea
        className="form-input"
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        rows={3}
        ref={ref}
      />
      {value.toString().length == 0 && error ? <p className="error">This feild is required</p> : <p className="error"></p>}
    </div>
  )
}
)

export default FormTextArea