import { MainRouter } from "./components";
import { AuthProvider } from "./components/AuthContext/AuthContext";

function App() {
  return (
    <main>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </main>
  );
}

export default App;
