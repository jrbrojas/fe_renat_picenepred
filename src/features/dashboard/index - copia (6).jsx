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
    const [pprrd, setPprrd] = useState('');
    const [evar, setEvar] = useState('');
    const [otros, setOtros] = useState('');
    const [atdash, setAtdash] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    

    //useEffect(() => {
    //    getData();
    //}, []);    
    
    const getData = () => {
        setLoading(true)
        axiosClient.get('/asistencias')
            .then(({ data }) => {
              setLoading(false);
              //setAsistencias(data.data);
              setPprrd(data.data[0].pprrd);
              setEvar(data.data[0].evar);
              setOtros(data.data[0].otros);
              console.log(data.data[0].pprrd);
              console.log(data.data[0].evar);
              console.log(data.data[0].otros);
              const nextAsistencias = [
                {title : "PPRRD", value : data.data[0].pprrd.toString(), icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
                {title : "EVAR", value : data.data[0].evar.toString(), icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
                {title : "OTROS", value : data.data[0].otros.toString(), icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},            
            ];              
              setAtdash(nextAsistencias); 
            })
            .catch(() => {
              setLoading(false)
            })
    }

    //const nextAsistencias = [
    //    {title : "PPRRD", value : pprrd.toString(), icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    //    {title : "EVAR", value : evar.toString(), icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    //    {title : "OTROS", value : otros.toString(), icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},            
    //];
        
    function handleClick() {

        setAtdash(nextAsistencias); 
        //setPprrd('');
        //setEvar('');
        //setOtros('');
    }    

    useEffect(() => {
        getData();
        //handleClick();
    }, []);    

    return (
        <>
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