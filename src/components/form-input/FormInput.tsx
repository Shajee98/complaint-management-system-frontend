import { ChangeEvent } from "react"
import './FormInput.scss'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
      className="form-input"
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {value.toString().length == 0 && error ? <p className="error">This feild is required</p> : <p className="error"></p>}
    </div>
  )
}

export default FormInput