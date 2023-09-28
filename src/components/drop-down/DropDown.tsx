import './DropDown.scss'

interface Props {
    options: string[]
    apiFunction: (option: string) => void
}
const DropDown = (props: Props) => {
  return (
    <select className='drop-down'>
        {props.options.map((option) => (
            <option key={option} value={option} onClick={() => props.apiFunction(option)}>{option}</option>
        ))}
    </select>
  )
}

export default DropDown
