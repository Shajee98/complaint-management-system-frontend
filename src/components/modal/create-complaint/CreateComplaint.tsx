import { FormEvent, useState, ChangeEvent, useEffect, createRef, useRef } from 'react'
import FormInput from '../../form-input/FormInput'
import Heading2 from '../../typography/heading-2/Heading2'
import PrimaryButton from '../../primary-button/PrimaryButton'
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai'
import './CreateComplaint.scss'
import DropDown from '../../drop-down/DropDown'
import { FormSelectStyle, StatusStyle } from '../../drop-down/ReactSelectStyles'
import SecondaryButton from '../../secondary-button/SecondaryButton'
import { getAllDepartments, getComplaintTypes } from '../../../components/modal/create-complaint/services/CreateComplaint'
import { getAllDeptStaffs, getAllStatuses } from './services/CreateComplaint'
import { postRequestFormData } from '../../../../utils/auth'
import { LocalStorageKeys, getFromStorage } from '../../../../utils/localStorage'
import DescriptionDD from '../../description-dropdown/DescriptionDD'
import FormTextArea from '../../form-textarea/FormTextArea'

interface Props {
  onClose: () => void,
  fetchComplaints: () => void
}

const CreateComplaint = ({onClose, fetchComplaints}: Props) => {
  const [customer_number, setCustomerNo] = useState('')
  const [customer_name, setCustomerName] = useState('')
  const [complaint_number, setComplaintNo] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [attachments, setAttachments] = useState<any[]>([])
  const [previews, setPreviews] = useState<any[]>([])
  const [departments, setDepartments] = useState<{id: number, value: string, label: string}[]>([])
  const [selectedDept, setSelectedDept] = useState<any>(null)
  const [staffs, setStaffs] = useState<{id: number, value: string, label: string}[]>([])
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [statuses, setStatuses] = useState<{id: number, value: string, label: string, color:string}[]>([])
  const [selectedStatus, setSelectedStatus] = useState<any>()
  const [complaintTypes, setComplaintTypes] = useState<{id: number, value: string, label: string}[]>()
  const [selectedType, setSelectedComplaintType] = useState<any>()
  const descriptionRef = createRef<HTMLTextAreaElement>()
  const descriptionContainerRef = createRef<HTMLDivElement>()
  const [descriptionDD, setDescriptionDD] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("Attachments before submit", attachments)
    try {
      e.preventDefault()
      if (!customer_number.trim()) {
        setError(true)
        return
      } else {
        setError(false)
        const options = {
          "Content-Type": "multipart/form-data"
        };
  
        const payload = new FormData();
        payload.append("customer_number", customer_number);
        payload.append("customer_name", customer_name);
        payload.append("created_by", getFromStorage(LocalStorageKeys.USER).user.first_name + ' ' + getFromStorage(LocalStorageKeys.USER).user.last_name);
        payload.append("complaint_number", complaint_number);
        payload.append("complaint_type_id", selectedType.id);
        payload.append("description", description);
        payload.append("department_id", selectedDept !== null ? String(selectedDept.id) : '');
        payload.append("staff_id", selectedStaff !== null ? String(selectedStaff.id) : '');
        payload.append("fromWhatsapp", "false")
        for (let i = 0; i < attachments.length; i++) {
          console.log("attachments[i].blob", attachments[i].blob) 
          payload.append("attachments", attachments[i]?.blob);
        }
        payload.append("complaint_status_id", String(selectedStatus.id));
        for (var key of payload.entries()) {
          console.log("payload ==> ", key[0] + ', ' + key[1]);
      }
      // const data = JSON.stringify(Object.fromEntries(payload));
        await postRequestFormData(
          "/complaints/create",
          payload,
          options
        )
        // .then((response) => {
        //   console.log("response ==> ", response)
        //   if (response.data.status.code == 401)
        //   {
        //     // console.log(response)
        //     navigate("/")
        //   }
        // }).catch((error) => {
        //   console.log("error ===> ", error.Error)
        // })
        fetchComplaints()
        onClose()
      }
    } catch (error: any) {
        console.log("Errorrrrrrrrrrrrrrrr ", error)
    }
  }

  const generateComplaintNumber = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let complaint_number = ''
    for (let i = 0; i < 7; i++) {
      complaint_number += characters.charAt(Math.floor(Math.random() * characters.length))
      
    }
    setComplaintNo(complaint_number)
  }
  const handleDepartmentChange = (option: any) => {
  console.log("selectedDept ===> ", option)
    if (option.value == "none")
    {
      setSelectedDept(null)
    }
    setSelectedDept(option)
    fetchStaffs(option.id)
  }

  const handleStaffChange = (option: any) => {
    console.log("selectedStaff ==> ", option)
    if (option.value == "none")
    {
      setSelectedStaff(null)
    }
    setSelectedStaff(option)
  }

  const handleStatusChange = (option: any) => {
    console.log("selectedStatus ===> ", selectedStatus)
    setSelectedStatus(option)
  }

  const handleComplaintTypeChange = (option: any) => {
    console.log("selectedStatus ===> ", selectedStatus)
    setSelectedComplaintType(option)
  }

  const handleRemoveAttachment = (image: { file: any; id: number }) => {
    setAttachments((prevAttachments) => (
      prevAttachments.filter((i) => i.id !== image.id)
    ));
    setPreviews((prevPreviews) =>
      prevPreviews.filter((p) => p.id !== image.id)
    );
    console.log("Previews ===> ", previews)
    console.log("Attachments ===> ", attachments)

  };

  const addPreviews = (
    newPreviews: {
      file: string;
      id: number;
      blob: File
    }[]


  ) => {
    console.log("previews ===> ", previews)
    for (let i = 0; i < newPreviews?.length; i++) {
      setPreviews((prevPreviews) => [
        ...prevPreviews,
        { file: newPreviews[i].file, id: newPreviews[i].id, blob: newPreviews[i].blob }
      ]);
    }
  };

  const handleAttachments = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | [] = e.target.files || [];
    
    if (fileList?.length === 0) {
      return;
    } else {
      let new_files = [];
      const alreadyAddedFiles = attachments
      for (let file of fileList as any) {
        new_files.push({
        id: Date.now(),
        file: URL.createObjectURL(file),
        blob: file,
        });
      }
      // let images = [...new_files];
      setAttachments([...alreadyAddedFiles, ...new_files]);
      addPreviews([...new_files]);
    }
    // const tempFile: File | undefined = e.target.files?.[0];
    // if (!tempFile) {
    //   return;
    // }
    // const alreadyAddedImages = attachments || [];
    // const existArray: any[] = [];
    // alreadyAddedImages.forEach((img: File) => {
    //   if (img.name == (tempFile as any).name) existArray.push(img);
    // });
    // if (existArray.length) {
    //   console.log("Already Exist");
    //   return;
    // }
    // const tempArray = [];
    // tempArray.push({
    //   id: Date.now(),
    //   file: URL.createObjectURL(tempFile),
    //   blob: tempFile,
    // });
    // setAttachments([...attachments, tempArray])
    // addPreviews(tempArray)
  }

  const fetchDepartments = async () => {
   const user = getFromStorage(LocalStorageKeys.USER)
    const response = await getAllDepartments()
    let deptCopy: any[] = [{ id: "", value: "none", label: "None" }];
    const deptRetrieved = response.data.data.departments.map((department: any) => {
        return {
            id: department.id,
            value: department.name,
            label: department.name.toUpperCase()
        }
    })
    deptCopy = deptCopy.concat(deptRetrieved);
    console.log("deptCopy ==> ", deptCopy)
    setDepartments([...deptCopy])
    if (user.user.user_type_id == 3 || user.user.user_type_id == 1)
    {
      setSelectedDept({
        id: user.user.department.id,
        value: user.user.department.name,
        label: user.user.department.name.toUpperCase()
      })
    fetchStaffs(user.user.department.id)
    }
    else {
      setSelectedDept(deptCopy[0])
      fetchStaffs(deptCopy[0].id)
    }
    console.log("departments ==> ", departments)
    return deptCopy
  }  

  const fetchStaffs = async (department_id: any) => { 

   const user = getFromStorage(LocalStorageKeys.USER)
   let staffsCopy: any[] = [{ id: "", value: "none", label: "None" }];
   if (department_id != "")
   {
      const response = await getAllDeptStaffs(department_id)
      const staffsRetrieved = response.data.data.staffs.map((staff: any) => {
        return {
            id: staff.id,
            value: staff.first_name + " " + staff.last_name,
            label: staff.first_name.toUpperCase() + " " +  staff.last_name.toUpperCase()
        }
    })
    console.log("staffsRetrieved ==> ", staffsRetrieved)
    staffsCopy = staffsCopy.concat(staffsRetrieved);
    }
  console.log("staffsCopy ==> ", staffsCopy)
  setStaffs([...staffsCopy])
  if (user.user.user_type_id == 3)
  {
    setSelectedStaff({
      id: user.user.id,
      value: user.user.first_name + " " + user.user.last_name,
      label: user.user.first_name.toUpperCase() + " " +  user.user.last_name.toUpperCase()
    })
  }
  else {
    setSelectedStaff(staffsCopy[0])
  }
  return staffsCopy
  }


