const RequestSchool = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="mx-4 md:mx-8 lg:mx-16">
        {/* Check if your school is already here */}
        <div className="mb-8">
          <p className="font-semibold mb-4">Check if your school is already here:</p>
          <input 
            type="text" 
            placeholder="Search School" 
            className="p-3 w-full border rounded bg-gray-200 text-black mb-8"
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

        <button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          Submit School
        </button>
      </div>
    </div>       
  );
};
export default RequestSchool;
