import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import ManageUser from "./pages/ManageUser";
import Profile from "./pages/Profile";

function App({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-background w-full min-h-screen">
      <Topbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="pl-6 pr-8 md:pr-12 lg:pl-80  pb-4 pt-20 min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
          {children}
        </div>
      </div>
    </div>
  );
}

export default App;
