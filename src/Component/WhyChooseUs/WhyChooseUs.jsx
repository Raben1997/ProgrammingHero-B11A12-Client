import { FaCheckCircle, FaGlobe, FaRegStar, FaPenFancy } from "react-icons/fa";
const features = [
  {
    title: "Verified Scholarships",
    icon: <FaCheckCircle className="text-5xl text-green-600" />,
    desc: "Only authentic and up-to-date opportunities."
  },
  {
    title: "Easy Application",
    icon: <FaPenFancy className="text-5xl text-green-600" />,
    desc: "Quick apply in just a few steps."
  },
  {
    title: "Trusted Reviews",
    icon: <FaRegStar className="text-5xl text-green-600" />,
    desc: "Real feedback from real students."
  },
  {
    title: "Global Access",
    icon: <FaGlobe className="text-5xl text-green-600" />,
    desc: "Scholarships from around the world."
  }
];

export const WhyChooseUs = () => {
  return (
    <div className="sec-gap bg-green-50 text-center">
      <div className="container">
        <h2 className=" text-green-700">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="inline-block mb-4">{f.icon}</div>
              <h4 className="text-lg font-semibold text-green-700 mb-2">{f.title}</h4>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
