import Navbar from "../components/Navbar";
import ReturnHome from "../components/ReturnHome";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <p className="text-center mt-60">
        The page you have requested cannot be found.
      </p>
      <div className="flex flex-col items-center py-6 h-screen w-screen">
        <ReturnHome />
      </div>
    </div>
  );
};

export default NotFound;
