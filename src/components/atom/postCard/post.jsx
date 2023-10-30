import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import moment from "moment";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./post.scss";
import Comments from "../comments/comments";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const Post = ({ photo, username, caption, img, createdAt, postId, userId }) => {
  const { currUser } = useContext(AuthContext);
  const user = JSON.parse(currUser);
  const navigate = useNavigate();
  const [openComment, setOpenComment] = useState(false);
  const getLikes = useQuery(`getLikes${postId.toString()}`, async () => {
    try {
      const response = await axios.post("http://localhost:8800/like", {
        postId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const queryClientLike = useQueryClient();
  const likesUserId = getLikes?.data?.map((item) => {
    return item.likeUserId;
  });
  const isAlreadyLikes = likesUserId?.includes(user.id);
  const mutationLike = useMutation(
    async (newComment) => {
      try {
        if (isAlreadyLikes)
          return await axios.delete(
            "http://localhost:8800/like/hitDislike?postId=" + postId,
            { withCredentials: true }
          );
        return await axios.post(
          "http://localhost:8800/like/hitLike",
          newComment,
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClientLike.invalidateQueries([`getLikes${postId.toString()}`]);
      },
    }
  );
  const getComments = useQuery(`getComment${postId.toString()}`, async () => {
    try {
      const response = await axios.post("http://localhost:8800/comment", {
        postId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  const queryClientComment = useQueryClient();
  const mutationComment = useMutation(
    async (newComment) => {
      try {
        return await axios.post(
          "http://localhost:8800/comment/makeComment",
          newComment,
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClientComment.invalidateQueries([
          `getComment${postId.toString()}`,
        ]);
      },
    }
  );
  const mutasiComment = (p) => {
    return mutationComment.mutate(p);
  };
  const navigateToProfile = () => {
    navigate(`/profile/${userId}`);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile/" + userId);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePost = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const mutationDeletePost = useMutation(
    async () => {
      try {
        const response = await axios.delete(
          "http://localhost:8800/post/deletePost/" + postId,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClientComment.invalidateQueries(["getPosts"]);
      },
    }
  );
  const handleDeletePost = async () => {
    setAnchorEl(null);
    mutationDeletePost.mutate();
  };
  return (
    <div className="postCard flex flex-col gap-y-4 w-full h-auto bg-white rounded-xl p-4">
      <section className="top flex justify-between items-center h-10">
        <div className="flex w-1/2 items-center" onClick={navigateToProfile}>
          <img
            src={
              '/upload/'+photo ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            alt="user"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="flex flex-col text-sm">
            <p className="font-bold">{username}</p>
            <p style={{ fontSize: "10px" }}>{moment(createdAt).fromNow()}</p>
          </div>
        </div>
        <div>
          <MoreHorizOutlinedIcon onClick={handlePost} />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleProfile}>View Profile</MenuItem>
            {user?.id == userId ? (
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </section>
      <section className="mid flex flex-col gap-y-2 w-full h-auto text-xs">
        <p>{caption}</p>
        {img == null ? (
          ""
        ) : (
          <div>
            <img
              src={
                `/upload/${img}` ||
                "https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
              }
              alt="post"
              className="w-full object-cover"
            />
          </div>
        )}
      </section>
      <section className="bottom">
        <div className="flex w-1/2 items-center gap-x-5">
          <span className="flex items-center text-xs gap-x-1.5">
            {isAlreadyLikes == true ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                fontSize="small"
                onClick={() => {
                  mutationLike.mutate({ postId });
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                fontSize="small"
                onClick={() => {
                  mutationLike.mutate({ postId });
                }}
              />
            )}
            <p>{`${getLikes.data?.length} Likes`}</p>
          </span>
          <span
            className="flex items-center text-xs gap-x-1.5"
            onClick={() => {
              setOpenComment((curr) => !curr);
            }}
          >
            <ChatOutlinedIcon fontSize="small" />
            <p>{`${getComments.data?.length} Comments`}</p>
          </span>
          <span className="flex items-center text-xs gap-x-1.5">
            <ShareRoundedIcon fontSize="small" />
            <p>Share</p>
          </span>
        </div>
      </section>
      {openComment && (
        <Comments postId={postId} mutasiComment={mutasiComment} />
      )}
    </div>
  );
};

Post.propTypes = {
  photo: PropTypes.string,
  username: PropTypes.string,
  caption: PropTypes.string,
  img: PropTypes.string,
  postId: PropTypes.number,
  userId: PropTypes.any,
  createdAt: PropTypes.any,
};

export default Post;
