import axios from "axios";
import Post from "../../atom/postCard/post";
import PropTypes from 'prop-types'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const MyPosts = ({userId}) => {
  const navigate = useNavigate()
  const getPosts = useQuery("getPosts", async () => {
    try {
      const response = await axios.get("http://localhost:8800/post/profile/"+userId, {
        withCredentials: true,
      });
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
        return <Post key={index} photo={item.profilePic} username={item.name} userId={userId} caption={item.caption} img={item.img} createdAt={item.createdAt} postId={item.id}/>;
      })}
    </div>
  );
};

MyPosts.propTypes = {
  userId: PropTypes.string
}

export default MyPosts;
