import { useEffect, useState } from 'react';
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage'
import Header from '../../components/header/Header'
import Navbar from "../../components/navbar/Navbar";
import Heading1 from '../../components/typography/heading-1/Heading1';
import { BsCheckCircleFill,BsXCircleFill,BsExclamationCircleFill } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import { getAllStatuses } from './service/MessageStatus';
import './MessageStatus.scss'
import Heading2 from '../../components/typography/heading-2/Heading2';


const MessageStatus = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [messagesStatuses, setMessagesStatuses] = useState<any[]>([])
    const [delivered, setDelivered] = useState(0);
    const [notDelivered, setNotDelivered] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
  
    const pageCount = Math.ceil(messagesStatuses.length / usersPerPage);
  
    const changePage = (selectedItem: {
      selected: number;
      }) => {
      setPageNumber(selectedItem.selected);
    };
    const fetchStatuses = async () => {
        try {
            const response = await getAllStatuses()
            let delivered = 0
            let not_delivered = 0
            response.data.data.forEach((message: any) => {
                if (message.messageStatus == 1)
                {
                    not_delivered += 1
                }
                if (message.messageStatus == 2)
                {
                    delivered += 1
                }
            })
            response.data.data.reverse()
            setDelivered(delivered)
            setNotDelivered(not_delivered)
            setMessagesStatuses(response.data.data)
            // setUsersCopy(response.data.data.users.rows)
        } catch (error) {
            console.log("error ===> ", error)
        }
      };
    
      useEffect(() => {
        fetchStatuses()
      }, [])
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
            Object.entries(getFromStorage(LocalStorageKeys.USER)).length != 0
              ? "left-container"
              : "login-signup-container"
          }`}
        >
            <div className="message-status-container">
                <div className='heading-container'>
                <Heading1 text="Message Tracking" />
                <Heading2 className='success-rate' text={`Success Rate ${(delivered / (delivered + notDelivered))*100} %`}/>
                </div>
                <table className="users-table">
              <tr className="table-header">
                <th>Customer Number</th>
                <th>Customer Name</th>
                <th>Message Status</th>
                <th>Description</th>
                <th>Service End Date</th>
              </tr>
              {messagesStatuses
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((message) => (
              <tr className="table-row">
                <td>{message.customerNumber}</td>
                <td>{message.customerName}</td>
                <td>{message.messageStatus==0 && <BsExclamationCircleFill color="#ddaa00" class="icon"/>}{message.messageStatus==1 && <BsXCircleFill color="#990000" class="icon"/>}{message.messageStatus==2 && <BsCheckCircleFill color="#009900" class="icon"/>}</td>
                <td>{message.messageStatus == 0 && 'Pending'}{message.messageStatus == 1 && 'Not Delivered'}{message.messageStatus == 2 && 'Delivered'}</td>
                <td>{message.serviceEndDate}</td>
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
    </>
  )
}

export default MessageStatus
