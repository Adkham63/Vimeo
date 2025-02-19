import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Создаем и экспортируем контекст
export const UserContext = createContext();

// Провайдер контекста
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/api/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

// Кастомный хук
export function useUser() {
  return useContext(UserContext);
}
