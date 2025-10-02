import DashboardStats from './components/DashboardStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import {useEffect, useState} from 'react'
import axiosClient from '../../axios-client'
import {Link} from 'react-router-dom'
import {useStateContext} from '../../context/ContextProvider'

//const statsData = [
//    {title : "PPRRD", value : "986", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
//    {title : "EVAR", value : "493", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
//    {title : "OTROS", value : "305", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},    
//]
//const statsData = [
//    {title : "PPRRD", value : "986"},
//    {title : "EVAR", value : "493"},
//    {title : "OTROS", value : "305"},
//]

const Dashboard = () => {
    const [atdash, setAtdash] = useState([]);
    const [pprrd, setPprrd] = useState('');
    const [evar, setEvar] = useState('');
    const [otros, setOtros] = useState('');
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const statsData = [
            {title : "PPRRD", value : "986", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
            {title : "EVAR", value : "493", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
            {title : "OTROS", value : "305", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},    
        ]
        
        setLoading(true)
        axiosClient.get('/asistencias')
            .then(({ data }) => {
              setLoading(false)
              setAsistencias(data.data);
              console.log(data.data[0].pprrd);
              console.log(data.data[0].evar);
              console.log(data.data[0].otros);
              setAtdash(statsData);
            })
            .catch(() => {
              setLoading(false)
            })
    }

    
      
    return (
        <>
        {/* <p>{statsData.title}</p>
        <p>{statsData.value}</p> */}
        
            {/** ---------------------- Different stats content 1 ------------------------- */}
                <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
                    {
                        atdash.map((d, k) => {
                            return (
                                <DashboardStats key={k} {...d} colorIndex={k}/>
                            )
                        })
                        // <div>
                        //     <div>
                        //         {Object.keys(asistencias).map((key, i)=>(
                        //                 statsData.value=asistencias[key].pprrd
                        //         ))}
                        //     </div>
                        // </div>
                    }
                </div>    
        </>
    )
}

export default Dashboard