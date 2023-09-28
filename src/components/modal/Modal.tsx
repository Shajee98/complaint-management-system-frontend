import { FormEvent, useState } from 'react'
import FormInput from '../form-input/FormInput'
import Heading2 from '../typography/heading-2/Heading2'
import PrimaryButton from '../primary-button/PrimaryButton'
import { AiFillCloseCircle } from 'react-icons/ai'
import './Modal.scss'

interface Props {
  onClose: () => void
}

const Modal = ({onClose}: Props) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(true)
    } else {
      setError(false)
    }
  }
  return (
    <div className='modal-container'>
      <div className='modal-header'>
      <Heading2 className='heading-2-aligned-center' text='Complaint'/>
      <AiFillCloseCircle onClick={onClose} className='modal-cross'/>
      </div>
      <form className='form-wrapper'>
        <FormInput 
          type="text"
          label="Customer Number"
          value={name}
          name="name"
          error={error}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter customer number"
        />
        <FormInput 
          type="text"
          label="Description"
          value={name}
          name="name"
          error={error}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter complaint description"
        />
      </form>
        <PrimaryButton onClick={(e) => handleSubmit(e)} className='primary-center-aligned' text='Submit' />
    </div>
  )
}

export default Modal