const fetchComplaintTypes = async () => { 
    const response = await getComplaintTypes()
    const typesCopy = response.data.data.complaintType.map((type: any) => {
      return {
          id: type.id,
          value: type.name,
          label: type.name.toUpperCase()
      }
  })
  console.log("typesCopy ==> ", typesCopy)
  setComplaintTypes([...typesCopy])
  const type_id = getFromStorage(LocalStorageKeys.USER).user.company_type_id
  switch (type_id) {
    case 1:
      setSelectedComplaintType(typesCopy[0])
      break;
    case 2:
      setSelectedComplaintType(typesCopy[1])
      break;
    case null:
      setSelectedComplaintType(typesCopy[0])
      break;
    default:
      break;
  }
  return typesCopy
  }

  const fetchStatuses = async () => {
    const response = await getAllStatuses()
    const statusesCopy = response.data.data.statuses.map((status: any) => {
      return {
          id: status.id,
          value: status.name,
          label: status.name.toUpperCase()
      }
  }).filter((status: any) => status.value != "All")

  const statusModified = statusesCopy.map((status: any) => {
    switch (status.value) {
      case "Resolved":
        return {
          ...status,
          color: "#013220"
        }
      case "In Progress":
        return {
          ...status,
          color: "#8B8000"
        }
      case "Late":
        return {
            ...status,
            color: "#FF5733"
          }
      default:
        break;
    }
  })
  console.log("statusesCopy ==> ", statusesCopy)
  setStatuses([...statusModified])
  setSelectedStatus(statusesCopy[0])
  console.log("departments ==> ", departments)
  return statusesCopy
  }

  const handleFocus = () => {
    descriptionRef?.current?.focus ? setDescriptionDD(true) : setDescriptionDD(false)
  }

  const handleDescriptionDDOutsideClick = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDescriptionDD(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  handleDescriptionDDOutsideClick(descriptionContainerRef)

  useEffect(() => {
    fetchDepartments()
    fetchStatuses()
    generateComplaintNumber()
    fetchComplaintTypes()
  }, [])

  return (
    <div className='modal-container'>
      <div className='modal-header'>
      <Heading2 className='heading-2-aligned-center' text='Complaint'/>
      <AiFillCloseCircle onClick={onClose} className='complaint-modal-cross'/>
      </div>
      <form className='form-wrapper'>
        <FormInput 
          label="Customer Number"
          value={customer_number}
          name="name"
          error={error}
          onChange={(e) => setCustomerNo(e.target.value)}
          placeholder="Please enter customer number"
        />
        <FormInput 
          label="Customer Name"
          value={customer_name}
          name="name"
          error={error}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Please enter customer name"
        />
        <div ref={descriptionContainerRef} className='description-wrapper'>
          <FormTextArea
            ref={descriptionRef}
            type="text"
            label="Description"
            value={description}
            name="name"
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => handleFocus()}
            // onBlur={() => setDescriptionDD(false)}
            placeholder="Please enter complaint description"
          />
          {descriptionDD ? <DescriptionDD setDescription={setDescription}/> : null}

        </div>
        {<DropDown value={selectedDept} label='Department' styles={FormSelectStyle} options={departments} onChange={handleDepartmentChange} disabled={getFromStorage(LocalStorageKeys.USER).user.user_type_id == 3 || getFromStorage(LocalStorageKeys.USER).user.user_type_id == 1}/>}
        {<DropDown value={selectedStaff} label='Staff' styles={FormSelectStyle} options={staffs} onChange={handleStaffChange} disabled={getFromStorage(LocalStorageKeys.USER).user.user_type_id == 3}/>}
        {selectedStatus && <DropDown value={selectedStatus} label='Status' styles={StatusStyle} options={statuses} onChange={handleStatusChange} defaultValue={selectedStatus}/>}
        {selectedType && <DropDown value={selectedType} label='Type' styles={FormSelectStyle} disabled={getFromStorage(LocalStorageKeys.USER).user.user_type_id != 2} options={complaintTypes} onChange={handleComplaintTypeChange} defaultValue={selectedType}/>}
        {/* [{value: 'open', label: 'Open', color: '#FF5733'}, {value: 'resolved', label: 'Resolved', color: '#00FF00'}, {value: 'in progress', label: 'In Progress', color: '#FFD700'}, {value: 'resolved', label: 'Resolved', color: '#00FF00'},{value: 'cancelled', label: 'Cancelled', color: '#008000'}] */}
        <div className='attachments-container'>
          <label htmlFor="attachments">Attachments</label>
          <input type='file' multiple className='attachment-selector' id="attachments" onChange={(e) => handleAttachments(e)}/>
          <SecondaryButton text='Upload Attachments' className='file-uploader' htmlFor='attachments' toggle={false}/>
          <div className='attachments-list'>
            {previews.map((preview, index) => (
              <div key={index} className='attachment-container'>
                <p className='attachment-name'>{preview?.blob?.name}</p>
                <AiOutlineClose onClick={() => handleRemoveAttachment(preview)}/>
              </div>
            ))}
          </div>
        </div>
      </form>
        <div className='modal-footer'>
          <PrimaryButton text='Cancel' onClick={onClose} className='primary-to-sec'/>
          <PrimaryButton onClick={(e) => handleSubmit(e)} className='modal-primary' text='Submit' />
        </div>
    </div>
  )
}

export default CreateComplaint
