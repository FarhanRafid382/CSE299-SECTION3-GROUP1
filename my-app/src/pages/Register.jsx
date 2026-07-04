function Register() {
    return (
        <div>
            <h1>Register Page</h1>
            
            <form>
                <label htmlFor="first-name">First Name</label>
                <input type="text" placeholder="Enter Your First Name" id="first-name" />
                <label htmlFor="last-name">Last Name</label>
                <input type="text" placeholder="Enter Your First Name" id="last-name" />
                <label htmlFor="email">Email</label>            
                <input type="email" placeholder="Enter Your Email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Your Password" id="password" />
                <label htmlFor="gender">Sex</label>
                <select name="gender" id="gender">
                    <option value="male" >Male </option>
                    <option value="female" >Female </option>
                    <option value="others" >Others </option>
                
                </select>
                
                <button type="submit">Register</button>
            </form>

        </div>
        


    )
}

export default Register;