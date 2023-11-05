import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

const Navbar = () => {
  return (
    <header className="bg-white text-black py-6 px-10 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex gap-1 items-center">
        <div>
          <span className="text-black text-4xl font-extrabold">MyCourse</span>
          <span className="text-blue-600 text-4xl font-extrabold">
            Evaluation
          </span>
        </div>
        <BsFillPencilFill fontSize={24} />
      </Link>
      {/* Top Right Corner */}
      <div className="flex gap-4 items-center">
        <button className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Light Mode
        </button>
        <Link to="/about" className="text-black hover:underline">
          About
        </Link>
        <Link to="/request-school" className="text-black hover:underline">
          Request School
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
