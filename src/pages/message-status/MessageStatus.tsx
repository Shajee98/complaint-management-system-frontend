import { useEffect, useState } from 'react';
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage'
import Header from '../../components/header/Header'
import Navbar from "../../components/navbar/Navbar";
import Heading1 from '../../components/typography/heading-1/Heading1';
import './MessageStatus.scss'
import ReactPaginate from 'react-paginate';
import { getAllStatuses } from './service/MessageStatus';


const MessageStatus = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [messagesStatuses, setMessagesStatuses] = useState<any[]>([])

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
                <Heading1 text="Message Tracking" />
                <table className="users-table">
              <tr className="table-header">
                <th>Customer Number</th>
                <th>Message Status</th>
                <th>Description</th>
                <th>Service End Date</th>
              </tr>
              {messagesStatuses
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((message) => (
              <tr className="table-row">
                <td>{message.customerNumber}</td>
                <td>{message.messageStatus}</td>
                <td>{message.messageStatus}</td>
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
