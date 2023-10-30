import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { useQuery } from "react-query";
import moment from "moment";
import PropTypes from "prop-types";
import axios from "axios";

const Comment = ({ commentCaption, profilePic, name, createdAt }) => {
  return (
    <section className="comments h-auto flex items-start gap-3">
      <img
        src={
          profilePic ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        }
        alt="profile"
        className="w-8 h-8 object-cover rounded-full"
      />
      <div className="h-full w-full flex items-center gap-x-5 text-xs ">
        <div className="w-4/5">
          <p className="font-bold">{name}</p>
          <p>{commentCaption}</p>
        </div>
        <p className=" h-fit">{moment(createdAt).fromNow()}</p>
      </div>
    </section>
  );
};

const Comments = ({ postId, mutasiComment }) => {
  const { currUser } = useContext(AuthContext);
  const user = JSON.parse(currUser);
  const [comment, setComment] = useState({
    commentCaption:"",
    postId
  })
  const { isLoading, error, data } = useQuery(`getComment${postId.toString()}`, async () => {
    try {
      const response = await axios.post("http://localhost:8800/comment", comment);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 5;
  const startIndex = 0
  const slicedData = data?.slice(startIndex, pageNumber*perPage)
  const sisa = data?.length - slicedData?.length
  const handleChange = (e) =>{
    setComment({...comment, [e.target.name]:e.target.value})
  }
  const addComment = async(e)=>{
    e.preventDefault()
    setComment({commentCaption:"",postId})
    mutasiComment(comment)
  }
  const handlePagination = () => {
    if(sisa > 0){
      setPageNumber(curr=>curr+1)
    }
  }
  return (
    <div className="w-full h-auto text-xs flex flex-col gap-5">
      <section className="inputComments h-8 flex items-center gap-3">
        <img
          src={
            user?.profilePic ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          alt="profile"
          className="w-8 h-8 object-cover rounded-full"
        />
        <form className="h-full w-full flex gap-2">
          <input
            type="text"
            name="commentCaption"
            placeholder="Comment"
            value={comment.commentCaption}
            className="w-full h-full px-2 outline-none border-2 rounded"
            onChange={handleChange}
          />
          <button type='submit' className="bg-blue-800 w-14 h-full text-white rounded" onClick={addComment}>
            Send
          </button>
        </form>
      </section>
      {slicedData?.map((item, index) => {
        return (
          <Comment
            key={index}
            commentCaption={item.commentCaption}
            profilePic={item.profilePic}
            name={item.name}
            createdAt={item.createdAt}
            postId={postId}
          />
        );
      })}
      {sisa > 0 && <p onClick={handlePagination}>load more comments</p>}
    </div>
  );
};

Comment.propTypes = {
  commentCaption: PropTypes.string,
  profilePic: PropTypes.string,
  name: PropTypes.string,
  createdAt: PropTypes.any,
};

Comments.propTypes = {
  postId: PropTypes.any,
  mutasiComment: PropTypes.any
};

export default Comments;
