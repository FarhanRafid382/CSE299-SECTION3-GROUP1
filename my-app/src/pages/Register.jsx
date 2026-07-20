// Register.jsx
function Register() {
  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
        <p className="text-gray-500 text-sm mb-6">Join us and start shopping.</p>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input type="email" id="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="password">Password</label>
            <input type="password" id="password" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Contact Number</label>
            <input type="tel" id="phone" className={inputClass} />
          </div>
          <button type="submit" className="w-full bg-gray-950 text-white py-3 rounded-full font-semibold hover:bg-indigo-600 transition mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;