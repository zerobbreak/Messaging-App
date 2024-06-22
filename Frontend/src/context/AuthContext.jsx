import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiInstance";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if(token){
          const response = await api.get("/user");
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Logging in with:", { email, password });
      const response = await api.post("/auth/login", { email, password });
      console.log("Login response:", response.data);
      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.token);
        setUser(response.data);
        setIsAuthenticated(true);
        navigate("/"); // Redirect to home page or dashboard
      }
    } catch (error) {
      console.error("Error logging in", error);
      // Handle error appropriately
    }
  }

  const register = async (username, email, password) => {
    const response = await api.post("/auth/register", {username, email, password});
    localStorage.setItem('jwtToken', response.data.token);
    setUser(null);
    navigate("sign-in");
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    navigate('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}