import { register } from "../services/Auth.service";
import { setUser, setToken, setLoading, setError } from "../state/Auth.slice.js";
import { useDispatch } from "react-redux"
const dispatch = useDispatch();
export const useAuth = () => {
    const handleRegister = async (email, password, fullName, contact, isSeller = false) => {
        try {
            dispatch(setLoading(true))
            const response = await register(email, password, fullName, contact, isSeller)
            dispatch(setUser(response.user))
            console.log(response.user)
            dispatch(setLoading(false))
            console.log("user registered successfully")
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
            console.log("user registration failed")
        }
    }
    return { handleRegister }
}