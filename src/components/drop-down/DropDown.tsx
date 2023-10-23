import Select from 'react-select';
import './DropDown.scss'

interface Props {
    defaultValue?: {id: number, value: string, label: string, color?: string}
    loadOptions?: (inputValue: string, callback: Function) => void,
    options?: {id: number, value: string, label: string, color?: string}[],
    onChange?: (option: any) => void,
    styles: {},
    label: string
}
const DropDown = ({defaultValue, options, styles, label, onChange}: Props) => {
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
          // defaultOptions
          // cacheOptions
          options={options}
          defaultValue={defaultValue}
          onChange={onChange}
          // loadOptions={loadOptions}
          // onInputChange={onChange}
        />
      </div>
  );
}

export default DropDown
