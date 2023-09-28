import { HiPencil } from 'react-icons/hi'
import './Settings.scss'
import PrimaryButton from '../../components/primary-button/PrimaryButton'
import SecondaryButton from '../../components/secondary-button/SecondaryButton'
import Heading2 from '../../components/typography/heading-2/Heading2'

const Settings = () => {
  return (
    <div className='settings-container'>
      <div className='card-container'>
        <Heading2 className='right-aligned' text='Send Message' />
        <div className='card-body'>
        <h2 className='bulk-msg-subheading'>Upload an excel file to send bulk messages to the customer on Whatsapp for feedback</h2>
        <input type='file' className='file-selector' id="file-input"/>
        <SecondaryButton className='secondary-right-aligned' text='Upload CSV' htmlFor='file-input'/>
        </div>
        <PrimaryButton className='disabled primary-left-aligned' text='Send' />
      </div>
      <div className='card-container'>
        <Heading2 className='right-aligned' text='Whatsapp Message Format' />
        <div className='card-body'>
            <div className='format-container'>
                <input type='text' disabled className='whatsapp-format' value={"How was the service you availed at AEG Travels? How was the service you availed at AEG Travels? How was the service you availed at AEG Travels?"}/>
                <HiPencil className="edit-icon" onClick={() => { console.log("Edited")}}/>
            </div>
            <PrimaryButton text='Update' className='disabled primary-left-aligned' />
        </div>
      </div>
    </div>
  )
}

export default Settings
