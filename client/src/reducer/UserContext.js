const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({
    theme: '',
    isUser: '',
    changeThemeApp: () => {},
    loginHandler: (loginData) => {},
    logoutHandler: () => {}
})

export const UserContextProvider = (props) => {
    const [user, setUser] = useState({});

    const fetchCurrTheme = localStorage.getItem('themeColor');
    const [themeColor, setThemeColor] = useState(fetchCurrTheme === 'dark' ? 'dark' : 'default');

    const getUser = async () => {
        const res = await fetch('/auth/about');
        const data = await res.json();
        // console.log(data);
        setUser(data)
    }
    useEffect(() => { getUser() }, []);

    const changeThemeAppHandler = () => {
        const themeSetup = themeColor === 'dark' ? 'default' : 'dark';
        setThemeColor(themeSetup);
        localStorage.setItem("themeColor", themeSetup);
    }

    const handleLogin = (loginData) => {
        setUser(loginData);
        getUser()
        // console.log('loginData: ',loginData, 'userData: ',user);
    }

    const handleLogout = () => {
        setUser({})
        getUser()
    }

    const contextValue = {
        theme: themeColor,
        isUser: user,
        changeThemeApp: changeThemeAppHandler,
        loginHandler: handleLogin,
        logoutHandler: handleLogout
    }

    return <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
}