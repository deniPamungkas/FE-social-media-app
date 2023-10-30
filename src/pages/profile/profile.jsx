import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import MyPosts from "../../components/molekul/myPosts/myPosts";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import UpdateProfile from "../../components/molekul/updateProfile/updateProfile";

const Profile = () => {
  const { currUser } = useContext(AuthContext);
  const user = JSON.parse(currUser);
  const { userId } = useParams();
  const [openUpdate, setOpenUpdate] = useState(false);
  const getUser = useQuery("getUser", async () => {
    try {
      const response = await axios.get("http://localhost:8800/user/" + userId, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const follower = getUser?.data?.map((item) => {
    return item.followerUserId;
  });
  const isFollow = follower?.includes(user.id);
  const queryClientFollow = useQueryClient();
  const mutationFollow = useMutation(
    async () => {
      try {
        if (isFollow)
          return await axios.delete(
            "http://localhost:8800/follow/unfollow/" + userId,
            { withCredentials: true }
          );
        return await axios.post(
          "http://localhost:8800/follow",
          { userId },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClientFollow.invalidateQueries(["getUser"]);
        queryClientFollow.invalidateQueries(["getFollow"]);
      },
    }
  );
  const getFollow = useQuery("getFollow", async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/follow/getFollowed/"+userId,
        { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const da = getFollow?.data
  const following = da?.filter((item)=>{
    return item.followedUserId != userId
  })
  const followers = da?.filter((item)=>{
    return item.followedUserId == userId
  })
  const handleFollow = async (e) => {
    e.preventDefault();
    return mutationFollow.mutate();
  };
  const handleClose = () => {
    setOpenUpdate(false);
  };
  return (
    <div className="profile w-3/5 h-auto flex flex-col gap-y-4 relative">
      <img
        src={getUser.data? '/upload/'+getUser.data[0].coverPic: "https://images.unsplash.com/photo-1577224682146-dd7843c88d33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
        alt="bg"
        className="w-full h-56 object-cover"
      />
      <section className="about bg-white rounded-xl w-5/6 h-44 m-auto px-10 flex justify-between">
        <div className="left w-1/3 flex h-auto items-center gap-x-1.5">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <LinkedInIcon />
          <PinterestIcon />
        </div>
        <div className="mid w-1/3 flex flex-col items-center relative ">
          <div className="flex flex-col gap-y-1 items-center absolute -top-20 text-xl font-bold ">
            <img
              src={getUser.data? '/upload/'+getUser.data[0].profilePic:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover"
            />
            <p>{getUser?.data ? getUser.data[0]?.name : "User"}</p>
            <div className=" w-36 h-auto flex justify-between items-center font-light text-xs">
              <span className="flex gap-x-1 items-center">
                <LocationOnIcon fontSize="small" />
                <p>{getUser?.data ? getUser.data[0]?.city : "USA"}</p>
              </span>
              <span className="flex gap-x-1 items-center">
                <LanguageIcon fontSize="small" />
                <p>{getUser?.data ? getUser.data[0]?.website : "jane.com"}</p>
              </span>
            </div>
          </div>
          {userId == user.id ? (
            <button
              className="w-24 h-8 bg-blue-500 rounded absolute -h-20 bottom-2 text-white"
              onClick={()=>{setOpenUpdate(true)}}
            >
              {"Edit Profile"}
            </button>
          ) : (
            <button
              className="w-24 h-8 bg-blue-500 rounded absolute -h-20 bottom-2 text-white"
              onClick={handleFollow}
            >
              {isFollow == true ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="right w-1/3 flex h-auto items-center justify-end gap-x-2">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-lg">{followers?.length}</span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-lg">{following?.length}</span>
            <span className="text-sm">Following</span>
          </div>
          <MoreVertIcon />
        </div>
      </section>
      <section className="posts m-auto w-5/6 h-auto">
        <MyPosts userId={userId} />
      </section>
      {openUpdate && <UpdateProfile close={handleClose} user={getUser?.data[0]}/>}
    </div>
  );
};

export default Profile;
