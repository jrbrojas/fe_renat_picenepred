import DashboardStats from './components/DashboardStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import {useEffect, useState} from 'react'
import axiosClient from '../../../axios-client'
import {Link} from 'react-router-dom'
import {useStateContext} from '../../../context/ContextProvider'

const statsData = [
    {title : "EVAR", value : "0", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "EVAR", value : "0", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ Aprobados"},
    {title : "EVAR", value : "0", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ Vigentes"},
    {title : "EVAR", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
]

const Index = () => {
    const [instrumentos, setInstrumentos] = useState(statsData);
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    
    useEffect(() => {
        getData();
    }, []);    
    
    const getData = () => {
        setLoading(true)
        axiosClient.get('/resumen-at-instrumento/2/2024')
            .then(({ data }) => {
                setLoading(false);
                //setAsistencias(data.data);
                const nextAsistencias = [
                    {title : "EVAR en proceso", value : data.data.sum_en_proceso, icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "EVAR aprobadas", value : data.data.sum_culminada, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "EVAR vigentes", value : data.data.sum_vigente, icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "EVAR caducados", value : data.data.sum_caducada, icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Entidades asistidas"},
                ];              
                setInstrumentos(nextAsistencias); 
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
    <>
        Evaluación de Riesgos Originados por Fenómenos Naturales (EVAR)
        {/** ---------------------- Different stats content 1 ------------------------- */}
        <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
            {
                instrumentos.map((d, k) => {
                    return (
                        <DashboardStats key={k} {...d} colorIndex={k}/>
                    )
                })
            }
        </div>    
    </>
    );
}

export default Index;
