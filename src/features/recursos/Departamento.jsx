import { useEffect, useState, Fragment } from "react";
import axiosClient from "../../axios-client";

const Departamento = () => {
    const [departamento, setDepartamento] = useState([]);
    const [value, setValue] = useState();

    const handleDepartamentoChange = (event) => {
        setValue(event.target.value);
        //console.log('departamento value: ', event.target.value); // Do something with the selected value
    };
    
    useEffect(() => {
        const getDepartamento = async () => {
            try {
                //const dptos = await axiosClient.get('/departamento');
                //setDepartamento(dptos.data)
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
        
  return (
    <>
        {/** ---------------------- DEPARTAMENTO ------------------------- */}
        <select className="w-full max-w-xs select select-ghost" value={value} onChange={handleDepartamentoChange}>
            <option value="0">Todos los departamentos</option>
            {departamento.map((data) => (
                <option key={data.id} value={data.ubigeo}>
                    {data.name}
                </option>
            ))}
        </select>
    </>
  );
};

export default Departamento;
