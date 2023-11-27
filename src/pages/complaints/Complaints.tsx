import DropDown from "../../components/drop-down/DropDown";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import "./Complaints.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import CreateComplaint from "../../components/modal/create-complaint/CreateComplaint";
import SecondaryButton from "../../components/secondary-button/SecondaryButton";
import Heading1 from "../../components/typography/heading-1/Heading1";
import { FilterSelectStyle, StatusStyle } from "../../components/drop-down/ReactSelectStyles";
import ComplaintDetails from "../../components/modal/complaint-details/ComplaintDetails";
import Comments from "../../components/modal/comments/Comments";
import { LocalStorageKeys, getFromStorage } from "../../../utils/localStorage";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { fetchComplaintsByMonth, getAllComplaints, getAllDepartments, getWhatsappResponsesCount } from "./service/Complaint";
import { getAllStatuses } from "../../components/modal/create-complaint/services/CreateComplaint";
import Heading2 from "../../components/typography/heading-2/Heading2";
import ReactPaginate from "react-paginate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

let graph: any[] = [];

const getComplaintsByMonth = (complaintsByDate: any[]) => {
  let graphData = [{ month: 'Jan', count: 0 }, { month: 'Feb', count: 0 }, { month: 'Mar', count: 0 }, { month: 'Apr', count: 0 }, { month: 'May', count: 0 }, { month: 'Jun', count: 0 }, { month: 'Jul', count: 0 }, { month: 'Aug', count: 0 }, { month: 'Sep', count: 0 }, { month: 'Oct', count: 0 }, { month: 'Nov', count: 0 }, { month: 'Dec', count: 0 }];
  for (let i = 0; i < complaintsByDate.length; i++) {
    console.log("complaintsByDate[i] ===> ", complaintsByDate[i])
    const date = new Date(complaintsByDate[i]?.created_at)
    const month = date.toLocaleString('default', { month: 'short' });
    const index = graphData.findIndex((data) => data.month === month);
    
    graphData[index]['count'] += Number(complaintsByDate[i]?.count)
  }
  graph = [...graphData]
  console.log("graphData ===> ", graph)
  // return graphData
}

