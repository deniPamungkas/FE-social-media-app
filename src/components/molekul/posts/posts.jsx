import axios from "axios";
import Post from "../../atom/postCard/post";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate()
  const getPosts = useQuery("getPosts", async () => {
    try {
      const response = await axios.get("http://localhost:8800/post", {
        withCredentials: true,
      })
      if (response.data.error) {
        navigate('/login')
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="flex flex-col gap-y-5 w-full h-auto">
      {getPosts.data?.map((item, index) => {
        return <Post key={index} photo={item.profilePic} userId={item.userId} username={item.name} caption={item.caption} img={item.img} createdAt={item.createdAt} postId={item.id}/>;
      })}
    </div>
  );
};

export default Posts;
