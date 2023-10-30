import "./login.scss";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { login, err } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    setInputs((curr) => ({ ...curr, [target.name]: target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      login(inputs);
      console.log(err)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login h-screen bg-purple-300 flex items-center">
      <div className="login-card m-auto bg-slate-50 flex">
        <div className="left w-1/2 px-8 py-10">
          <h1 className="text-7xl font-bold mb-7">Hello world.</h1>
          <p className="mb-7 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            ipsam praesentium repellat inventore quis assumenda voluptate
            aliquid aspernatur nihil voluptas repellendus vel natus sit quam
            magnam aperiam porro optio nam!
          </p>
          <p className="mb-5 text-sm">{`Don't have an account?`}</p>
          <Link to={"/register"}>
            <Button>Register</Button>
          </Link>
        </div>
        <div className="right w-1/2 px-10 py-28">
          <h1 className="text-3xl font-bold mb-16">Login</h1>
          <form className="flex flex-col h-52 justify-between items-start">
            <input
              className="h-16 w-full px-3 border-b-2 outline-none text-sm"
              onChange={handleChange}
              value={inputs.username}
              name="username"
              type="text"
              placeholder="username"
            />
            <input
              className="h-16 w-full px-3 border-b-2 outline-none text-sm"
              onChange={handleChange}
              value={inputs.password}
              name="password"
              type="password"
              placeholder="password"
            />
            {err && <p className="text-xs font-bold" style={{color:'red'}}>{err.error}</p>}
            <Button onClick={handleClick}>Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
