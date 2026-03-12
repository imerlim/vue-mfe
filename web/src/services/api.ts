import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-quebrada-merlim.com', // Onde o seu Laravel/Nest estaria
    timeout: 5000
})

// O INTERCEPTOR: A "Alfândega" do seu App
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Sessão expirada! Redirecionando...')
            // Aqui você mandaria o usuário pro Login
        }
        return Promise.reject(error)
    }
)

export default api
