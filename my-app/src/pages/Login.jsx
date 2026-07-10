function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Login Page</h1>
            
            <form>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    placeholder="Enter Email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
                <button type="button">Forgot Password</button>
            </form>
        </div>
       
    )
}

export default Login;