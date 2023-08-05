import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch (e) {
            console.log(e);
            navigate("/signin");
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className='container emp-profile'>
                <form method=''>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='profile-img'>
                                <img src="" alt="Abhi" />
                            </div>

                        </div>

                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5>A{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className='profile-rating mt-3 mb-5'>Rankings <span>1/10</span></p>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls='home' aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls='profile' aria-selected="true">Profile</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>

                    <div className='row'>
                        {/* LEFT SIDE URL */}
                        <div className='col-md-4'>
                            <div className='profile-work'>
                                <p>Work Link</p>
                                <a href="#" target="_blank">Work</a>
                            </div>

                        </div>
                        {/* RIGHT SIDE DATA TOGGLE */}
                        <div className='col-md-8 pl-5 about-info'>
                            <div className='tab-content profile-tab' id="myTabContent">
                                <div className='tab-pane fade show active' id="home" role='tabpanel' aria-labelledby='home-tab'>

                                    <div className='row mt-5'>
                                        <div className='col-md-6'>
                                            <label>User ID</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>3423454354241</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='tab-pane fade' id="profile" role='tabpanel' aria-labelledby='profile-tab'>

                                    <div className='row mt-5'>
                                        <div className='col-md-6'>
                                            <label>Experience</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Beginner</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Charges</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>2$/hr</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Total Projects</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>2</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>English Level</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Fluent</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Availability</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Available</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About;