import { register, login } from "../services/Auth.service";
import { setUser, setToken, setAuthicated, setLoading, setError } from "../state/Auth.slice.js";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (email, password, fullName, contact, isSeller = false) => {
        try {
            dispatch(setLoading(true));
            const response = await register(email, password, fullName, contact, isSeller);
            dispatch(setUser(response?.user));
            dispatch(setToken(response?.token));
            dispatch(setAuthicated(true));
            dispatch(setLoading(false));
            console.log("user registered successfully");
            navigate("/");
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
            console.log("user registration failed");
        }
    };

    const handleLogin = async (email, password) => {
        try {
            dispatch(setLoading(true));
            const response = await login(email, password);
            console.log(response.user);
            dispatch(setUser(response?.user.fullName));
            dispatch(setToken(response?.token)); // Restore setToken
            dispatch(setAuthicated(true));
            dispatch(setLoading(false));
            console.log("user logged in successfully");
            navigate("/");
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
            console.log("user login failed");
        }
    };

    return { handleRegister, handleLogin };
};