
import './DescriptionDD.scss'

interface Props {
    setDescription: (value: React.SetStateAction<string>) => void
}

const DescriptionDD = ({setDescription}: Props) => {
    const descriptions = [
        "I wasn't satisfied",
        "I was satisfied",
        "It was good!",
        "It can be imporoved"
    ]
    const descriptionHandler = (description: string) => {
        setDescription(description)
    }
  return (
    <div className='descriptions-container'>
      {
        descriptions.map((description) => (
            <p onClick={() => descriptionHandler(description)}>{description}</p>
        ))
      }
    </div>
  )
}

export default DescriptionDD
