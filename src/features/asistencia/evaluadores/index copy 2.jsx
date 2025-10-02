import DashboardStats from './components/DashboardStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import {useEffect, useState} from 'react'
import axiosClient from '../../../axios-client'
import {Link} from 'react-router-dom'
import {useStateContext} from '../../../context/ContextProvider'
import DashboardLine from './components/DashboardLine'
import DashboardTable from '../../recursos/components/DashboardTable'

const statsData = [    
    {title : "En proceso", value : "0", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},
    {title : "Aprobados", value : "0", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},
    {title : "Vigentes", value : "0", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},    
    // {title : "EVAR", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
]

const Index = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [asistenciasdetalles, setAsistenciasdetalles] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    
    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0'); 
        
    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('departamento value: ', event.target.value); // Do something with the selected value      
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
                //console.log('Departamento:', departamento);
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
        //atdepartamento/{instumento_id}/{ubigeo}
        //axiosClient.get('/atdepartamento/2/0')
        axiosClient.get(`/atdepartamento/2/${ubigodepartamento}`)
            .then(({ data }) => {
                setLoading(false);
                //setAsistencias(data.datatotales);
                //console.log("data.datatotales", data.datatotales);
                //console.log("data.data", data.data);
                const nextAsistencias = [
                    {title : "En proceso", value : data.datatotales.sum_en_proceso, icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},
                    {title : "Aprobados", value : data.datatotales.sum_aprobado, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},
                    {title : "Vigentes", value : data.datatotales.sum_vigente, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ asistencias"},
                    // {title : "PPRRD canceladas", value : data.datatotales.sum_cancelada, icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Entidades asistidas"},
                ];              
                setAsistencias(nextAsistencias);                 
                setAsistenciasdetalles(data.data);
            })
            .catch(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        getData();
    }, [ubigodepartamento]);
    
    return (
    <>        
    <div className="grid m-4 font-sans">
        <div className="m-4">
        {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
            Evaluación de Riesgos Originados por Fenómenos Naturales (EVAR)
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
            <div className="flex flex-col lg:flex-row">
                <div className="mr-0 basis-3/5 md:mr-8">       
                    {/** ---------------------- Different stats content 1 ------------------------- */}
                    <div className="grid gap-3 pt-8 lg:grid-cols-3">
                        {
                            asistencias.map((d, k) => {
                                return (
                                    <DashboardStats key={k} {...d} colorIndex={k}/>
                                )
                            })
                        }
                    </div>
                

                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <DashboardLine asistenciasdetalles={asistenciasdetalles} ></DashboardLine>
                        </div>
                    </div>
                    <div className="pt-8">
                        <div className="flex flex-row p-8 border-2 bg-base-200/50 rounded-xl">
                            <div className="container mx-auto mt-4">
                            <h1 className="mb-4 text-lg font-bold">Instrumentos aprobados</h1>
                                <DashboardTable asistenciasdetalles={asistenciasdetalles}></DashboardTable>
                            </div>                            
                        </div>
                    </div>
                </div>
           
                <div className="pt-8 mr-4 basis-2/5">
                    <div>MAPA</div>
                </div>
            </div>
        </div>
    </div>           
    </>
    );
}

export default Index;
