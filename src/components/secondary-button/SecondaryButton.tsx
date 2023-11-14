import './SecondaryButton.scss'
interface Props {
    text: string
    onClick?: () => void
    className: string
    htmlFor?: string
    toggle?: boolean
}

const SecondaryButton = ({text, onClick, className, htmlFor, toggle}: Props) => {
  return (
    <label htmlFor={htmlFor} className={`${toggle ? 'secondary-toggle' : 'secondary'} ${className}`} onClick={onClick}>{text}</label>
  )
}

export default SecondaryButton
