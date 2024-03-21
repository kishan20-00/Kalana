import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/addUser";
import ViewUsers from "./pages/updateUser";
import CreateStore from "./pages/addStore";
import ViewStores from "./pages/AllStores";
import CreateItem from "./pages/addItems";
import ViewItems from "./pages/AllItems";
import CreateOffer from "./pages/addOffers";
import ViewOffers from "./pages/AllOffers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          
      <Route path="/" element={<Register />} />
      <Route path="/viewuser" element={<ViewUsers />} />
      <Route path="/addstore" element={<CreateStore />} />
      <Route path="/viewstore" element={<ViewStores />} />
      <Route path="/additem" element={<CreateItem />} />
      <Route path="/viewitem" element={<ViewItems />} />
      <Route path="/addoffer" element={<CreateOffer />} />
      <Route path="/viewoffer" element={<ViewOffers />} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;
