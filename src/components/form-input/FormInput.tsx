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
      {error && <p className="error">This feild is required</p>}
    </div>
  )
}

export default FormInput