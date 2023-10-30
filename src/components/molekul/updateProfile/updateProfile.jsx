import { useRef, useState } from "react";
import "./updateProfile.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const UpdateProfile = ({ close, user }) => {
  const profileRef = useRef();
  const coverRef = useRef();
  const queryClientUpdate = useQueryClient();
  const [profile,setProfile] = useState(null)
  const [cover,setCover] = useState(null)
  const [update, setUpdate] = useState({
    Name: user.name,
    City:user.city,
    Website:user.website,
    ProfilePic: user.profilePic,
    CoverPic: user.coverPic,

  });
  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  const handleChangePic = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.files[0].name });
    if(e.target.name == 'ProfilePic') return setProfile(e.target.files[0])
    if(e.target.name == 'CoverPic') return setCover(e.target.files[0])
  };
  const formData = new FormData()
  const upload = async(file)=>{
    formData.append('file', file)
    try {
      const response = await axios.post("http://localhost:8800/file/upload", formData)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  const mutationUpdate =useMutation(async()=>{
    try {
      const response = await axios.put('http://localhost:8800/user/update', update, {withCredentials:true})
      return response.data
    } catch (error) {
      console.log(error)
    }
  },{
    onSuccess:()=>{
      queryClientUpdate.invalidateQueries(['getUser'])
      queryClientUpdate.invalidateQueries(['getPosts'])
    }
  })
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(cover != null) upload(cover);
    if(profile != null) upload(profile);
    mutationUpdate.mutate();
    close();
  };
  return (
    <div className="updateProfile bg-slate-400 absolute p-4 rounded">
      <form action="submit" className="flex flex-col h-full gap-5">
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="Name">
            Name
          </label>
          <input
            className="h-8 rounded outline-none px-2 text-xs"
            type="text"
            placeholder={user.name}
            id="Name"
            name="Name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="City">
            City
          </label>
          <input
            className="h-8 rounded outline-none px-2 text-xs"
            type="text"
            placeholder={user.city}
            id="City"
            name="City"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="Website">
            Website
          </label>
          <input
            className="h-8 rounded outline-none px-2 text-xs"
            type="text"
            placeholder={user.website}
            id="Website"
            name="Website"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="ProfilePic">
            Profile Picture
          </label>
          <input
            ref={profileRef}
            type="file"
            placeholder="ProfilePic"
            id="ProfilePic"
            name="ProfilePic"
            onChange={handleChangePic}
          />
          {profileRef?.current?.files[0] ? (
            <img
              src={URL.createObjectURL(profileRef.current?.files[0])}
              alt="photo"
              className="w-28 h-28 object-cover"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="CoverPic">
            Cover Picture
          </label>
          <input
            ref={coverRef}
            type="file"
            placeholder="CoverPic"
            id="CoverPic"
            name="CoverPic"
            onChange={handleChangePic}
          />
          {coverRef?.current?.files[0] ? (
            <img
              src={URL.createObjectURL(coverRef.current?.files[0])}
              alt="photo"
              className="w-28 h-28 object-cover"
            />
          ) : (
            ""
          )}
        </div>
        <button onClick={handleSubmit} className="bg-slate-500 h-10 text-white">Submit</button>
        <button onClick={close} className="bg-red-400 h-10 text-white">Close</button>
      </form>
    </div>
  );
};

UpdateProfile.propTypes = {
  close: PropTypes.func,
  user: PropTypes.any,
};

export default UpdateProfile;
