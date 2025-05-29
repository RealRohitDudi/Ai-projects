import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className=" min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-violet-700 to-blue-50 ">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Unlock Intelligence with PeakyBot
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-6">
        Your gateway to powerful large language model capabilities. Ask
        questions, generate content, or explore documents effortlessly.
      </p>
      <Link
        to="/chat"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300"
      >
        Start Chat
      </Link>
    </section>
  );
};

export default Home;
