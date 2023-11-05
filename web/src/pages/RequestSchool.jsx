import Searchbar from '../components/Searchbar';
import { BsFillEnvelopePaperFill } from 'react-icons/bs';

const RequestSchool = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 mt-8">Request School</h2>
      <div className="w-full flex flex-col items-center gap-4">
        {/* Check if your school is already here */}
        <div className="mb-4 flex flex-col w-full">
          <p className="mb-4 text-xl text-center">
            <span className="font-bold text-blue-600">Wait!</span> Check if your
            school is already here:
          </p>
          <Searchbar
            searchingSchools={true}
            searchPlaceholder="Ex: University of Nevada, Las Vegas / UNLV"
            className="w-full mb-8"
          />
        </div>
        {/* Request a School Form */}
        {/* <h2 className="text-xl font-semibold mb-4">Request a School Form</h2> */}

        <div className="flex flex-col gap-3 w-full">
          <div className="mb-4">
            <p className="mb-4 text-center text-xl">
              If you can&apos;t find your institution above, submit your
              school&apos;s information below!
            </p>
            <label className="flex flex-col gap-1">
              Enter School Name
              <input
                type="text"
                placeholder="Ex: University of Nevada Las Vegas"
                className="px-4 py-2 w-full border-2 rounded"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-1">
              Enter School Address
              <input
                type="text"
                placeholder="Ex: 4505 S Maryland Pkwy, Las Vegas, NV 89154"
                className="px-4 py-2 w-full border-2 rounded"
              />
            </label>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
          <span>Submit School</span> <BsFillEnvelopePaperFill />
        </button>
      </div>
    </div>
  );
};
export default RequestSchool;
