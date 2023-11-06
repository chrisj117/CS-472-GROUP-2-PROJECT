import { Link } from 'react-router-dom';
import { BsSun } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';

const Navbar = () => {
  return (
    <header className="bg-white text-black py-6 px-10 flex justify-between items-center border-b-2 border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div>
          <span className="text-black text-4xl font-extrabold">MyCourse</span>
          <span className="text-blue-600 text-4xl font-extrabold">
            Evaluation
          </span>
        </div>
        <MdSchool fontSize={36} />
      </Link>
      {/* Top Right Corner */}
      <div className="flex gap-6 items-center">
        <button className="text-black px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 border-2 border-gray-300">
          <div className="flex gap-2 items-center">
            <span className="">Light Mode</span> <BsSun fontSize={21} />
          </div>
        </button>
        <Link to="/about" className="text-black hover:underline text-lg">
          About
        </Link>
        <Link
          to="/request-school"
          className="text-black hover:underline text-lg"
        >
          Request School
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
