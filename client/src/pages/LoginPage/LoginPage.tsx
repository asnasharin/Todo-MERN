import { useEffect, useState } from "react"
import { validate } from "../../utils/validate"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { signin } from "../../services/authService"


function LoginPage() {
  const dispatch = useAppDispatch()
  const { isSuccess, isError, errorMessage} = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [submit, setSubmit] = useState(false)

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [formError, setFormError] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    setUserData({...userData, [name]: value})
    if (userData.email) {
      setFormError({
        ...formError,
        email: validate("email", userData.email)
      })
      if (userData.password) {
        setFormError({
          ...formError,
          password: validate("password", userData.password)
        })
    }
  }
  setSubmit(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError({
      ...formError,
      email: validate("email", userData.email),
      password: validate("password", userData.password)
    })
    setError("")
    setSubmit(true)
  }

  useEffect(() => {
    if(isSuccess) {
      toast.success("login successfully")
      navigate("/")
      setSubmit(false)
    }
  }, [navigate, isSuccess])

  useEffect(() => {
    if (isError)
      toast.error(errorMessage.message)
      setSubmit(false)
  }, [isError, errorMessage])

  useEffect(() => {
    if (
      submit &&
      userData.email &&
      userData.password &&
      !formError.email &&
      !formError.password
    ) {
      dispatch(signin(userData));
      setSubmit(false);
    }
  }, [formError, userData, submit, dispatch]);

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
    <h2 className="text-2xl font-semibold text-center text-gray-700">Signin to Your Account</h2>
    <form 
    onSubmit={handleSubmit}
    className="space-y-4"
    >
      <div>
        <label htmlFor="" className="bold text-sm font-medium text-gray-600">Email</label>
        <input 
        onChange={handleChange}
        type="text" 
        name="email"
        id="" 
        placeholder="Enter your Email"
        className="w-full  px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-600">Password</label>
        <input
        onChange={handleChange} 
        type="password" 
        name="password"
        placeholder="Enter Your Password" 
        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded-md">Signin</button>
        <p className="text-sm text-center text-gray-600">Don't have an Account? <a href="/signup" className="text-indigo-500 hover:underline">Register</a></p>
    </form>
      </div>
    </div>
    </>
  )
}

export default LoginPage