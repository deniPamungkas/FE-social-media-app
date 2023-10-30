import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import PropTypes from 'prop-types'

const SearchProfile = () => {
  const [search,setSearch] = useState('')
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const navigate= useNavigate()
  const getUsers = useQuery("getUsers", async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/user?username=" + search, {withCredentials:true}
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const handleSearchSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <div className="postCard flex flex-col gap-y-3 w-1/2 h-auto bg-white rounded-xl p-4">
      <form onSubmit={handleSearchSubmit} className=" w-2/3 m-auto flex justify-center items-center">
      <input type="text" onChange={handleChange} value={search} placeholder="search" className="outline-none border-b-2 px-3 w-full"/>
      </form>
      {getUsers?.data?.map((item, index) => {
        console.log(item)
        return <Widget key={index} userId={item.id} name={item.name} username={item.username} profilePic={item.profilePic} follower={item.followerUserId}/>;
      })}
    </div>
  );
};

const Widget = ({name, username, profilePic, follower, userId}) => {
  const queryClientFollow = useQueryClient();
  const navigate = useNavigate();
  const mutationFollow = useMutation(
    async () => {
      try {
        if (follower)
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
        queryClientFollow.invalidateQueries(["getUsers"]);
      },
    }
  );
  const handleFollow = async (e) => {
    e.preventDefault();
    return mutationFollow.mutate();
  };
  const handleProfile = ()=>{
    navigate('/profile/'+userId)
  }
  return <div className="w-full h-14 border-2 flex justify-between">
  <div className="left w-2/3 h-full gap-x-3 flex" onClick={handleProfile}>
    <img src={profilePic != null?  '/public/upload/'+profilePic :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="photoProfile" className="h-full w-12 rounded-full object-cover"/>
    <div className="flex flex-col">
      <span className="text-lg font-bold">{name}</span>
      <span className="text-xs">@{username}</span>
    </div>
  </div>
  <div className="right w-1/3 h-full flex justify-center items-center">
  <button
      className="w-24 h-8 bg-blue-500 rounded text-white"
      onClick={handleFollow}
    >
      {follower != null ? "Following" : "Follow"}
    </button>
  </div>
</div>
}

Widget.propTypes = {
  name:PropTypes.string,
  username:PropTypes.string,
  profilePic:PropTypes.string,
  follower:PropTypes.number,
  userId:PropTypes.number
}

export default SearchProfile;
