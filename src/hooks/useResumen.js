import { useQuery } from 'react-query';
import axiosClient from "../axios-client";


const fetchResumen = async (ubi,url) => {
    const { data } = await axiosClient.get(`/${url}/${ubi}`);
    return data;
  };

export const useResumen = (ubigeo,url) => {
  return useQuery([url+"-"+ubigeo], ()=>fetchResumen(ubigeo,url));
};