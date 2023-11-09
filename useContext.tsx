import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "expo-router";
import * as secureStore from "expo-secure-store";
export type user = {
  usename: string;
  password: string;
  userToken: string;
  user:string
};

type AuthContextType = {
  user: user | null;
  login: (user: user) => void;
  logout: () => void;
};

export const userContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<user | null>(null);
  const router = useRouter();

  const [token, setToken]= useState<string|any>("")

  const getToken=async()=>{
    const token = await secureStore.getItemAsync("token");
    setToken(token||null)
  }
  const login = (newUser: user) => {
    setUser(newUser);
    secureStore.setItemAsync("token", newUser.userToken);
    secureStore.setItemAsync("user", newUser.user);

    if(newUser.user==="doc"){
        return router.push("/tabs/doc");

    }
    if(newUser.user==="patient"){
        return router.push("/tabs/patient");

    }
    router.push("/tabs");
    secureStore.setItemAsync("token", newUser.userToken);
  };

  const logout = () => {
    setUser(null);
    router.push("/Auth");
    secureStore.deleteItemAsync("token");
    secureStore.deleteItemAsync("user");
  };

  const authUser = async () => {
    const type = await secureStore.getItemAsync("user");
   
    if ( type==="doc") {
       
     return router.push("/tabs/doc");
    }
    if( type==="patient"){
        return router.push("/tabs/patient");

    }
    return router.push("/Auth");
  };
  useEffect(() => {
    getToken()
    authUser();
  }, [user]);
  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
