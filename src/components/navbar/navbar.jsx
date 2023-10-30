import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DarkMode } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const NavBar = () => {
  const { toggle, dark } = useContext(DarkMode);
  const { currUser, logout } = useContext(AuthContext);
  const user = JSON.parse(currUser);
  const getMyUser = useQuery("getMyUser", async () => {
    try {
      const response = await axios.get("http://localhost:8800/user/myuser/user", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };
  const handleProfile = () => {
      setAnchorEl(null);
      navigate('/profile/'+user.id)
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSearchSubmit = (e) =>{
    e.preventDefault()
    navigate('/user?username=')
  }
  return (
    <nav
      className={`navbar ${
        dark ? "bg-gray-700" : "bg-white"
      } h-14 border-b-2 text-sm flex justify-between items-center px-4 sticky top-0 z-10`}
    >
      <section className=" w-1/6 left flex items-center justify-between">
        <h1 className="text-lg font-bold text-blue-900">denisocial.</h1>
        <HomeOutlinedIcon onClick={()=>{navigate('/'+user.id)}}/>
        {dark ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ color: "yellow" }} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <WidgetsOutlinedIcon />
      </section>
      <section className=" w-3/5 mid flex justify-center">
        <form onSubmit={handleSearchSubmit} className="h-6 flex justify-center w-1/2 px-3 bg-slate-300">
          <button className="h-full w-1/2 flex justify-center items-center font-bold" onClick={handleSearchSubmit}>
          <PersonSearchIcon style={{ color: "grey" }} fontSize="small"/>Search</button>
        {/* <input
          className="outline-none h-full w-full px-1"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={search}
        /> */}
        </form>
      </section>
      <section className=" w-1/5 right flex items-center justify-between">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="flex gap-x-1 items-center justify-center w-2/3">
          <img
            src={!getMyUser.isLoading ? '/upload/'+ getMyUser?.data[0].profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
            alt="profile"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="w-auto flex">
            {!getMyUser.isLoading && getMyUser?.data[0].username || "User"}
            <div>
              <ArrowDropDownOutlinedIcon
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </span>
        </div>
      </section>
    </nav>
  );
};

export default NavBar;
