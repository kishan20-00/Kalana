import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/addUser";
import ViewUsers from "./pages/updateUser";
import CreateStore from "./pages/addStore";
import ViewStores from "./pages/AllStores";
import CreateItem from "./pages/addItems";
import ViewItems from "./pages/AllItems";
import CreateOffer from "./pages/addOffers";
import ViewOffers from "./pages/AllOffers";
import Login from "./pages/login";
import Home from "./pages/home";
import ParkingLot from "./pages/Parking";
import Profile from "./pages/profile";
import AdminPanel from "./pages/adminpanel";
import UserViewItems from "./pages/userviewItem";
import UserViewOffers from "./pages/userviewOffer";
import UserViewStores from "./pages/userviewstore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<Login />} />  
      <Route path="/sign" element={<Register />} />
      <Route path="/viewuser" element={<ViewUsers />} />
      <Route path="/addstore" element={<CreateStore />} />
      <Route path="/viewstore" element={<ViewStores />} />
      <Route path="/additem" element={<CreateItem />} />
      <Route path="/viewitem" element={<ViewItems />} />
      <Route path="/addoffer" element={<CreateOffer />} />
      <Route path="/viewoffer" element={<ViewOffers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/userItem" element={<UserViewItems />} />
      <Route path="/userOffer" element={<UserViewOffers />} />
      <Route path="/userStore" element={<UserViewStores />} />


      <Route path="/home" element={<Home />} />
      <Route path="/qr" element={<ParkingLot />} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;
