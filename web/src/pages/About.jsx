const About = () => {
  return (
    <div className="grid h-screen place-items-center">
      {/* Top of page: Navbar (see components/Navbar.jsx) */}
      {/* Middle of page: "About" content */}
      
      

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