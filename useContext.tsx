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

  const login = (newUser: user) => {
    setUser(newUser);
    router.push("/tabs");
    secureStore.setItemAsync("token", newUser.userToken);
  };

  const logout = () => {
    setUser(null);
    router.push("/Auth");
    secureStore.deleteItemAsync("token");
  };

  const authUser = async () => {
    const token = await secureStore.getItemAsync("token");
    console.log(token)
    if (token) {
     return router.push("/tabs");
    }
    return router.push("/Auth");
  };
  useEffect(() => {
    authUser();
  }, []);
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
