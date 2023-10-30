import MenuItem from "../atom/menuItem/menuItem";
import './leftbar.scss'

const LeftBar = () => {
  return (
    <div className="leftBar bg-white w-1/6 border-r-2 py-5 overflow-scroll">
      <MenuItem>Friends</MenuItem>
      <MenuItem>Groups</MenuItem>
      <MenuItem>Marketplace</MenuItem>
      <MenuItem>Watch</MenuItem>
      <MenuItem>Memories</MenuItem>
      <hr className="w-11/12 m-auto my-3" />
      <p className="px-3 text-sm my-1 font-bold">Your Shortcuts</p>
      <MenuItem>Events</MenuItem>
      <MenuItem>Gaming</MenuItem>
      <MenuItem>Gallery</MenuItem>
      <MenuItem>Videos</MenuItem>
      <MenuItem>Messages</MenuItem>
      <hr className="w-11/12 m-auto my-3" />
      <p className="px-3 text-sm my-1 font-bold">Others</p>
      <MenuItem>Fundraiser</MenuItem>
      <MenuItem>Tutorials</MenuItem>
      <MenuItem>Courses</MenuItem>
    </div>
  );
};

export default LeftBar;
