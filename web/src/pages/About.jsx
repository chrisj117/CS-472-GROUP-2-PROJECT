const About = () => {
  return (
    //<div>About</div>
    <div>About

      <div>
        {/* Additional comment box + post button */}
        <div class="flex justify-center items-center w-full min-h-screen bg-white">
          <div>
            <textarea placeholder="Add additional comments..." class="p-2 focus:outline-1 focus:outline-blue-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-[60vw]"></textarea>
            <div class="flex justify-end">
              <button class="text-sm font-semibold absolute bg-blue-500 hover:bg-blue-600 w-fit text-white py-2 rounded px-3">Post</button>
            </div>
          </div>
        </div>

        {/* Review button */}
        <a href="#" className="rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 text-md font-medium text-white transition focus:outline-none focus:ring">
          Review
        </a>

        {/* Professor dropdown */}
        

      </div>

    </div>
  )
}
export default About