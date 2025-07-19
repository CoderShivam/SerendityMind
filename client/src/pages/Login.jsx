import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login, reset } from "../features/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error('Invalid Credentials');
    }

    if (isSuccess || user) {
      // Display a success toast when the user logs in
      toast.success("User logged in successfully!");
      navigate("/features");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dmdlgpurh/image/upload/v1736879584/pexels-souvenirpixels-1542493_dke22u.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />
      <section className="mx-auto border shadow-md backdrop-blur-sm md:w-96 px-4 py-4 text-center rounded-3xl">
        <form onSubmit={onSubmit} className="py-5 mt-6 md:w-full ">
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl w-64 md:w-80 caret-yellow-500 text-rose-500 mb-8"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="py-2.5 px-3 border-2 w-64 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80 caret-yellow-500 text-rose-500 mb-8"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg transition-all md:w-32"
            >
              Login
            </button>
          </div>

          <div className="mt-4">
            <p className="font-bold text-gray-300 hover:text-gray-400 text-base">
              New User ?{" "}
              <Link
                to="/signUp"
                className="text-sky-500 underline font-extrabold hover:text-sky-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
