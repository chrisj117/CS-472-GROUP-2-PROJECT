import Navbar from '../components/Navbar';
import ReturnHome from '../components/ReturnHome';

const NotFound = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-94px)] items-center">
        <h2 className="mt-8 text-3xl font-bold text-center">404</h2>
        <p className="text-center mt-64">
          The page you have requested cannot be found.
        </p>
        <div className="flex flex-col items-center w-screen">
          <ReturnHome />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
