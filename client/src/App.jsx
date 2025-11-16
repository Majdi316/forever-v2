//TODO Libraries
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import UserContextProvider from "./context/UserContext";
import Layout from "./layout/Layout";
//TODO Main Function
function App() {
  //TODO Return
  return (
    <>
      <ToastContainer theme="dark" />
      <BrowserRouter>
        <UserContextProvider>
          <Layout>
            <Router />
          </Layout>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
