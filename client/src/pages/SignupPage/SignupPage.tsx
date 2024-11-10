

function SignupPage() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
    <h2 className="text-2xl font-semibold text-center text-gray-700">Create Your Account</h2>
    <form action="" className="space-y-4">
      <div>
        <label htmlFor="" className="bold text-sm font-medium text-gray-600">Email</label>
        <input 
        type="text" 
        id="" 
        placeholder="Enter your Email"
        className="w-full  px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-600">Name</label>
        <input 
        type="text" 
        placeholder="Enter Your Name" 
        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        <div>
        <label htmlFor="" className="block text-sm font-medium text-gray-600">Password</label>
        <input 
        type="text" 
        placeholder="Enter Your Password" 
        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded-md">Signup</button>
        <p className="text-sm text-center text-gray-600">Already have an Account? <a href="/signin" className="text-indigo-500 hover:underline">Login</a></p>
    </form>
      </div>
    </div>
    </>
  )
}

export default SignupPage