import axios from "axios";
const baseURl= "http://localhost:2780"


const postAxios = (url,data) => axios.post(`${baseURl}${url}`,{body:data})
const getAxios = (url) => axios.get(`${baseURl}${url}`)
const putAxios = (url,data) => axios.put(`${baseURl}${url}`,{body:data})

    



export{
    postAxios,getAxios,putAxios
}

