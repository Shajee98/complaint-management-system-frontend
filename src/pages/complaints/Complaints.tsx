import DropDown from '../../components/drop-down/DropDown'
import { AiOutlineSearch } from 'react-icons/ai'
import './Complaints.scss'
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
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import PrimaryButton from '../../components/primary-button/PrimaryButton';
import SecondaryButton from '../../components/secondary-button/SecondaryButton';
import Heading1 from '../../components/typography/heading-1/Heading1';

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

const Complaints = () => {
    const [showModal, setShowModal] = useState(false)
    const fetchComplaints = (option: string) => {
        console.log(option)
    }
    let graph: any[] = []
    let graphData = [{ month: 'Jan', count: 0 }, { month: 'Feb', count: 0 }, { month: 'Mar', count: 0 }, { month: 'Apr', count: 0 }, { month: 'May', count: 0 }, { month: 'Jun', count: 0 }, { month: 'Jul', count: 0 }, { month: 'Aug', count: 0 }, { month: 'Sep', count: 0 }, { month: 'Oct', count: 0 }, { month: 'Nov', count: 0 }, { month: 'Dec', count: 0 }];
    graph = [...graphData]
  return (
      <div className='complaints-container'>
        {showModal && <Modal onClose={() => setShowModal(false)}/>}
      <div className='upper-half'>
        <Heading1 text='Complaints Management' />
        <div className='filterandsearch'>
            <div className='search-container'>
            <input type="text" className='searchbar' placeholder='Search by ID, customer name or phone number'/>
            <AiOutlineSearch className="search-icon"/>
            </div>
            <DropDown options={["Visa", "Travel", "Transportation"]} apiFunction={fetchComplaints}/>
        </div>
        <SecondaryButton className='secondary-left-aligned' text='Add Complaint' onClick={() => setShowModal(true)}/>
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
      <Line
        data={{
            labels: graph.map((monthData) => {
                return monthData.month
            }),
            datasets: [{
                label: 'Complaints',
                
                data: [20, 40, 60, 100, 90, 40, 10],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.2,
                pointStyle: 'circle',
                pointBackgroundColor: "white",
                pointBorderColor: "red",
                pointBorderWidth: 5,
                pointHoverBorderWidth: 5,
                pointRadius: 7,
                pointHitRadius: 5,
                pointHoverRadius: 10,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
            }]
        }}
        options={{
            borderColor: 'rgb(75, 192, 192)',
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color : 'white',
                      }
                }
            },
            scales: {
                'y': {
                    'ticks': {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return value;
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                'x': {
                    grid: {
                        display: false
                    }
                }
            }
        }}
    />
    </div>
  )
}

export default Complaints
