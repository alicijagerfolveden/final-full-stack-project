import { useState } from "react";
import { MainRouter } from "./components";
import { AuthContext } from "./components/AuthContext";

function App() {
  const [auth, setAuth] = useState("" as string | null | undefined);
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !auth) {
    setAuth(accessToken);
  }

  return (
    <main>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <MainRouter />
      </AuthContext.Provider>
    </main>
  );
}

export default App;
