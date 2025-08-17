import React from 'react';
import Swal from 'sweetalert2';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Success!",
            text: "Your message has been submitted successfully.",
            icon: "success",
            confirmButtonColor: "#16a34a",
        });

        e.target.reset();
    };

    return (
        <>
            <div className="sec-gap">
                <div className="container">
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-md h-[600px] [perspective:1000px]">
                            <div className={`absolute inset-0 transition-transform duration-700 transform-style preserve-3d`}></div>
                            <div className="absolute inset-0 backface-hidden rounded-xl shadow-xl p-8 border-t-4 border-green-600 bg-green-50">
                                <h2 className="text-center text-green-600">Contact Form</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1 text-green-600">Name</label>
                                        <input type="text" className="w-full input input-bordered border-green-600" placeholder="Name" name="name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-green-600">Email</label>
                                        <input type="email" className="w-full input input-bordered border-green-600" placeholder="Email address" name="email" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-green-600">Phone Number</label>
                                        <input type="text" className="w-full input input-bordered border-green-600" placeholder="Phone Number" name="Phone Number" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-green-600">Subject</label>
                                        <input type="text" className="w-full input input-bordered border-green-600" placeholder="Subject" name="subject" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1 text-green-600">Massage</label>
                                        <textarea className="w-full textarea input-bordered border-green-600" placeholder="Massage..." name="massage" required ></textarea>
                                    </div>
                                    <button type="submit" className="btn bg-green-600 text-white w-full hover:bg-green-700">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Contact;