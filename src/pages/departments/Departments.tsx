import { AiOutlineSearch } from 'react-icons/ai'
import DropDown from '../../components/drop-down/DropDown'
import './Departments.scss'
import Heading1 from '../../components/typography/heading-1/Heading1'

const Departments = () => {
    const fetchComplaints = (option: string) => {
        console.log(option)
    }
  return (
    <div className='departments-container'>
    <div className='upper-half'>
    <Heading1 text='Departments Management' />
      <div className='filterandsearch'>
          <div className='search-container'>
            <input type="text" className='searchbar' placeholder='Search Department'/>
            <AiOutlineSearch className="search-icon"/>
            </div>
          <DropDown options={["Visa", "Travel", "Transportation"]} apiFunction={fetchComplaints}/>
      </div>
    </div>
    <table className='complaints-table'>
      <tr className='table-header'>
          <th>Complaint ID</th>
          <th>Customer Name</th>
          <th>Phone number</th>
          <th>Reported on</th>
          <th>Assigned  to</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
      </tr>
    </table>
  </div>
  )
}

export default Departments
