import { useEffect, useState } from "react";
import Button from "../../components/button";
import axios from "axios";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState({});
  const handleChange = ({ target }) => {
    setInputs((curr) => ({ ...curr, [target.name]: target.value }));
  };
  const fetchRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/auth/register",
        inputs
      );

      setErr(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register h-screen bg-purple-300 flex items-center">
      <div className="register-card m-auto bg-slate-50 flex">
        <div className="left w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-16">Register</h1>
          <form className="flex flex-col h-72 justify-between items-start">
            <input
              className="h-12 w-full px-3 border-b-2 outline-none text-sm"
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              placeholder="username"
            />
            <input
              className="h-12 w-full px-3 border-b-2 outline-none text-sm"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="email"
            />
            <input
              className="h-12 w-full px-3 border-b-2 outline-none text-sm"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="password"
            />
            <input
              className="h-12 w-full px-3 border-b-2 outline-none text-sm"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="name"
            />
            {err && <p className="text-xs font-bold" style={{color:'green'}}>{err.message}</p>}
            <Button onClick={fetchRegister}>Register</Button>
          </form>
        </div>
        <div className="right w-1/2 px-8 py-10">
          <h1 className="text-7xl font-bold mb-7">Deni Social.</h1>
          <p className="mb-7 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            ipsam praesentium repellat inventore quis assumenda voluptate
            aliquid aspernatur nihil voluptas repellendus vel natus sit quam
            magnam aperiam porro optio nam!
          </p>
          <p className="mb-5 text-sm">{`Do you have an account?`}</p>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
