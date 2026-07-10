function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div>
            <h1>Register Page</h1>
            
            <form>
                <label htmlFor="first-name">First Name</label>
                <input 
                    type="text" 
                    placeholder="Enter Your First Name" 
                    id="first-name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <label htmlFor="last-name">Last Name</label>
                <input 
                    type="text" 
                    placeholder="Enter Your Last Name" 
                    id="last-name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <label htmlFor="email">Email</label>            
                <input 
                    type="email" 
                    placeholder="Enter Your Email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    placeholder="Enter Your Password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <label htmlFor="gender">Sex</label>
                <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male" >Male </option>
                    <option value="female" >Female </option>
                    <option value="others" >Others </option>
                
                </select>
                <br />
                <label htmlFor="phone">Contact Number</label>
                <input 
                    type="tel" 
                    placeholder="Enter Your Contact Number" 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>

        </div>
        


    )
}

export default Register;