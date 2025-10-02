import React from "react";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client"
import { useQuery } from "react-query";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const getResumen = async (ub) => {
  const {data} = await axiosClient.get(`/periodos_planificacion/${ub}`);
  return data;
} 

const NestedPeriodoPlanificacion = ({ubigeo = 0}) => {
  const {data, error, isLoading} = useQuery(["nestedPeriodoPlanificacion"+ubigeo], () => getResumen(ubigeo));

  const total_prdc = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.prdc) || 0), 0) : 0;
  const total_pot = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.pot) || 0), 0) : 0;
  const total_pat = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.pat) || 0), 0) : 0;
  const total_pdu = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.pdu) || 0), 0) : 0;
  const total_poi = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.poi) || 0), 0) : 0;
  const total_pei = (!isLoading && data) ? data.reduce((sum, d) => sum + (parseInt(d.pei) || 0), 0) : 0;
  const total_general = total_prdc + total_pot + total_pat + total_pdu + total_poi + total_pei;

  return (
    <>
      <div>
        <div className="btn-excel-cenepred" style={{display:'flex',width:'75px'}}>
          <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="1" fillRule="evenodd" clipRule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#FFFFFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z" fill="#FFFFFF"/>
          </svg>
          <ReactHTMLTableToExcel
            id="botonExportar"
            className="texto-boton"
            table="planificacion_periodos"
            filename="planificacion_periodos"
            sheet="Resumen"
            buttonText="Excel"
          />  
        </div>
      
        <table id="planificacion_periodos" className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="cabecera-cenepred">
              <th rowSpan={2} className="p-2 border border-gray-300">PERIODOS</th>
              <th colSpan={6} className="p-2 border border-gray-300">ASISTENCIAS TÉCNICAS</th>
              <th rowSpan={2} className="p-2 border border-gray-300">TOTAL</th>
            </tr>
            <tr className="text-center">
              <th className="text-xs border border-gray-300 cabecera-cenepred">PRDC</th>
              <th className="text-xs border border-gray-300 cabecera-cenepred">POT</th>
              <th className="text-xs border border-gray-300 cabecera-cenepred">PAT</th>
              <th className="text-xs border border-gray-300 cabecera-cenepred">PDU</th>
              <th className="text-xs border border-gray-300 cabecera-cenepred">POI</th>
              <th className="text-xs border border-gray-300 cabecera-cenepred">PEI</th>              
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <ClipLoader color="#8884d8" size={45} />
                  <p>Cargando datos...</p>
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr key={`${item.periodo}-${index}`} className="text-center hover:bg-gray-200">
                  <td className="p-2 border border-gray-300">{item.periodo}</td>
                  <td className="p-2 border border-gray-300">{item.prdc}</td>
                  <td className="p-2 border border-gray-300">{item.pot}</td>
                  <td className="p-2 border border-gray-300">{item.pat}</td>
                  <td className="p-2 border border-gray-300">{item.pdu}</td>
                  <td className="p-2 border border-gray-300">{item.poi}</td>
                  <td className="p-2 border border-gray-300">{item.pei}</td>                  
                  <td className="p-2 border border-gray-300">{item.total}</td>
                </tr>
              ))
            )}
          </tbody>
          
          {!isLoading && data && (
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td className="p-2 text-center border border-gray-300">TOTALES</td>
                <td className="p-2 text-center border border-gray-300">{total_prdc}</td>
                <td className="p-2 text-center border border-gray-300">{total_pot}</td>
                <td className="p-2 text-center border border-gray-300">{total_pat}</td>
                <td className="p-2 text-center border border-gray-300">{total_pdu}</td>
                <td className="p-2 text-center border border-gray-300">{total_poi}</td>
                <td className="p-2 text-center border border-gray-300">{total_pei}</td>                
                <td className="p-2 text-center border border-gray-300">{total_general}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default NestedPeriodoPlanificacion;