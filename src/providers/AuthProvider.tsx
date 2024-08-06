/* eslint-disable react-hooks/exhaustive-deps */

import {createContext, Dispatch, useContext, useMemo} from "react";
import {useHistory} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage";
import UserEntity from "../entities/user.entity";


const AuthContext = createContext<IValue>({
    user: null,
    login: null,
    logout: null,
    setUser: null
});

interface IAuthProvider {
    children: JSX.Element;
}

interface IValue {
    user: UserEntity | null;
    login: any;
    logout: any;
    setUser: any;
}

export const AuthProvider = ({children}: IAuthProvider) => {
    const [user, setUser] = useLocalStorage("user", null);
    const history = useHistory();

    // call this function when you want to authenticate the user
    const login = async (data: UserEntity) => {
        setUser(data);
        if (history) history.replace("/beranda");
    };


    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        if (history) history.replace("/login");
    };

    const value: IValue = useMemo(
        () => ({
            user,
            login,
            logout,
            setUser
        }),
        [login, logout, user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
