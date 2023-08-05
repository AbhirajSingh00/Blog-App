import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password

            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        }
        else {
            dispatch({ type: "USER", payload: true });
            window.alert("Login Successfully");
            navigate("/");

        }

    }

    return (
        <>
            <section className='signin'>
                <div className='container mt-5'>
                    <div className='signin-content'>
                        <div className='signin-form'>
                            <h2 className='form-title'>Login</h2>
                            <form method="POST" className='register-form' id="register-form">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-email"></i> Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Email Id'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-lock"></i> Password</label>
                                    <input type="password" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={login}>Login</button>
                            </form>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
