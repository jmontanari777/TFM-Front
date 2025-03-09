//Este componente, varifica si un usuario esta logueado o no
//Verifica tanto las cookies como el localStorage al cargar la página
//Asi permite que el usuario permanezca logueado si vuelve a cargar la pagina
//Almacena el userId y el token en localStorage durante el login
//Limpia tanto el estado como localStorage durante el logout
//Intenta restaurar la sesión utilizando el token almacenado en localStorage cuando las cookies no están disponibles


import { useEffect, useState } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      // Primero verifica si hay un token en las cookies
      const hasCookieToken = document.cookie.includes("token");
      // También verifica si hay datos en localStorage
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      
      // Si no hay token en cookies pero hay en localStorage, intenta restaurar la sesión
      if (!hasCookieToken && storedToken && storedUserId) {
        try {
          // Puedes intentar validar el token almacenado con el backend
          const response = await api.get("/auth/validate-token", {
            headers: { Authorization: `Bearer ${storedToken}` },
            withCredentials: true,
          });
          
          // Si el token es válido, restablece la sesión
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token en localStorage inválido:", error);
          // Limpia localStorage si el token no es válido
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setIsLoggedIn(false);
        } finally {
          setChecking(false);
        }
        return;
      }
      
      // Verificación normal con cookies si están disponibles
      if (hasCookieToken) {
        try {
          const response = await api.get("/auth/validate-token", {
            withCredentials: true,
          });
          
          // Guarda los datos tanto en el estado como en localStorage
          setUser(response.data);
          setIsLoggedIn(true);
          
          // Actualiza localStorage con la información recibida
          if (response.data) {
            localStorage.setItem('userId', response.data.userId || response.data._id);
            if (response.data.token) {
              localStorage.setItem('token', response.data.token);
            }
          }
        } catch (error) {
          console.error("Token inválido o expirado:", error);
          setIsLoggedIn(false);
          // Limpia localStorage si hay error
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        } finally {
          setChecking(false);
        }
      } else {
        console.warn("No hay token en las cookies, usuario no autenticado");
        setChecking(false);
      }
    };
    
    validateToken();
  }, []);

  const login = (userData) => {
    // Guarda los datos del usuario en el estado
    setUser(userData);
    setIsLoggedIn(true);
    
    // Guarda los datos en localStorage para persistencia
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    if (userData.userId || userData._id) {
      localStorage.setItem('userId', userData.userId || userData._id);
    }
    
    window.location.href = '/';
  }

  const logout = async () => {
    try {
      await api.post('/auth/sign-out', {}, { withCredentials: true });
      
      // Limpia el estado
      setUser(null);
      setIsLoggedIn(false);
      
      // Limpia localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      window.location.href = '/';
      console.log('entra en signountt');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider