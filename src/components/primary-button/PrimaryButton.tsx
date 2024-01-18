import './PrimaryButton.scss'

interface Props {
    text: string
    onClick?: (e: any) => void
    className?: string
    type?: "button" | "reset" | "submit" | undefined
}

const PrimaryButton = ({text, onClick, className, type}: Props) => {
  return (
    <button type={type} className={`primary ${className}`} onClick={onClick}>{text}</button>
  )
}

export default PrimaryButton