const Complaints = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true)
  const [complaints, setComplaints] = useState<any[]>([])
  const [complaintsCopy, setComplaintsCopy] = useState<any[]>([])
  // const [searchValue, setSearchValue] = useState("")
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAddComplaintModal, setShowAddComplaintModal] = useState(false);
  const [showComplaintDetailModal, setShowComplaintDetailModal] =
    useState(false);
  const [departments, setDepartments] = useState<{id: number | null, value: string, label: string}[]>([])
  const [selectedDept, setSelectedDept] = useState<any>()
  const [statuses, setStatuses] = useState<{id: number, value: string, label: string, color:string}[]>([])
  const [selectedStatus, setSelectedStatus] = useState<any>()
  const [complaintId, setComplaintId] = useState<number>(0);
  const [complaintType, setComplaintType] = useState(1)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const [whatsappResponses, setWhatsappResponses] = useState<any>({
    labels: [
      'Yes',
      'No',
    ],
    datasets: [{
      label: 'Total: ',
      data: [0, 0],
      backgroundColor: [
        '#F958C9',
        '#55C5D1',

      ],
      hoverOffset: 4
    }]
  })

  const [complaintsByDate, setComplaintsByDate] = useState([]);

  const pageCount = Math.ceil(complaints.length / usersPerPage);

  const changePage = (selectedItem: {
    selected: number;
}) => {
    setPageNumber(selectedItem.selected);
  };

  const fetchGraphDetails = async () => {
      const graphDetails = await fetchComplaintsByMonth(1)
      setComplaintsByDate(graphDetails.data.data.complaints)
  }

  useEffect(() => {
      fetchGraphDetails()
  }, [complaints])
  // useEffect(() => {
  //   const user = getFromStorage(LocalStorageKeys.USER)
  //   if (user?.user?.user_type_id == 1)
  //   {
  //     setSelectedDept({
  //       id: user?.user?.department_id,
  //       value: user?.user?.department?.name,
  //       label: user?.user?.department?.name?.toLowerCase()
  //     })
  //   }
  //   else if (user?.user?.user_type_id == 1)
  //   console.log("Userrrr =>>> ", user)
  // }, [])

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

  const fetchComplaints = async (department_id: number | null, offset: number) => {
    try {
        console.log("department_id =====? ", department_id)
        const response = await getAllComplaints({department_id: department_id, complaint_type_id: complaintType, complaint_status_id: selectedStatus.id, offset: offset})
        setComplaints(response.data.data.complaints.rows)
        setComplaintsCopy(response.data.data.complaints.rows)
    } catch (error) {
        console.log("error ===> ", error)
    }
  };

  useEffect(() => {
    fetchComplaints(selectedDept?.id, 0)
  }, [complaintType, selectedStatus])
  const fetchDepartments = async () => {
    try {
        const response = await getAllDepartments()
        let deptCopy: any[] = [{id: 0, value: 'none', label: 'None'}]
        const deptRetrieved = response.data.data.departments.map((department: any) => {
            return {
                id: department.id,
                value: department.name,
                label: department.name.toLowerCase()
            }
        })
        deptCopy = deptCopy.concat(deptRetrieved)
        deptCopy = deptCopy.concat([{id: 4, value: 'all', label: 'All'}])
        console.log("deptCopy ==> ", deptCopy)
        setDepartments([...deptCopy])
        const user = getFromStorage(LocalStorageKeys.USER)
        if (user?.user?.user_type_id == 1 || user?.user?.user_type_id == 3)
        {
          setIsSuperAdmin(false)
          setSelectedDept({
            id: user?.user?.department_id,
            value: user?.user?.department?.name,
            label: user?.user?.department?.name?.toLowerCase()
          })
          fetchComplaints(user?.user?.department_id, 0)
        }
        else if (user?.user?.user_type_id == 2)
        {
          setSelectedDept(deptCopy[4])
          fetchComplaints(deptCopy[4].id, 0)
          setIsSuperAdmin(true)
        }
        console.log("departments ==> ", departments)
        return deptCopy
    } catch (error) {
        console.log("error ===> ", error)
    }
  }

  const fetchStatuses = async () => {
    const response = await getAllStatuses()
    const statusesCopy = response.data.data.statuses.map((status: any) => {
      return {
          id: status.id,
          value: status.name,
          label: status.name.toUpperCase()
      }
  })
  const statusModified = statusesCopy.map((status: any) => {
    switch (status.value) {
      case "Open":
        return {
          ...status,
          color: '#00008B'
        }
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
      case "Cancelled":
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
        let customerNumber = complaint?.customerNumber
        let description = complaint?.description
        customerNumber = customerNumber.toLowerCase()
        description = description.toLowerCase()
        return (
          customerNumber.includes(resultString) ||
          description.includes(resultString)
        );
      });
      setComplaints([...copyComplaints]);
      // setProductPage(0);
      // setProductsPerPage(10);
    }
  }

  const filterDepartments = (inputValue: string) => {
    return departments.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (searchValue: string, callback: any) => {
        console.log("departments ==> ", departments)
        setTimeout(() => {
            callback(filterDepartments(searchValue));
          }, 2000);
  }

  useEffect(() => {
    fetchDepartments()
    fetchStatuses()
    fetchWhatsappResponsesCount()
    // fetchComplaints(selectedDept?.id, 0)
  }, [])

  const fetchWhatsappResponsesCount = async () => {
    try {
      const whatsappResponsesCounts = await getWhatsappResponsesCount()
      setWhatsappResponses({
        labels: [
          'Yes',
          'No',
        ],
        datasets: [
          {
            label: 'Total: ',
            data: [whatsappResponsesCounts.data.data.responses[0].positive, whatsappResponsesCounts.data.data.responses[0].negetive],
            backgroundColor: [
              '#55C5D1',
              '#F16222',
            ],
            hoverOffset: 4
          }]
      })
    } catch (error) {
      console.log("error ===> ", error)
    }
  }

  const handleDepartmentChange = (option: any) => {
    console.log("selectedDept ===> ", option)
      setSelectedDept(option)
      fetchComplaints(option.id, 0)
    }

  const handleStatusChange = (option: any) => {
      console.log("selectedStatus ===> ", selectedStatus)
      setSelectedStatus(option)
    }

  const handleViewComplaintDetails = (id: number) => {
    setComplaintId(id);
    setShowComplaintDetailModal(true);
  };

  const handleViewComplaintComments = (id: number) => {
    setComplaintId(id);
    setShowCommentsModal(true);
  };

  const toggleComplaintType = (type_id: number) => {
    setComplaintType(type_id)
    localStorage.setItem("complaint_type", String(type_id))
  }

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
    return formattedDate
  }

