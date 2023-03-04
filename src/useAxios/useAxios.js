import axios from "axios";
const baseURl= "http://localhost:2780"


const postAxios = (url,data) => axios.post(`${baseURl}${url}`,{body:data})


const  getAxios = (url) => axios.get(`${baseURl}${url}`)
    



export{
    postAxios,getAxios
}

