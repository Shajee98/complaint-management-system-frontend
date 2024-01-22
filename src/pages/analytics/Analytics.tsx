import { useState, useEffect } from 'react'
import { Doughnut, Line } from "react-chartjs-2"
import { LocalStorageKeys, getFromStorage, removeFromStorage } from "../../../utils/localStorage"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Heading2 from "../../components/typography/heading-2/Heading2"
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
import { fetchComplaintsByMonth, getWhatsappResponsesCount } from './service/Analytics'
import SecondaryButton from '../../components/secondary-button/SecondaryButton'
import './Analytics.scss'
import { useNavigate } from 'react-router-dom'

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

const Analytics = () => {
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
  const [complaintType, toggleComplaintType] = useState(1);
  const navigate = useNavigate()

    const fetchGraphDetails = async () => {
      try {
        const graphDetails = await fetchComplaintsByMonth(1, complaintType)
        setComplaintsByDate(graphDetails.data.data.complaints)
        
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
        getComplaintsByMonth(complaintsByDate)
      }, [complaintsByDate])
  
    useEffect(() => {
        fetchGraphDetails()
        fetchWhatsappResponsesCount()
    }, [complaintType])

      const fetchWhatsappResponsesCount = async () => {
        try {
          const whatsappResponsesCounts = await getWhatsappResponsesCount(complaintType)
          var yes = Number(whatsappResponsesCounts.data.data.responses[0].positive)
          var no = Number(whatsappResponsesCounts.data.data.responses[0].negetive)
          var yespct = ((whatsappResponsesCounts.data.data.responses[0].positive/(yes+no))*100).toString()
          var nopct = ((whatsappResponsesCounts.data.data.responses[0].negetive/(yes+no))*100).toString()
          console.log(yespct)
          console.log(nopct)
          setWhatsappResponses({
            labels: [
              'Yes',
              'No',
            ],
            datasets: [
              {
                label: '% ',
                data: [yespct, nopct],
                backgroundColor: [
                  '#55C5D1',
                  '#F16222',
                ],
                hoverOffset: 4
              }]
          })
        } catch (error: any) {
          console.log("Your errorrrr =? ", error)
      if (error?.message == "jwt expired")
      {
        removeFromStorage(LocalStorageKeys.USER)
        navigate("/login")
      }
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
          Object.entries(getFromStorage(LocalStorageKeys.USER)).length != 0
            ? "left-container"
            : "login-signup-container"
        }`}
      >
        <div className='buttons-container'>
                    <SecondaryButton
                      toggle={true}
                      className={`complaint-toggle ${
                        complaintType == 1 ? "active-tab" : "inactive"
                      }`}
                      text="AEG"
                      onClick={() => toggleComplaintType(1)}
                    />
                    <SecondaryButton
                      toggle={true}
                      className={`complaint-toggle ${
                        complaintType == 2 ? "active-tab" : "inactive"
                      }`}
                      text="TicketJee"
                      onClick={() => toggleComplaintType(2)}
                    />
        </div>
                    <div className="graph-chart-container">
            <div className="graph-container">
            <Heading2 text="No. Of Complaints" className="left-aligned-heading"/>
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
              <Heading2 text="Satisfaction Rate Of Poll"/>
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
    </>
  )
}

export default Analytics