useEffect(() => {
  getComplaintsByMonth(complaintsByDate)
}, [complaintsByDate])

  // let graphData = [
  //   { month: "Jan", count: 0 },
  //   { month: "Feb", count: 0 },
  //   { month: "Mar", count: 0 },
  //   { month: "Apr", count: 0 },
  //   { month: "May", count: 0 },
  //   { month: "Jun", count: 0 },
  //   { month: "Jul", count: 0 },
  //   { month: "Aug", count: 0 },
  //   { month: "Sep", count: 0 },
  //   { month: "Oct", count: 0 },
  //   { month: "Nov", count: 0 },
  //   { month: "Dec", count: 0 },
  // ];
  // graph = [...graphData];
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
                  <SecondaryButton toggle={true} className={`complaint-toggle ${complaintType == 1 ? 'active-tab' : 'inactive'}`} text="AEG" onClick={() => toggleComplaintType(1)}/>
                  <SecondaryButton toggle={true} className={`complaint-toggle ${complaintType == 2 ? 'active-tab' : 'inactive'}`} text="TicketJee" onClick={() => toggleComplaintType(2)}/>
                </div>
                <button
                  className="add-complaint"
                  onClick={() => setShowAddComplaintModal(true)}
                  >
                  <AiOutlinePlus color="#fff"/>
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
                {isSuperAdmin && selectedDept && <DropDown
                  label="Departments"
                  value={selectedDept}
                  defaultValue={selectedDept}
                  styles={FilterSelectStyle}
                  onChange={handleDepartmentChange}
                  options={departments}
                />}
                {selectedStatus && <DropDown
                  label="Status"
                  value={selectedStatus}
                  defaultValue={selectedStatus}
                  styles={StatusStyle}
                  onChange={handleStatusChange}
                  options={statuses}
                />}
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
                    <label className="date-filter-label">
                      From
                    </label>
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
                    <label className="date-filter-label">
                      To
                    </label>
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
                  <SecondaryButton text="Search" onClick={searchHandler} className="date-search-button"/>
                  <SecondaryButton text="Clear" onClick={clearDate} className="date-clear-button"/>
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
              <tr className="table-row">
                <td>{complaint.id}</td>
                <td>{complaint.customerNumber}</td>
                <td>{complaint.customerName}</td>
                <td>{reportedOn(complaint.createdAt)}</td>
                <td>{complaint.user ? complaint.user.first_name + " " + complaint.user.last_name : '-'}</td>
                <td>{complaint.createdBy}</td>
                <td>{complaint.department ? complaint.department.name : '-'}</td>
                <td>{complaint.complaint_status.name}</td>
                <td>{complaint.fromWhatsapp == false ? "False" : "True"}</td>
                <td className="action-cell">
                  <BsEyeFill
                    className="details-icon"
                    color="#252525"
                    onClick={() => handleViewComplaintDetails(complaint.id)}
                  />
                  <FaCommentDots
                    color="#3373B1"
                    className="comments-icon"
                    onClick={() => handleViewComplaintComments(complaint.id)}
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
            <div className="graph-chart-container">
            <div className="graph-container">
            <Heading2 text="Complaints Stats" className="left-aligned-heading"/>
            {/* {selectedStatus && <DropDown
                  label="Status"
                  defaultValue={selectedStatus}
                  styles={StatusStyle}
                  onChange={handleStatusChange}
                  options={statuses}
                />} */}
            <Line
              data={{
                labels: graph.map((monthData) => {
                  return monthData.month;
                }),
                datasets: [
                  {
                    label: "Complaints",

                    data: graph.map((monthData) => {
                      return monthData?.count
                  }),
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.2,
                    pointStyle: "circle",
                    pointBackgroundColor: "white",
                    pointBorderColor: "red",
                    pointBorderWidth: 5,
                    pointHoverBorderWidth: 5,
                    pointRadius: 7,
                    pointHitRadius: 5,
                    pointHoverRadius: 10,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                  },
                ],
              }}
              options={{
                borderColor: "rgb(75, 192, 192)",
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, ticks) {
                        return value;
                      },
                    },
                    grid: {
                      display: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
            </div>
            <div className="chart-container">
              <Heading2 text="Whatsapp Poll Responses"/>
              <Doughnut 
                data={whatsappResponses}
                options={{
                  cutout: "80%",
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 1.4,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color : 'black',
                        padding : 25
                      }
                    }
                  }
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaints;
