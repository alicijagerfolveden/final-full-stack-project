import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
