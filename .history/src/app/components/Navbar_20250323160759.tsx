import React from 'react'
import SplitText from './SplitText'
const Navbar = () => {
  return (
    <nav className='w-full  absolute top-0  p-10 flex justify-between items-center'>
        <img src="./logo.png" className='scale-75'/>
        <ul className='flex gap-10 '>
              <li><SplitText
                  text="My Bookings"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
              /></li>
              <li><SplitText
                  text="Help"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
              /></li>
              <li><SplitText
                  text="Live Train Status"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
              /></li>
              

        </ul>
        
          <button
              className="cursor-pointer group relative bg-white hover:bg-zinc-300 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12"
          >
              <div className="relative flex items-center justify-center gap-2">
                  <span className="relative inline-block overflow-hidden">
                      <span
                          className="block transition-transform duration-300 group-hover:-translate-y-full"
                      >
                          Login
                      </span>
                      <span
                          className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                      >
                          Now Now
                      </span>
                  </span>

                  <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                      viewBox="0 0 24 24"
                  >
                      <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                      <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2"
                          stroke="white"
                          d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                      ></path>
                  </svg>
              </div>
          </button>

        
    </nav>
  )
}

export default Navbar
