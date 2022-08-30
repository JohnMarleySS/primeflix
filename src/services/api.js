import axios from "axios"


/// Base da URL: https://api.themoviedb.org/3/
/// Base da API: movie/550?api_key=ada93334886eaf4031b03215c527df5a



const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api