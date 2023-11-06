import { HiPencil } from 'react-icons/hi'
import './Settings.scss'
import PrimaryButton from '../../components/primary-button/PrimaryButton'
import SecondaryButton from '../../components/secondary-button/SecondaryButton'
import Heading2 from '../../components/typography/heading-2/Heading2'
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { ProgressBar } from 'react-bootstrap'
import { useState } from 'react'
import { postRequestFormData } from '../../../utils/auth'
import Signup from '../signup/Signup'

const Settings = () => {
  const [progress, setProgress] = useState<any>()
  const [files, setFiles] = useState<any>()
  const submitHandler = async () => {
    try {
      const options = {
        header: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (data: any) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total))
        },
      };

      const payload = new FormData();
      payload.append("file", files);
      
    // const data = JSON.stringify(Object.fromEntries(payload));
      await postRequestFormData(
        "/settings/upload-file",
        payload,
        options
      )
    } catch (error) {
      console.log("error ===> ", error)
    }
  }
  return (
    <>
              {getFromStorage(LocalStorageKeys.USER) && <Header />}
          <div
            className={`${
              getFromStorage(LocalStorageKeys.USER) &&
              Object.entries(getFromStorage(LocalStorageKeys.USER)).length != 0
                ? "child-container-loggedIn"
                : "child-container-loggedOut"
            }`}
          >
            {getFromStorage(LocalStorageKeys.USER) && <Navbar />}
            <div
              className={`${
                getFromStorage(LocalStorageKeys.USER) &&
                Object.entries(getFromStorage(LocalStorageKeys.USER)).length !=
                  0
                  ? "left-container"
                  : "login-signup-container"
              }`}
            >
    <div className='settings-container'>
      <div className='bulk-messages-actions'>
      <div className='card-container'>
        <Heading2 className='heading2-right-aligned' text='Send Message' />
        <div className='card-body'>
        <h2 className='bulk-msg-subheading'>Upload an excel file to send bulk messages to the customer on Whatsapp for feedback</h2>
        <div className='upload-file-container'>
        <input type='file' className='file-selector' id="file-input" onChange={(e) => e.target.files?.length ? setFiles(e.target.files[0]) : null}/>
        <SecondaryButton className='secondary-right-aligned' text='Upload CSV' htmlFor='file-input'/>
        {progress && <ProgressBar now={progress} label={`${progress}%`} color='blue' />}
        </div>
        </div>
        <PrimaryButton className={`${files != undefined ? '' : 'disabled'} primary-left-aligned`} text='Send' onClick={submitHandler}/>
      </div>
      <div className='card-container'>
        <Heading2 className='heading2-right-aligned' text='Whatsapp Message Format' />
        <div className='card-body'>
            <div className='format-container'>
                <input type='text' disabled className='whatsapp-format' value={"How was the service you availed at AEG Travels? How was the service you availed at AEG Travels? How was the service you availed at AEG Travels?"}/>
                <HiPencil className="edit-icon" onClick={() => { console.log("Edited")}}/>
            </div>
            <PrimaryButton text='Update' className='disabled primary-left-aligned' />
        </div>
      </div>
      </div>
      <Signup />
    </div>
    </div>
    </div>
    </>
  )
}

export default Settings
