import { ChangeEvent, forwardRef, useEffect, useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5";
import './FormInput.scss'

interface InputProps {
  label: string
  value: string | number
  name: string
  placeholder: string
  error?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: any) => void
  isPasswordFeild?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(({error, label, name, onChange, onKeyPress, placeholder, value, disabled, onFocus, onBlur, isPasswordFeild}, ref) => {
  const [type, setType] = useState("text")

  useEffect(() => {
    isPasswordFeild && setType("password")
  }, [])

  const toggleType = (type: string) => {
    setType(type)
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <div className={`input-container`}>
      <input
        ref={ref}
        className={`form-input ${isPasswordFeild ? 'form-password-input' : 'form-text-input'}`}
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {isPasswordFeild && type == "password" && <IoEye className="password-icon" color="#3373B1" onClick={() => toggleType("text")}/>}
      {isPasswordFeild && type == "text" && <IoEyeOff className="password-icon" color="#3373B1" onClick={() => toggleType("password")}/>}
      </div>
      {value.toString().length == 0 && error ? <p className="error">This feild is required</p> : <p className="error"></p>}
    </div>
  )
}
)

export default FormInput