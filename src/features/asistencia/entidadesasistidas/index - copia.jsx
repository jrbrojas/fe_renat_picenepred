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
    {title : "PPRRD", value : "0", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ En proceso"},
    {title : "PPRRD", value : "0", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ Aprobados"},
    {title : "PPRRD", value : "0", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ Vigentes"},
    {title : "PPRRD", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
]

const Pprrd = () => {
    const [instrumentos, setInstrumentos] = useState(statsData);
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState();    
    
    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        console.log('departamento value: ', event.target.value); // Do something with the selected value
    };  
    useEffect(() => {
        const getDepartamento = async () => {
            try {
                await axiosClient
                    .get('/departamento')
                    .then((response) => {
                        //setDepartamento(JSON.stringify(response, null, 2))
                        setDepartamento(response.data)
                })
                console.log('Departamento:', departamento);
            } catch (error) {
                setError(error.message); // More specific error message
            } finally {
                //setIsLoading(false);
            }
        }        
        getDepartamento();
    }, []);
         
    
    const getData = () => {
        setLoading(true)
        axiosClient.get('/resumen-at-instrumento/1/2024')
            .then(({ data }) => {
                setLoading(false);
                //setAsistencias(data.data);
                const nextAsistencias = [
                    {title : "PPRRD en proceso", value : data.data.sum_en_proceso, icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "PPRRD aprobadas", value : data.data.sum_culminada, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "PPRRD vigentes", value : data.data.sum_vigente, icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ Entidades asistidas"},
                    {title : "PPRRD caducados", value : data.data.sum_caducada, icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Entidades asistidas"},
                ];              
                setInstrumentos(nextAsistencias); 
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getData();
    }, []);       
        
  return (
    <>

        <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-4 md:grid-cols-2">
            <select className="w-full max-w-xs select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                <option value="0">Todos los departamentos</option>
                {departamento.map((data) => (
                    <option key={data.id} value={data.ubigeo}>
                        {data.name}
                    </option>
                ))}
            </select>            
        </div>    
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
  )
}

export default Pprrd