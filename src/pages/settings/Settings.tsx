import { HiPencil } from 'react-icons/hi'
import PrimaryButton from '../../components/primary-button/PrimaryButton'
import SecondaryButton from '../../components/secondary-button/SecondaryButton'
import Heading2 from '../../components/typography/heading-2/Heading2'
import { LocalStorageKeys, getFromStorage, removeFromStorage } from '../../../utils/localStorage'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { ProgressBar } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import { postRequestFormData } from '../../../utils/auth'
import { deleteUser, getAllUsers, getWhatsappMessageFormat, updateWhatsappMessageFormat } from './service/Settings'
import Signup from '../signup/Signup'
import './Settings.scss'
import ReactPaginate from 'react-paginate'
import { FiDelete } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const [progress, setProgress] = useState<any>()
  const [files, setFiles] = useState<any>()
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const messageRef = useRef<HTMLInputElement>(null)
  const [fileUploadMsg, setFileUploadMsg] = useState("File Uploaded Successfully")
  const [buttonText, setButtonText] = useState("Upload CSV")
  const [editMessage, setEditMessage] = useState(true)
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);
  const navigate = useNavigate()

  const changePage = (selectedItem: {
    selected: number;
    }) => {
    setPageNumber(selectedItem.selected);
  };

  const fetchFormat = async () => {
    try {
      const text = await getWhatsappMessageFormat()
      setMessage(text.data.data[0].message)
    } catch (error: any) {
      console.log("Your errorrrr =? ", error)
      if (error?.message == "jwt expired")
      {
        removeFromStorage(LocalStorageKeys.USER)
        navigate("/login")
      }
    }
  }

  const updateMessageFormat = async () => {
    try {
      await updateWhatsappMessageFormat(message)
      fetchFormat()
    } catch (error: any) {
      console.log("Your errorrrr =? ", error)
      if (error?.message == "jwt expired")
      {
        removeFromStorage(LocalStorageKeys.USER)
        navigate("/login")
      }
    }
  }

  const handleFileSelect = (e: any) => {
    setFiles(e.target.files[0])
    setButtonText(e.target.files[0].name)
  }

  const handleEditMessage = () => {
    setEditMessage(!editMessage)
    setTimeout(() => {
      messageRef.current?.focus();
    }, 0);
  }

  const fetchUsers = async () => {
    try {
        const user = getFromStorage(LocalStorageKeys.USER)
        const response = await getAllUsers(user.user.department_id)
        setUsers(response.data.data.users)
        // setUsersCopy(response.data.data.users.rows)
    } catch (error) {
        console.log("error ===> ", error)
    }
  };

  const handleUserDelete = async (user_id: any) => {
    try {
      const user = await deleteUser(user_id)
      if (user.data.data.users.deleted == true)
      {
        fetchUsers()
      }
    } catch (error: any) {
      console.log("Your errorrrr =? ", error)
      if (error?.message == "jwt expired")
      {
        removeFromStorage(LocalStorageKeys.USER)
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchFormat()
    fetchUsers()
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
    <div className='settings-parent-container'>
    <div className='settings-child-container'>
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
        <Heading2 className='heading2-right-aligned whatsapp-format-heading' text='Whatsapp Message Format' />
        <div className='card-body'>
            <div className='format-container'>
                <input ref={messageRef} type='text' disabled={editMessage} className='whatsapp-format' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <HiPencil className="edit-icon" onClick={handleEditMessage}/>
            </div>
            <PrimaryButton text='Update' className='primary-left-aligned' onClick={updateMessageFormat} />
        </div>
      </div>
      </div>
      <Signup fetchUsers={fetchUsers}/>
    </div>
      <div className='card-container'>
      <Heading2 className='heading2-right-aligned' text='Users' />
            <table className="users-table">
              <tr className="table-header">
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Department</th>
                <th>User Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              {users
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((user) => (
              <tr key={user.id} className="table-row">
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.user_name}</td>
                <td>{user.department ? user.department.name : '-'}</td>
                <td>{user.user_type.name}</td>
                <td>{user.email}</td>
                <td><MdDelete className="delete-btn" color="#252525" onClick={() => handleUserDelete(user.id)}/></td>
              </tr>
                  ))}
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Settings
