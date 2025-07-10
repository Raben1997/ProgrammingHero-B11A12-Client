import { FaSearch, FaBookOpen, FaEdit, FaBoxOpen } from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch className="text-5xl text-green-600" />,
        title: "Search",
        desc: "Browse thousands of verified scholarships."
    },
    {
        icon: <FaBookOpen className="text-5xl text-green-600" />,
        title: "Details",
        desc: "Check eligibility, deadlines, and fees."
    },
    {
        icon: <FaEdit className="text-5xl text-green-600" />,
        title: "Apply",
        desc: "Submit your application in a few clicks."
    },
    {
        icon: <FaBoxOpen className="text-5xl text-green-600" />,
        title: "Track",
        desc: "Track your application status easily."
    }
];

export const HowItWorks = () => {
    return (
        <div className="sec-gap bg-white text-center">
            <div className="container">
                <h2 className="text-green-700">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="bg-green-50 border border-green-100 p-6 rounded-xl hover:shadow-md transition"
                        >
                            <div className="mb-3 inline-block">{step.icon}</div>
                            <h3 className="text-lg font-semibold text-green-700 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
