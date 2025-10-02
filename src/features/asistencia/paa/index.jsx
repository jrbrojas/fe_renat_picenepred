import DashboardStats from './components/DashboardStats'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import {useEffect, useState} from 'react'
import Mapa from '../../mapa/Mapa'
import NestedTable from '../pprrd/components/NestedTable'

import MyBarChartpprrs from './components/MyBarChartpprrd'
import DashboardTableResumenpprrd from './components/DashboardTableResumenpprrd'
//*import NestedTableNiveles from '../pprrd/components/NestedTableNiveles'
import { useExpande,useNumeros } from '../../../hooks/useExpande';

const statsData = [
    {title : "PAA Aprobados", value : "0", icon : <CreditCardIcon className='w-8 h-8'/>, description : "↗︎ aprobados"},
    {title : "PAA vigentes", value : "0", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ entidades"},
    {title : "Entidades Asistidas", value : "0", icon : <CircleStackIcon className='w-8 h-8'/>, description : "↗︎ asistencias"}, 
    // {title : "PPRRD", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
]

const Pprrd = () => {
    const [asistencias, setAsistencias] = useState(statsData);
    const [nombreDep,setNombreDep]   = useState('');
    const [loading, setLoading] = useState(false);
    

    const [departamento, setDepartamento] = useState([]);
    const [ubigodepartamento, setUbigeodepartamento] = useState('0');    
    
    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value);
        //console.log('Dentro del componente PPRRD : ', event.target.value); // Do something with the selected value
    };
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue);
        //console.log('Dentro del componente PPRRD handleUbigeoReset : ', newValue); // Do something with the selected value
    };

 
   
    const { data:dr,isLoading: isLoadingConteo } = useExpande(ubigodepartamento,7,'resumen-at');
    
        useEffect(() => {
            if (!isLoadingConteo && dr) {
              const {dpto, pprrd_a, pprrd_v,entidades_asistidas } = dr[0];
    
          
              setNombreDep(dpto)
    
              setAsistencias([
                {
                  title: "PAA Aprobados", value: useNumeros(pprrd_a),
                  icon: <CreditCardIcon className="w-8 h-8" />,
                  description: "↗︎ Aprobados",
                },
                {
                  title: "PAA Vigentes", value:useNumeros(pprrd_v),
                  icon: <UserGroupIcon className="w-8 h-8" />,
                  description: "↗︎ Vigentes",
                },
                {title : "Entidades Asistidas", value : useNumeros(entidades_asistidas),
                 icon : <CircleStackIcon className='w-8 h-8'/>,
                  description : "↗︎ Entidades"}, 
               
              ]);
            }
          }, [dr, isLoadingConteo]);
        
  return (
    <>
    <div className="grid m-4 font-sans">
        <div className="m-4">
        {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
            <p className="text-3xl font-bold mb-8 dark:text-whit">
            PROGRAMA ANUAL DE ACTIVIDADES (PAA) {(nombreDep) ? '- REGIÓN ' +nombreDep:' - NIVEL NACIONAL'}</p>
                
            <div className="flex flex-col lg:flex-row">     
            
                <div className="grid w-full gap-3 pt-2 lg:grid-cols-3">
                    {
                        asistencias.map((d, k) => {
                            return (
                                <DashboardStats key={k} {...d} colorIndex={k}/>
                            )
                        })
                    }
                </div>
            </div>

            <div className="grid w-full gap-3 pt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-[65%_35%] mt-8"> 
            <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[45%_55%] 2xl:grid-cols-2">                  
                    <div className="border-2 shadow-md stats bg-base-200/50">
                        <div className="p-6 bg-base-200/50 rounded-xl">
                        <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                        <Mapa ubigeo={ubigodepartamento} resetUbigeo={handleUbigeoReset}/>
                
                        </div>
                    </div>
                    <div className="border-2 shadow-md stats bg-base-200/100">       
                                <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold text-center">PAA APROBADOS Y VIGENTES</h1>
                                <MyBarChartpprrs ubigeo={ubigodepartamento} instrumento={7} titulo={'PAA'}/>
                                <hr className='mt-8 mb-8'/>
                                <h1 className="mb-4 text-lg font-bold text-center">PAA POR PERIODOS</h1>
                                <DashboardTableResumenpprrd ubigeo={ubigodepartamento} instrumento={7} titulo='PAA'/>
                                </div>
                            
                    </div>
            </div>        
                
               
                <div className="w-full border-2 shadow-md stats bg-base-200/100">
                    <div className="py-6 bg-base-200/50 rounded-xl">
                    <h1 className="mb-4 text-lg font-bold text-center">PAA POR DEPARTAMENTO/PROVINCIAS/DISTRITOS</h1>
                    <NestedTable ubigeo={ubigodepartamento} instrumento='PAA'/>
                    </div>
                </div>
                
             </div>

            <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                {/*<select className="w-full select select-ghost" value={ubigodepartamento} onChange={handleDepartamentoChange}>
                    <option value="0">TODOS LOS DEPARTAMENTOS</option>
                    {departamento.map((data) => (
                        <option key={data.id} value={data.ubigeo}>
                            {"DEPARTAMENTO DE "+data.name}
                        </option>
                    ))}
                </select>
                <div className="border-2 p-6 shadow-md rounded-xl">
                <h1 className="mb-4 text-lg font-bold text-center">PAA POR NIVELES DE GOBIERNO</h1>
                    <NestedTableNiveles ubigeo={ubigodepartamento} instrumento='PAA' departamento={nombreDep}/>
                         
                 </div>*/}
            </div>
    

           
        </div>
    </div>
    </>
  )
}

export default Pprrd