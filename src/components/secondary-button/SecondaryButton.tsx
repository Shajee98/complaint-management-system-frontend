import './SecondaryButton.scss'
interface Props {
    text: string
    onClick?: () => void
    className: string
    htmlFor?: string
}

const SecondaryButton = ({text, onClick, className, htmlFor}: Props) => {
  return (
    <label htmlFor={htmlFor} className={`secondary ${className}`} onClick={onClick}>{text}</label>
  )
}

export default SecondaryButton
