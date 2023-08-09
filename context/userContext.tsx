"use client";

import { createContext, useState } from "react";

type Context = {
  userContext: State;
  setUserContext: ({}: State) => void;
};

type State = {
  userName: string;
  role: string;
  isLogin: boolean;
};

const UserContext = createContext<Context | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userContext, setUserContext] = useState<State>({
    userName: "anonymous",
    role: "anonymous",
    isLogin: false,
  });

  const context: Context = {
    userContext: userContext,
    setUserContext: setUserContext,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
