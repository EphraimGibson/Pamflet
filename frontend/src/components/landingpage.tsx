import React from 'react'
import Navbar from './navbar'
import myImage from '../assets/20250727_1501_Disorganized Wall Flashcards_simple_compose_01k15kfz5yfjat1c1ksrra7q56.png'
import About from './about'
import Footer from './footer'
import { useNavigate } from 'react-router-dom';

function landingpage() {
  const navigate = useNavigate();

  return (
    <>
        <Navbar showSidebarToggle={false} />
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#e0f7fa] via-[#f8fafc] to-[#e0f2f1] overflow-hidden">
          {/* Decorative SVG background */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10 z-0" viewBox="0 0 1440 320"><path fill="#81D2C7" fillOpacity="1" d="M0,160L60,176C120,192,240,224,360,229.3C480,235,600,213,720,197.3C840,181,960,171,1080,176C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

          <div className="z-10 flex flex-col items-center mt-40 animate-fade-in">
            <h1 className="text-[5vw] font-extrabold text-gray-900 uppercase leading-none tracking-tighter drop-shadow-lg text-center bg-gradient-to-r from-[#81D2C7] via-[#2E2E2E] to-[#81D2C7] bg-clip-text text-transparent animate-gradient-x">
              Memorise anything<br/>
              <span className="text-[#2E2E2E]">with interactive</span><br/>
              <span className="inline-flex items-center">flashcards
                <img src={myImage} alt="decorative" className="w-[7vw] h-[2.5vw] ml-3 rounded-xl shadow-lg animate-bounce"/>
              </span>
            </h1>
            <div className="mt-12 flex flex-col items-center">
              <button
                className="text-xl md:text-2xl px-10 py-4 rounded-full bg-gradient-to-r from-[#81D2C7] to-[#2E2E2E] text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out animate-fade-in"
                onClick={() => navigate('/signup')}
              >
                Get started now
              </button>
              <div className="flex gap-8 mt-6">
                {['Study', 'Share'].map((action) => (
                  <span key={action} className="text-lg md:text-xl font-semibold text-[#2E2E2E] bg-white/70 px-4 py-2 rounded-full shadow animate-fade-in">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <About/>
        <Footer/>
    </>
    
  )
}

export default landingpage