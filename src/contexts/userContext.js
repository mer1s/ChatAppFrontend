import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = props => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    // if (JSON.parse(localStorage.getItem('user'))) {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    // }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem('user');
        setUser(null)
        navigate('/login')
    }

    return (
        <UserContext.Provider value={{ user, setUser, logOut }}>
            {props.children}
        </UserContext.Provider>
    )
}