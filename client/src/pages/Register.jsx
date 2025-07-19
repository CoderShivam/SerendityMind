import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { register, reset } from '../features/authSlice';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
   
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success('User Registered Successfully')
      navigate('/features');
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
      name,
      email,
      password,
      
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  return (
    <div
    className=" flex items-center justify-center h-screen "
    style={{
      backgroundImage: "url('https://res.cloudinary.com/dmdlgpurh/image/upload/v1736879584/pexels-souvenirpixels-1542493_dke22u.jpg')",
      backgroundSize: "cover",      // Ensures the image covers the entire div
      backgroundPosition: "center", // Centers the image in the div
      backgroundRepeat: "no-repeat" // Prevents tiling of the image
    }}
    >

      <ToastContainer />
      <section className="mx-auto border border-gray-300  backdrop-blur-sm shadow-md  md:w-96 px-4 py-4 text-center  rounded-3xl">
        <form onSubmit={onSubmit} className='md:w-full w-64'>
          <div>
            <input
              type="text"
              className="py-2.5 px-3 border-2 w-64  focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 w-64  focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
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
              className="py-2.5 px-3 border-2  w-64 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
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
              className="bg-sky-400 hover:bg-sky-500  md:w-40 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </button>
          </div>

          <div>
            <p className="font-medium text-1xl  mt-3">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-sky-600 hover:text-sky-700 font-extrabold"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;