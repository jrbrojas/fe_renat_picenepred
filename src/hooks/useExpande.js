import { useQuery } from 'react-query';
import axiosClient from "../axios-client";


const fetchResumen = async (ubigeo,instrumento,url) => {
    const { data } = await axiosClient.get(`/${url}/${ubigeo}/${instrumento}`);
    return data;
  };

export const useExpande = (ubigeo,instrumento,url) => {
  return useQuery([url+"-"+ubigeo+"-"+instrumento], ()=>fetchResumen(ubigeo,instrumento,url));
};


export const useNumeros = (numero)=>{

  return  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(numero);
  
}

