import DashboardStats from "./components/DashboardStats";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";
import Mapa from "../../mapa/Mapa";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import NestedTable from "./components/NestedTable";
import LineChartComponent from "./components/LineChartComponent";
import { useResumen } from "../../../hooks/useResumen";
import {useNumeros} from "../../../hooks/useExpande";
import DashboardTableResumenav from "./components/DashboardTableResumenav";

const statsData = [
  {
    title: "En proceso",
    value: "0",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "↗︎ asistencias",
  },
  {
    title: "Aprobados",
    value: "0",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ asistencias",
  },
  {
    title: "Vigentes",
    value: "0",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "↗︎ asistencias",
  },
  // {title : "PPRRD", value : "0", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ Caducados"},
];

const Index = () => {
  const [asistencias, setAsistencias] = useState(statsData);
  const [asistenciasdetalles, setAsistenciasdetalles] = useState([]);
  const [depSeleccionado,setDepseleccionado] = useState('');

  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [resumen, setResumen] = useState("0");

  const [departamento, setDepartamento] = useState([]);
  const [ubigodepartamento, setUbigeodepartamento] = useState("0");
  const [tituloDep, setTitulodep] = useState("RESUMEN GENERAL");

  const handleDepartamentoChange = (event) => {
    setUbigeodepartamento(event.target.value);
    //console.log('Dentro del componente PPRRD : ', event.target.value); // Do something with the selected value
  };
  const handleUbigeoReset = (newValue) => {
    setUbigeodepartamento(newValue);
    //console.log('Dentro del componente PPRRD handleUbigeoReset : ', newValue); // Do something with the selected value
  };


  
  useEffect(() => {
    const getResumen = async () => {
      setLoading(true);
      try {
        //const dptos = await axiosClient.get('/departamento');
        //setDepartamento(dptos.data)
        await axiosClient.get("/resumen").then((response) => {
          //setDepartamento(JSON.stringify(response, null, 2))
          setResumen(response.data.data);
          setLoading(false);
        });
        //console.log('Departamento:', departamento);
      } catch (error) {
        setError(error.message); // More specific error message
      } finally {
        //setIsLoading(false);
      }
    };

    const getDepartamento = async () => {
      try {
        await axiosClient.get("/departamento").then((response) => {
          //setDepartamento(JSON.stringify(response, null, 2))
          setDepartamento(response.data);
        });
        //console.log('Departamento:', departamento);
      } catch (error) {
        setError(error.message); // More specific error message
      } finally {
        //setIsLoading(false);
      }
    };
   // getDepartamento();
   // getResumen();
  }, []);


    const { data:dr,isLoading: isLoadingConteo } = useResumen(ubigodepartamento, 'fortalecimiento_conteo');

    useEffect(() => {
        if (!isLoadingConteo && dr) {
          const {basica, especializada,total, departamento } = dr.data[0];
          setDepartamento(departamento);
          setTitulodep('RESUMEN POR PERIODO '+ departamento); 
          setAsistencias([
            {
              title: "Formación Básica",
              value: useNumeros(basica),
              icon: <CreditCardIcon className="w-8 h-8" />,
              description: "↗︎ Cursos",
            },
            {
              title: "Formación Especializada",
              value: useNumeros(especializada),
              icon: <UserGroupIcon className="w-8 h-8" />,
              description: "↗︎ Cursos",
            },
            {
              title: "Total" ,
              value: useNumeros(total),
              icon: <UserGroupIcon className="w-8 h-8" />,
              description: "↗︎ Cursos",
            }
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
          <p className="text-3xl font-bold dark:text-whit mb-8">
            FORTALECIMIENTO (CURSOS BASICOS Y ESPECIALIZADOS) {(departamento!='TODOS') ? '- REGIÓN ' +departamento:' - NIVEL NACIONAL'}
           </p>    
            <div className="flex flex-col lg:flex-row">
            <div className="grid w-full gap-3 pt-2 lg:grid-cols-3">
              {asistencias.map((d, k) => {
                return <DashboardStats key={k} {...d} colorIndex={k} />;
              })}
            </div>
          </div>
          
          <div className="grid w-full gap-3 pt-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-[60%_40%] mt-8">
          
          <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                <div className="border-2 shadow-md stats bg-base-200/50">
                  <div className="p-6 bg-base-200/50 rounded-xl">
                  <h1 className="mb-4 text-lg font-bold text-center">SELECCIONE EL DEPARTAMENTO</h1>
                    <Mapa
                      ubigeo={ubigodepartamento}
                      resetUbigeo={handleUbigeoReset}
                    />
                                          
                    
                  </div>
                </div>
                <div className="border-2 shadow-md stats bg-base-200/100">
                  <div className="p-6 bg-base-200/50 rounded-xl">
                    <h1 className="mb-4 text-lg font-bold text-center">
                      {/*GRÁFICO {tituloDep.replace("RESUMEN", "")}*/}
                      CURSOS BÁSICOS Y ESPECIALIZADOS
                    </h1>
                    <LineChartComponent ubigeo={ubigodepartamento} />
                    <hr className="mt-8 mb-8" />
                    <DashboardTableResumenav ubigeo={ubigodepartamento}/>
                  </div>
                </div>
        </div>
            
            <div className="grid w-full gap-3">
              <div className="w-full border-2 shadow-md stats bg-base-200/50">
                <div className="p-6 bg-base-200/50 rounded-xl">
                  <h1 className="mb-4 text-lg font-bold text-center">
                   
                    CURSOS POR DEPARTAMENTO/PROVINCIAS/DISTRITOS
                  </h1>
                    <NestedTable ubigeo={ubigodepartamento}/>
                  {/*<DashboardTableResumen asistenciasdetalles={resumen} loading={loading}/>*/}
                </div>
              </div>
       
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Index;
