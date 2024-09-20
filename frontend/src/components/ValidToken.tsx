import { useNavigate } from "react-router-dom";

export const ValidToken = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    if (!token) {
        navigate("/signin");
    }
    else{
        return true;
    }
}