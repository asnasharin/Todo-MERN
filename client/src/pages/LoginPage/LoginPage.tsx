import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import LoginIMG from "../../assets/Signup.svg";
import { validate } from "../../utils/FormValidate";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader2 from "../../components/Loader/Loader2/Loader2";
import { login } from "../../servieces/autthServiece";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  const [error, setError] = useState("");
  const [submit, setSubmit] = useState<boolean>(false);

  const [userData, setUser] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setUser({ ...userData, [name]: value });
    setError("");
    if (userData.email) {
      setFormError({
        ...formError,
        email: validate("email", userData.email),
      });
    }
    if (userData.password) {
      setFormError({
        ...formError,
        password: validate("passwordLogin", userData.password),
      });
    }
    setSubmit(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setFormError({
      ...formError,
      email: validate("email", userData.email),
      password: validate("passwordLogin", userData.password),
    });
    setError("");
    setSubmit(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Success!");
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
      !formError.email &&
      !formError.password
    ) {
      dispatch(login(userData));
      setSubmit(false);
    }
  }, [formError, userData, submit, dispatch]);

  return (
    <div className="grid grid-cols-12">
      <div className="left-section bg-gradient-to-tr from-black to-slate-800 hidden h-screen sm:col-span-7 sm:flex justify-center items-center">
        <img src={LoginIMG} alt="img" className="w-1/2" />
      </div>
      <div className="left-section h-screen col-span-12 sm:col-span-5 bg-white">
        <div className="form flex flex-col w-full justify-center items-center h-full">
          <h1 className="text-2xl font-medium mb-20">Signin to your Account</h1>
          <form onSubmit={handleSubmit} className="">
            {error && (
              <span className="text-red-700 text-center bg-red-100 text-sm w-[300px] rounded-sm py-1 mb-2">
                {error}
              </span>
            )}
            <div className="form-group flex flex-col mb-5">
              <label htmlFor="">Email</label>
              {formError.email && (
                <small className="text-red-600">{formError.email}</small>
              )}
              <input
                name="email"
                className="input-box py-1 ps-5"
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="">Password</label>
              {formError.password && (
                <small className="text-red-600">{formError.password}</small>
              )}
              <input
                type="password"
                name="password"
                className="input-box py-1 ps-5"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {!isLoading ? (
              <button
                type="submit"
                className="bg-gray-800 flex items-center justify-center text-white w-72 h-10 rounded-md mt-5"
              >
                Signin
              </button>
            ) : (
              <>
                <div className="bg-gray-800 flex items-center justify-center text-white w-72 h-10 rounded-md mt-5">
                  <Loader2 />
                </div>
              </>
            )}
            <div className="flex mt-5">
              <p>Don't have an account?</p> &nbsp;{" "}
              <button
                className="btn text-green-600"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
