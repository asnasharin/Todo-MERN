import { useEffect, useState } from "react";
import { validate } from "../../utils/validate";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";

function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, errorMessage } = useAppSelector((state) => state.auth);

  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
    setError("");
    setSubmit(false);

    if (userData.email) {
      setFormError({
        ...formError,
        email: validate("email", userData.email),
      });
    }
    if (userData.password) {
      setFormError({
        ...formError,
        password: validate("password", userData.password),
      });
    }
    if (userData.name) {
      setFormError({
        ...formError,
        name: validate("name", userData.name),
      });
    }
    setSubmit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      email: validate("email", userData.email),
      password: validate("password", userData.password),
      name: validate("name", userData.name)
    });
    setError("");
    setSubmit(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup Success");
      navigate("/");
      setSubmit(false);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setError(errorMessage.message);
      setSubmit(false);
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    if (
      submit &&
      userData.email &&
      userData.password &&
      userData.name &&
      !formError.email &&
      !formError.password &&
      !formError.name
    ) {
      dispatch(signup(userData));
      setSubmit(false);
    }
  }, [formError, userData, submit, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Create Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="bold text-sm font-medium text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            {formError.email && <p className="text-red-500 text-sm">{formError.email}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            {formError.name && <p className="text-red-500 text-sm">{formError.name}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            {formError.password && <p className="text-red-500 text-sm">{formError.password}</p>}
          </div>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded-md">Signup</button>
          <p className="text-sm text-center text-gray-600">Already have an Account? <a href="/signin" className="text-indigo-500 hover:underline">Login</a></p>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
