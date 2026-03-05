import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing_page";
import RegisterOrganization from "./pages/register_organization";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Leadprovider from "./context/leadcontextprovider";
import Opportunityprovider from "./context/opportunitycontextprovider";
import Orderprovider from "./context/ordercontextprovider";

function App() {
  return (
    <Orderprovider>
    <Leadprovider>
    
     <Opportunityprovider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register_organization" element={<RegisterOrganization />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
    </Opportunityprovider>
    </Leadprovider>
    </Orderprovider>
  );
}

export default App;