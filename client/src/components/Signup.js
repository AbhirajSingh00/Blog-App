import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });

    const change = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        // Sending Data to Backend

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else {
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/login");
        }

    }

    return (
        <>
            <section className='signup'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <div className='signup-form'>
                            <h2 className='form-title'>Sign Up</h2>
                            <form method="POST" className='register-form' id='register-form'>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-account"></i> Your Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Name'
                                        name='name'
                                        value={user.name}
                                        onChange={change}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-email"></i> Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Email Id'
                                        name='email'
                                        value={user.email}
                                        onChange={change}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-phone-in-talk"></i> Mobile Number</label>
                                    <input type="number" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Mobile Number'
                                        name='phone'
                                        value={user.number}
                                        onChange={change}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-slideshow"></i> Work</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Profession'
                                        name='work'
                                        value={user.work}
                                        onChange={change}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-lock"></i> Password</label>
                                    <input type="password" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Password'
                                        name='password'
                                        value={user.password}
                                        onChange={change}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        <i class="zmdi zmdi-lock"></i> Confirm Password</label>
                                    <input type="password" className="form-control" id="exampleInputEmail1" autoComplete='off' placeholder='Enter Your Confirm Password'
                                        name='cpassword'
                                        value={user.cpassword}
                                        onChange={change}
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={postData}>Register</button>
                            </form>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;