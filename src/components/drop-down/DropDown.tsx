import Select from 'react-select';
import './DropDown.scss'

interface Props {
    defaultValue?: {id: number | null, value: string, label: string, color?: string}
    loadOptions?: (inputValue: string, callback: Function) => void,
    options?: {id: number | null, value: string, label: string, color?: string}[],
    onChange?: (option: any) => void,
    value?: {id: number | null, value: string, label: string, color?: string}
    styles: {},
    label: string,
    disabled?: boolean
}
const DropDown = ({defaultValue, options, styles, label, onChange, disabled, value}: Props) => {
  const handleChange = (selectedOption: any) => {
    console.log(selectedOption)
    // loadOptions(selectedOption)
  }
  return (
      <div className='drop-down-wrapper'>
        <label htmlFor={label}>{label}</label>
        <Select
          id={label}
          styles={styles}
          value={value || null}
          // defaultOptions
          // cacheOptions
          options={options}
          defaultValue={defaultValue}
          onChange={onChange}
          isDisabled={disabled}
          // loadOptions={loadOptions}
          // onInputChange={onChange}
        />
      </div>
  );
}

export default DropDown
