import "./App.css";
import HomePage from "./HomePage";
import { UserContextProvider } from "./Context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = "56533855402-gn491nm9fgdn5917hgalf0jes2lklbe6.apps.googleusercontent.com";

function App() {
  return (
    <div className="App">
    <GoogleOAuthProvider clientId={clientId}>
    <UserContextProvider>
        <HomePage />
      </UserContextProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
