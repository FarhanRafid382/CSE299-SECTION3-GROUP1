function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
       
    )
}

export default Login;