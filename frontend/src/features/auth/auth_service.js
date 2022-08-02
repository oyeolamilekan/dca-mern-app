import axios from "axios";

const ROOT_API = "http://localhost:8000"
const API_URL = `${ROOT_API}/api/user/`

// Register user
const syncAccount = async (userData) => {
    const response = await axios.post(`${API_URL}syncAccount`, userData)
    return response.data
}

// Register user
const confirmOtp = async (userData) => {
    const response = await axios.post(`${API_URL}authenticate`, userData)
    return response.data
}

const authService = {
    syncAccount,
    confirmOtp
}

export default authService;