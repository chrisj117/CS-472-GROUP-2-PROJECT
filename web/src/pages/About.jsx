const About = () => {
  return (
    //<div>About</div>
    <div>About

      <div>
        
        {/* Additional comment box + post button */}
        <div className="flex justify-center items-center w-full min-h-screen bg-white">
          <div>
            <textarea placeholder="Add additional comments..." className="p-2 focus:outline-1 focus:outline-blue-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-[60vw]"></textarea>
            <div className="flex justify-end">
              <button className="text-sm font-semibold absolute bg-blue-500 hover:bg-blue-600 w-fit text-white py-2 rounded px-3">Post</button>
            </div>
          </div>
        </div>

        {/* Review button */}
        <div className="flex justify-center items-center w-full min-h-screen bg-white">
          <a href="#" className="rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 text-md font-medium text-white transition focus:outline-none focus:ring">
            Review
          </a>
        </div>

        {/* Professor dropdown */}
        <div className="flex justify-center items-center w-full min-h-screen bg-white">
          <div className="relative inline-flex self-center">
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
            <svg className="text-white bg-slate-500 absolute top-0 right-0 m-2 pointer-events-none p-2 rounded" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 38 22" version="1.1">
              <g id="ZahnhelferDE—Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="ZahnhelferDE–Icon&amp;Asset-Download" transform="translate(-539.000000, -199.000000)" fill="#ffffff" fill-rule="nonzero">
                  <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                    <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"/>
                  </g>
                </g>
              </g>
            </svg>

              <select className="text-2xl font-semibold rounded border-2 border-blue-500 h-14 w-60 pl-5 pr-10 bg-white focus:outline-none appearance-none">
                <option>Dr.Professor</option>
                <option>Dr.Example</option>
              </select>
          </div>
        </div>


      </div>

    </div>
  )
}
export default About