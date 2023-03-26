import { useState } from "react";
import { MainRouter } from "./components";
import { AuthContext } from "./components/AuthContext/AuthContext";

function App() {
  const [auth, setAuth] = useState("" as string | null | undefined);
  const token = sessionStorage.getItem("token");

  if (token && !auth) {
    setAuth(token);
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
