import { useState } from "react";

function Profile() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Profile saved:", { addressLine1, addressLine2, city, state, postalCode, country });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Address Line 1</label>
          <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Address Line 2</label>
          <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;