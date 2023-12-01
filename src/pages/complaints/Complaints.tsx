import DropDown from "../../components/drop-down/DropDown";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import "./Complaints.scss";
import { useEffect, useState } from "react";
import CreateComplaint from "../../components/modal/create-complaint/CreateComplaint";
import SecondaryButton from "../../components/secondary-button/SecondaryButton";
import Heading1 from "../../components/typography/heading-1/Heading1";
import {
  FilterSelectStyle,
  StatusStyle,
} from "../../components/drop-down/ReactSelectStyles";
import ComplaintDetails from "../../components/modal/complaint-details/ComplaintDetails";
import Comments from "../../components/modal/comments/Comments";
import { LocalStorageKeys, getFromStorage } from "../../../utils/localStorage";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { getAllComplaints, getAllDepartments } from "./service/Complaint";
import { getAllStatuses } from "../../components/modal/create-complaint/services/CreateComplaint";
import ReactPaginate from "react-paginate";

const Complaints = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [complaintsCopy, setComplaintsCopy] = useState<any[]>([]);
  // const [searchValue, setSearchValue] = useState("")
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAddComplaintModal, setShowAddComplaintModal] = useState(false);
  const [showComplaintDetailModal, setShowComplaintDetailModal] =
    useState(false);
  const [departments, setDepartments] = useState<
    { id: number | null; value: string; label: string }[]
  >([]);
  const [selectedDept, setSelectedDept] = useState<any>();
  const [statuses, setStatuses] = useState<
    { id: number; value: string; label: string; color: string }[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [statusClass, setStatusClass] = useState<any>("");
  const [complaintId, setComplaintId] = useState<number>(0);
  const [complaintType, setComplaintType] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(complaints.length / usersPerPage);

  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  const clearDate = () => {
    setComplaints(complaintsCopy);
    setFromDate("");
    setToDate("");
    // setPage(previousPage);
    // setRowsPerPage(rowsPerPagePrevious);
  };

  const searchHandler = () => {
    let copyComplaints = [...complaintsCopy];
    if (fromDate && toDate) {
      copyComplaints = copyComplaints.filter((complaint: any) => {
        const orderDate = new Date(complaint?.createdAt);
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        // setPage(0);
        // setRowsPerPage(10);
        return orderDate >= fromDateObj && orderDate <= toDateObj;
      });
    }
    if (toDate == "" && fromDate == "") {
      // setMessage("Please select to and from date");
      // setShowMessage(true);
    }
    if (toDate != "" && fromDate == "") {
      // setMessage("Please select from date");
      // setShowMessage(true);
    }
    if (toDate == "" && fromDate != "") {
      // setMessage("Please select to date");
      // setShowMessage(true);
    }
    setComplaints(copyComplaints);
  };

  const fetchComplaints = async (
    department_id: number | null,
    offset: number
  ) => {
    try {
      console.log("department_id =====? ", department_id);
      const company_type_id = getFromStorage(LocalStorageKeys.USER).user
        .company_type_id;
      const response = await getAllComplaints({
        department_id: department_id,
        complaint_type_id:
          company_type_id == null ? complaintType : company_type_id,
        complaint_status_id: selectedStatus.id,
        offset: offset,
      });
      setComplaints(response.data.data.complaints.rows);
      setComplaintsCopy(response.data.data.complaints.rows);
    } catch (error) {
      console.log("error ===> ", error);
    }
  };

  useEffect(() => {
    fetchComplaints(selectedDept?.id, 0);
  }, [complaintType, selectedStatus]);
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      let deptCopy: any[] = [{ id: 0, value: "none", label: "None" }];
      const deptRetrieved = response.data.data.departments.map(
        (department: any) => {
          return {
            id: department.id,
            value: department.name,
            label: department.name.toLowerCase(),
          };
        }
      );
      deptCopy = deptCopy.concat(deptRetrieved);
      deptCopy = deptCopy.concat([{ id: 4, value: "all", label: "All" }]);
      console.log("deptCopy ==> ", deptCopy);
      setDepartments([...deptCopy]);
      const user = getFromStorage(LocalStorageKeys.USER);
      if (user?.user?.user_type_id == 1 || user?.user?.user_type_id == 3) {
        setIsSuperAdmin(false);
        setSelectedDept({
          id: user?.user?.department_id,
          value: user?.user?.department?.name,
          label: user?.user?.department?.name?.toLowerCase(),
        });
        fetchComplaints(user?.user?.department_id, 0);
      } else if (user?.user?.user_type_id == 2) {
        setSelectedDept(deptCopy[4]);
        fetchComplaints(deptCopy[4].id, 0);
        setIsSuperAdmin(true);
      }
      console.log("departments ==> ", departments);
      return deptCopy;
    } catch (error) {
      console.log("error ===> ", error);
    }
  };

  const fetchStatuses = async () => {
    const response = await getAllStatuses();
    const statusesCopy = response.data.data.statuses.map((status: any) => {
      return {
        id: status.id,
        value: status.name,
        label: status.name.toUpperCase(),
      };
    });
    const statusModified = statusesCopy.map((status: any) => {
      switch (status.value) {
        case "All":
          return {
            ...status,
            color: "#00008B",
          };
        case "Resolved":
          return {
            ...status,
            color: "#013220",
          };
        case "In Progress":
          return {
            ...status,
            color: "#8B8000",
          };
        case "Late":
          return {
            ...status,
            color: "#FF5733",
          };
        default:
          break;
      }
    });
    console.log("statusesCopy ==> ", statusesCopy);
    setStatuses([...statusModified]);
    setSelectedStatus(statusesCopy[0]);
    console.log("departments ==> ", departments);
    return statusesCopy;
  };

  const searchComplaints = async (keyword: string) => {
    const inputString = keyword;
    const regex = /\s+/g;

    let copyComplaints = [...complaintsCopy];
    let resultString: any;

    if (inputString.trim() === "") {
      // setProductPage(product_page_previous);
      // setProductsPerPage(productsPerPagePrevious);
      resultString = inputString;
      setComplaints([...complaintsCopy]);
    } else {
      resultString = inputString.trim().replace(regex, " ");
      resultString = resultString.toLowerCase();

      copyComplaints = copyComplaints.filter((complaint: any) => {
        let customerNumber = complaint?.customerNumber;
        let description = complaint?.description;
        customerNumber = customerNumber.toLowerCase();
        description = description.toLowerCase();
        return (
          customerNumber.includes(resultString) ||
          description.includes(resultString)
        );
      });
      setComplaints([...copyComplaints]);
      // setProductPage(0);
      // setProductsPerPage(10);
    }
  };

  const filterDepartments = (inputValue: string) => {
    return departments.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (searchValue: string, callback: any) => {
    console.log("departments ==> ", departments);
    setTimeout(() => {
      callback(filterDepartments(searchValue));
    }, 2000);
  };

  useEffect(() => {
    fetchDepartments();
    fetchStatuses();
    // fetchComplaints(selectedDept?.id, 0)
  }, []);

  const handleDepartmentChange = (option: any) => {
    console.log("selectedDept ===> ", option);
    setSelectedDept(option);
    fetchComplaints(option.id, 0);
  };

  const handleStatusChange = (option: any) => {
    console.log("selectedStatus ===> ", selectedStatus);
    setSelectedStatus(option);
  };

  const handleViewComplaintDetails = (id: number) => {
    setComplaintId(id);
    setShowComplaintDetailModal(true);
  };

  const handleViewComplaintComments = (id: number) => {
    setComplaintId(id);
    setShowCommentsModal(true);
  };

  const toggleComplaintType = (type_id: number) => {
    setComplaintType(type_id);
  };

  const reportedOn = (dateString: any) => {
    const date = new Date(dateString);

    // Define functions to add leading zeros to single-digit numbers
    const addLeadingZero = (num: any) => (num < 10 ? "0" + num : num);

    // Extract date components
    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1); // Month is zero-based
    const year = date.getFullYear();
    const hours = addLeadingZero(date.getUTCHours());
    const minutes = addLeadingZero(date.getUTCMinutes());

    // Create the formatted date string
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

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
          <div className="complaints-container">
            {showAddComplaintModal && (
              <CreateComplaint
                fetchComplaints={() => fetchComplaints(selectedDept.id, 0)}
                onClose={() => setShowAddComplaintModal(false)}
              />
            )}
            {showComplaintDetailModal && complaintId && (
              <ComplaintDetails
                fetchComplaints={() => fetchComplaints(selectedDept.id, 0)}
                complaintId={complaintId}
                onClose={() => setShowComplaintDetailModal(false)}
              />
            )}
            {showCommentsModal && (
              <Comments
                complaintId={complaintId}
                onClose={() => setShowCommentsModal(false)}
              />
            )}
            <div className="upper-half">
              <Heading1 text="Complaints Management" />
              <div className="type-and-add">
                <div className="complaint-toggle-container">
                  {getFromStorage(LocalStorageKeys.USER).user.user_type_id ==
                    2 && (
                    <SecondaryButton
                      toggle={true}
                      className={`complaint-toggle ${
                        complaintType == 1 ? "active-tab" : "inactive"
                      }`}
                      text="AEG"
                      onClick={() => toggleComplaintType(1)}
                    />
                  )}
                  {getFromStorage(LocalStorageKeys.USER).user.user_type_id ==
                    2 && (
                    <SecondaryButton
                      toggle={true}
                      className={`complaint-toggle ${
                        complaintType == 2 ? "active-tab" : "inactive"
                      }`}
                      text="TicketJee"
                      onClick={() => toggleComplaintType(2)}
                    />
                  )}
                </div>
                <button
                  className="add-complaint"
                  onClick={() => setShowAddComplaintModal(true)}
                >
                  <AiOutlinePlus color="#fff" />
                </button>
              </div>
              <div className="filterandsearch">
                <div className="search-container">
                  <input
                    type="text"
                    className="searchbar"
                    placeholder="Search by customer number or description"
                    // value={searchValue}
                    onChange={(e) => searchComplaints(e.target.value)}
                  />
                  <AiOutlineSearch className="search-icon" />
                </div>
                {isSuperAdmin && selectedDept && (
                  <DropDown
                    label="Departments"
                    value={selectedDept}
                    defaultValue={selectedDept}
                    styles={FilterSelectStyle}
                    onChange={handleDepartmentChange}
                    options={departments}
                  />
                )}
                {selectedStatus && (
                  <DropDown
                    label="Status"
                    value={selectedStatus}
                    defaultValue={selectedStatus}
                    styles={StatusStyle}
                    onChange={handleStatusChange}
                    options={statuses}
                  />
                )}
              </div>
              {/* <div className="complaint-toggle-container">
                <SecondaryButton className="complaint-toggle" text="AEG" onClick={() => toggleComplaintType(1)}/>
                <SecondaryButton className="complaint-toggle" text="TicketG" onClick={() => toggleComplaintType(2)}/>
              </div>
              <SecondaryButton
                className="secondary-left-aligned"
                text="Add Complaint"
                onClick={() => setShowAddComplaintModal(true)}
              /> */}
              <div className="date-filter-container">
                <div className="date-filter-wrapper">
                  <div className="individual-date-filter">
                    <label className="date-filter-label">From</label>
                    <input
                      type="date"
                      name=""
                      id=""
                      placeholder="From"
                      className="date-selector"
                      value={fromDate}
                      max={toDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      onKeyDown={(e) => {
                        e.preventDefault();
                        return;
                      }}
                    />
                  </div>
                  <div className="individual-date-filter">
                    <label className="date-filter-label">To</label>
                    <input
                      type="date"
                      name=""
                      id=""
                      placeholder="To"
                      className="date-selector"
                      value={toDate}
                      min={fromDate}
                      onChange={(e) => setToDate(e.target.value)}
                      onKeyDown={(e) => {
                        e.preventDefault();
                        return;
                      }}
                    />
                  </div>
                  <SecondaryButton
                    text="Search"
                    onClick={searchHandler}
                    className="date-search-button"
                  />
                  <SecondaryButton
                    text="Clear"
                    onClick={clearDate}
                    className="date-clear-button"
                  />
                </div>
              </div>
            </div>
            <table className="complaints-table">
              <tr className="table-header">
                <th>Complaint ID</th>
                <th>Phone number</th>
                <th>Customer Name</th>
                <th>Reported on</th>
                <th>Assigned to</th>
                <th>Created By</th>
                <th>Department</th>
                <th>Status</th>
                <th>From Whatsapp</th>
                <th>Actions</th>
              </tr>
              {complaints
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((complaint) => (
                  <tr key={complaint.id} className="table-row">
                    <td>{complaint.id}</td>
                    <td>{complaint.customerNumber}</td>
                    <td>
                      {complaint.customerName ? complaint.customerName : "-"}
                    </td>
                    <td>{reportedOn(complaint.createdAt)}</td>
                    <td>
                      {complaint.user
                        ? complaint.user.first_name +
                          " " +
                          complaint.user.last_name
                        : "-"}
                    </td>
                    <td>{complaint.createdBy}</td>
                    <td>
                      {complaint.department ? complaint.department.name : "-"}
                    </td>
                    <td className={`${complaint.complaint_status.name == "In Progress" && "in-progress"} ${complaint.complaint_status.name == "Resolved" && "resolved"} ${complaint.complaint_status.name == "Late" && "late"}`}>
                      {complaint.complaint_status.name}
                    </td>
                    <td>{complaint.fromWhatsapp == false ? "No" : "Yes"}</td>
                    <td className="action-cell">
                      <BsEyeFill
                        className="details-icon"
                        color="#252525"
                        onClick={() => handleViewComplaintDetails(complaint.id)}
                      />
                      <FaCommentDots
                        color="#3373B1"
                        className="comments-icon"
                        onClick={() =>
                          handleViewComplaintComments(complaint.id)
                        }
                      />
                    </td>
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
  );
};

export default Complaints;
