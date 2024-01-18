import './Heading2.scss'

interface Props {
    text: string
    className?: string
}

const Heading2 = ({text, className}: Props) => {
  return (
    <h2 className={`heading-2 ${className}`}>{text}</h2>
  )
}

export default Heading2
