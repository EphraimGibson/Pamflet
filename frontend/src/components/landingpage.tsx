import React from 'react'
import Navbar from './navbar'
import myImage from '../assets/20250727_1501_Disorganized Wall Flashcards_simple_compose_01k15kfz5yfjat1c1ksrra7q56.png'
import About from './about'
import Footer from './footer'

function landingpage() {
  return (
    <>
        <Navbar showSidebarToggle={false} />
        <div className='w-full h-screen pt-1'>
        <div className='textstructure mt-52 px-20'>
            {["memorise anything", "with interactive", "flashcards"].map((text, index) => (<div key={index} className='flex w-fit'>
                {index === 2 && (
                    <div className='w-[9.5vw] h-[3.5vw] relative top-[0.7vw] mr-2 rounded-xl'>
                        <img
                            src={myImage}
                            alt="decorative"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                )}
                <h1 className='flex items-center text-[5vw] font-bold text-[#2E2E2E] uppercase leading-none tracking-tighter'>
                    {text.split(' ').map((word, i, arr) => ( 
                        <span key={i} className={i < arr.length - 1 ? 'mr-2 text-[#81D2C7]' : ''}>
                            {word}
                        </span>
                    ))}
                </h1>
            </div>
            ))}
        </div>

            <div className='border-t-[1px] border-[#2E2E2E] mt-[28vh] flex justify-between items-center py-5 px-20'>
                <div className="text-lg tracking-tight text-[#2E2E2E] uppercase leading-none border-2 rounded-full p-5 hover:border-4 transition-all duration-250 ease-in-out cursor-pointer" onClick={() => { window.location.href = '/target-route';
                }}>
                    Get started now
                </div>
                {["Study", "Share"].map((action, index) => (
                    <p key={action} // Always add a key when mapping in React!
                        className='text-md tracking-tight text-[#2E2E2E] uppercase leading-none font-bold'>
                        {action}
                    </p>
                ))}
            </div>
        </div>
        <About/>
        <Footer/>
    </>
    
  )
}

export default landingpage