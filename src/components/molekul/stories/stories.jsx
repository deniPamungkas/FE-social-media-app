import { useContext } from "react";
import "./stories.scss";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { AuthContext } from "../../../context/authContext";
import { useQuery } from "react-query";
import axios from "axios";

const Stories = () => {
  const { currUser } = useContext(AuthContext);
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
  const getFollowed = useQuery("getFollowed", async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/follow/getFollowed/"+user.id,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const stories = getFollowed?.data?.filter((item)=>{
    return item.followedUserId != user.id
  })
  return (
    <div className="story flex overflow-x-auto w-full gap-x-2 rounded-lg overflow-hidden">
      <section className="rounded-lg flex-shrink-0 overflow-hidden relative">
        <img
          src={
            !getMyUser.isLoading ? '/upload/'+getMyUser?.data[0].profilePic :
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          alt="stories"
          className="object-cover w-28 h-40"
        />
        <div className=" absolute bottom-1 px-2 w-full bg-white bg-opacity-50">
          <AddCircleTwoToneIcon color="info" />
          <p className="font-bold text-xs">{!getMyUser.isLoading && getMyUser?.data[0].name || "user"}</p>
        </div>
      </section>
      {stories?.map((item, index) => {
        return (
          <section
            key={index}
            className="rounded-lg flex-shrink-0 overflow-hidden relative"
          >
            <img
              src={item.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
              alt="stories"
              className="object-cover w-28 h-40"
            />
            <p className="font-bold text-xs absolute bottom-1 left-2">{item.name}</p>
          </section>
        );
      })}
    </div>
  );
};

export default Stories;
