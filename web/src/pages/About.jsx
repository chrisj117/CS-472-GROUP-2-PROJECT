const About = () => {
  return (
    <div className="flex flex-col items-center py-6 h-screen w-screen">
      {/* Top of page: Navbar (see components/Navbar.jsx) */}
      {/* Middle of page: "About" content */}
      <h1 className="w-6/12 text-xl font-extrabold mb-4">Example header</h1>
      <p className="w-6/12 text-m mb-8">
        Example text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h1 className="w-6/12 text-xl font-extrabold mb-4">Example header</h1>
      <p className="w-6/12 text-m mb-8">
        Example text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h1 className="w-6/12 text-xl font-extrabold mb-4">Example header</h1>
      <p className="w-6/12 text-m mb-8">
        Example text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      
      {/* Bottom of page: Return home button*/}
      <div className="py-6">
        <button className="rounded-lg bg-blue-600 px-5 py-3 text-md font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring"
                type="button">
                Return to home
        </button>
      </div>
    </div>
  )
}
export default About