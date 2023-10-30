import { useRef } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useState } from "react";
import axios from "axios";
import FormData from 'form-data'
import { useMutation, useQuery, useQueryClient } from "react-query";

const Share = () => {
  const ref = useRef()
  const queryClient = useQueryClient();
  const [file,setFile] = useState(null)
  const [value, setValue] = useState({
    caption: "",
    img: null
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setValue({ ...value, [e.target.name]: e.target.files[0].name });
  }
  const handleShare = async (e) => {
    e.preventDefault();
    upload();
    mutation.mutate(value);
    ref.current.value = '';
    setValue({
      caption: "",
      img: null
    })
  };
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
  const mutation = useMutation(
    async (newPost) => {
      try {
        const response = await axios.post(
          "http://localhost:8800/post/makePost",
          newPost,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getPosts"]);
      },
    }
  );
  const formData = new FormData()
  formData.append('file', file)
  const upload = async()=>{
    try {
      const response = await axios.post("http://localhost:8800/file/upload", formData)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-auto rounded-xl bg-white py-1 px-4 text-xs">
      <div className="h-auto flex gap-x-2 items-center border-b-2 py-2">
        <img
          src={
            !getMyUser.isLoading ? '/upload/'+getMyUser?.data[0].profilePic :
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          alt="profile"
          className="w-7 h-7 rounded-full object-cover"
        />
        <textarea
          value={value.caption}
          name="caption"
          id="caption"
          className="w-full h-10 p-2 outline-none overflow-hidden"
          placeholder={`whats on your mind ${!getMyUser.isLoading && getMyUser?.data[0].name}?`}
          onChange={handleChange}
        ></textarea>
        {
          ref.current?.files[0]? <img src={URL.createObjectURL(ref.current?.files[0])} alt="photo" className="w-14 h-full object-cover" />:''
        }
      </div>
      <div className="flex py-2 items-center justify-between text-blue-950">
        <div className="flex gap-4">
          <label htmlFor="gambar" className="flex gap-x-1 items-center">
            <AddAPhotoOutlinedIcon fontSize="small" />
            <p>Add Image</p>
          </label>
          <label htmlFor="gambar" className="flex gap-x-1 items-center">
            <AddLocationAltOutlinedIcon fontSize="small" />
            <p>Add Place</p>
          </label>
          <label htmlFor="gambar" className="flex gap-x-1 items-center">
            <PersonAddOutlinedIcon fontSize="small" />
            <p>Tag Friend</p>
          </label>
          <input ref={ref} type="file" id="gambar" name="img" className="hidden" onChange={handleFile}/>
          <input type="file" id="place" name="place" className="hidden" />
          <input type="file" id="friend" name="friend" className="hidden" />
        </div>
        <button
          className="px-3 py-1 rounded-sm bg-blue-500 text-white"
          onClick={handleShare}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Share;
