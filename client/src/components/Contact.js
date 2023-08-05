import React, { useState, useEffect } from 'react';

const Contact = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const callContactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }


        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        callContactPage();
    }, []);

    const change = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    // Sending The Message written by the User to Backend
    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("message not send");
        }
        else {
            alert("Message Send");
            setUserData({ ...userData, message: "" });
        }

    }

    return (
        <>
            <div className='contact_info'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
                            {/* PHONE NUMBER */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center' >
                                <img src="" alt="phone" />
                                <div className='contact_info_title'>
                                    Phone
                                </div>
                                <div className='contact_info_text'>
                                    +91 1111223345
                                </div>
                            </div>
                            {/* EMAIL */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center' >
                                <img src="" alt="email" />
                                <div className='contact_info_title'>
                                    Email
                                </div>
                                <div className='contact_info_text'>
                                    abhiraj@gmail.com
                                </div>
                            </div>
                            {/* ADDRESS */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center' >
                                <img src="" alt="address" />
                                <div className='contact_info_title'>
                                    Address
                                </div>
                                <div className='contact_info_text'>
                                    Gurgaon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CONTACT FORM */}
            <div className='contact_form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                                <div className='contact_form_title'>
                                    Get In Touch
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className='contact_form_name d-flex justify-content-between align-items-center'>
                                        <input type="text" id="contact_form_name"
                                            className='contact_form_name input_field'
                                            name='name'
                                            value={userData.name}
                                            placeholder='Enter Your Name' required="true"
                                            onChange={change} />

                                        <input type="email" id="contact_form_name"
                                            className='contact_form_email input_field'
                                            name='email'
                                            value={userData.email}
                                            placeholder='Enter Your Email Id' required="true"
                                            onChange={change} />

                                        <input type="number" id="contact_form_name"
                                            className='contact_form_number input_field'
                                            name='phone'
                                            value={userData.phone}
                                            placeholder='Enter Your Number' required="true"
                                            onChange={change} />

                                    </div>

                                    <div className='contact_form_text mt-5'>
                                        <textarea className='text_field contact_form_message'
                                            name='message'
                                            value={userData.message}
                                            placeholder="Enter Your Message" cols="30" rows="10"
                                            onChange={change}></textarea>
                                    </div>

                                    <div className='contact_form_button'>
                                        <button type="submit" className='button contact_submit_button'
                                            onClick={contactForm}>Send Message</button>

                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;