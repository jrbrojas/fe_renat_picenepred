import DashboardStats from './components/DashboardStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import {useEffect, useState} from 'react'
import axiosClient from '../../axios-client'
import {Link} from 'react-router-dom'
import {useStateContext} from '../../context/ContextProvider'

const statsData = [
    {title : "PPRRD", value : "986", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "EVAR", value : "493", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "OTROS", value : "305", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},    
]

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    
    useEffect(() => {
        getData();
        console.log("getData() ",getData());
    }, []);

    const getData = () => {
        setLoading(true)
        axiosClient.get('/asistencias')
            .then(({ data }) => {
              setLoading(false)
              setUsers(data.data)              
            })
            .catch(() => {
              setLoading(false)
            })
    }

    return (
        <>
            {/** ---------------------- Different stats content 1 ------------------------- */}
                <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
                    {
                        statsData.map((d, k) => {
                            return (
                                <DashboardStats key={k} {...d} colorIndex={k}/>
                            )
                        })
                    }
                </div>    
        </>
    )
}

export default Dashboard