import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });

  useEffect(() => {
    //capturar o loggedInUser do localStorage  (lembrando que ele vem em formato de JSON)
    const loggedInUserJSON = localStorage.getItem("loggedInUser");
    //transformando o json em uma OBJETO
    //JSON.parse(transforma o que está aqui dentro em um objeto)
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

    if (parseLoggedInUser.token) {
      setLoggedInUser(parseLoggedInUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
