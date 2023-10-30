import NavBar from "./navbar/navbar";
import LeftBar from "./leftbar/leftbar";
import RightBar from "./rightbar/rightbar";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Layout = () => {
  const queryClient = new QueryClient();
  const {logout} = useContext(AuthContext)
  const location = window.location.pathname
  if(location == '/') return logout()
  return (
    <div className="layout bg-gray-100">
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <div className="flex justify-between">
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default Layout;
