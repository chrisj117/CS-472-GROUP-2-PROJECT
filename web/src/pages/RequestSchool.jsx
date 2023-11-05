import Searchbar from '../components/Searchbar';
import { BsFillEnvelopePaperFill } from 'react-icons/bs';

const RequestSchool = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 mt-8">Request School</h2>
      <div className="">
        {/* Check if your school is already here */}
        <div className="mb-8">
          <p className="font-semibold mb-4">
            Check if your school is already here:
          </p>
          <Searchbar
            searchingSchools={true}
            searchPlaceholder="Ex: University of Nevada, Las Vegas / UNLV"
            className="w-full"
          />
        </div>
        {/* Request a School Form */}
        <h2 className="text-xl font-semibold mb-4">Request a School Form</h2>

        <div className="mb-4">
          <label className="block mb-2">Enter School Name</label>
          <input
            type="text"
            placeholder="Ex: University of Nevada Las Vegas"
            className="p-2 w-full border-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Enter School Address</label>
          <input
            type="text"
            placeholder="Ex: 4505 S Maryland Pkwy, Las Vegas, NV 89154"
            className="p-2 w-full border-2 rounded"
          />
        </div>

        <button className="bg-blue-600 text-white p-2 w-full rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
          <span>Submit School</span> <BsFillEnvelopePaperFill />
        </button>
      </div>
    </div>
  );
};
export default RequestSchool;
