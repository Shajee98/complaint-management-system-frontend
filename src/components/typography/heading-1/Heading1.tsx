import './Heading1.scss'

interface Props {
    text: string
}

const Heading1 = ({text}: Props) => {
  return (
    <h1 className="heading-1">{text}</h1>
  )
}

export default Heading1
