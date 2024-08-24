/* eslint-disable react-hooks/exhaustive-deps */

import {createContext, useContext, useMemo} from "react";
import {useHistory} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage";
import UserEntity from "../entities/user.entity";


const AuthContext = createContext<IValue>({
    user: undefined,
    login: null,
    logout: null,
    setUser: null
});

interface IAuthProvider {
    children: JSX.Element;
}

interface IValue {
    user: UserEntity | undefined;
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
        if (history) history.push("/beranda");
    };


    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        if (history) history.push("/login");
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
