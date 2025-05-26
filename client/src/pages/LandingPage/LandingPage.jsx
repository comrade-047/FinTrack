import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-white relative px-6 py-6"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full">
        {/* Logo (Top-left) */}
        <div className="text-2xl font-bold text-[#13AA53] ">
          FinTrack
        </div>

        {/* Buttons (Top-right) */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signUp')}
            className="px-4 py-2 bg-[#56B56C] text-white font-semibold rounded-md hover:bg-[#3B8541] transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Centered Main Content */}
      <div className="flex flex-col items-center justify-center text-center h-[80vh]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#13AA52] mb-4">
          Welcome to FinTrack
        </h1>
        <p className="text-lg md:text-s text-[#3B7549] max-w-xl">
          Your personal finance tracker — manage your income, expenses, savings, and goals all in one place.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
