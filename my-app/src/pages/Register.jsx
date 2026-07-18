function Register() {
  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="first-name">First Name</label>
          <input type="text" placeholder="Enter Your First Name" id="first-name" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="last-name">Last Name</label>
          <input type="text" placeholder="Enter Your Last Name" id="last-name" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Your Email" id="email" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Your Password" id="password" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="phone">Contact Number</label>
          <input type="tel" placeholder="Enter Your Contact Number" id="phone" className={inputClass} />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;