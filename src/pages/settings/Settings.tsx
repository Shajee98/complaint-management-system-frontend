import { HiPencil } from 'react-icons/hi'
import PrimaryButton from '../../components/primary-button/PrimaryButton'
import SecondaryButton from '../../components/secondary-button/SecondaryButton'
import Heading2 from '../../components/typography/heading-2/Heading2'
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { ProgressBar } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { postRequestFormData } from '../../../utils/auth'
import { getWhatsappMessageFormat, updateWhatsappMessageFormat } from './service/Settings'
import Signup from '../signup/Signup'
import './Settings.scss'

const Settings = () => {
  const [progress, setProgress] = useState<any>()
  const [files, setFiles] = useState<any>()
  const [message, setMessage] = useState("")
  const [fileUploadMsg, setFileUploadMsg] = useState("File Uploaded Successfully")
  const [buttonText, setButtonText] = useState("Upload CSV")
  const [editMessage, setEditMessage] = useState(true)

  const fetchFormat = async () => {
    try {
      const text = await getWhatsappMessageFormat()
      setMessage(text.data.data[0].message)
    } catch (error) {
      console.error("error ==> ", error)
    }
  }

  const updateMessageFormat = async () => {
    try {
      await updateWhatsappMessageFormat(message)
      fetchFormat()
    } catch (error) {
      console.error("error ==> ", error)
    }
  }

  const handleFileSelect = (e: any) => {
    setFiles(e.target.files[0])
    setButtonText(e.target.files[0].name)
  }

  useEffect(() => {
    fetchFormat()
  }, [])
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
        <input type='file' className='file-selector' id="file-input" onChange={(e) => handleFileSelect(e)}/>
        <SecondaryButton className='secondary-right-aligned' text={buttonText} htmlFor='file-input'/>
        {progress == 100 ? fileUploadMsg : ""}
        </div>
        </div>
        <PrimaryButton className={`${files != undefined ? '' : 'disabled'} primary-left-aligned`} text='Save' onClick={submitHandler}/>
      </div>
      <div className='card-container'>
        <Heading2 className='heading2-right-aligned' text='Whatsapp Message Format' />
        <div className='card-body'>
            <div className='format-container'>
                <input type='text' disabled={editMessage} className='whatsapp-format' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <HiPencil className="edit-icon" onClick={() => setEditMessage(!editMessage)}/>
            </div>
            <PrimaryButton text='Update' className='primary-left-aligned' onClick={updateMessageFormat} />
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
