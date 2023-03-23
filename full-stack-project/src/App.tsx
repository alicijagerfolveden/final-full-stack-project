import { useState } from "react";
import { MainRouter } from "./components";
import { AuthContext } from "./components/AuthContext/AuthContext";

function App() {
  const [auth, setAuth] = useState("" as string | null | undefined);

  return (
    <main>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <MainRouter />
      </AuthContext.Provider>
    </main>
  );
}

export default App;
