import React from 'react'

function about() {
  return (
    <>
        <div className='w-full py-20 bg-[#e2e2e2] border-1 border-[#2e2e2e] rounded-tl-4xl rounded-tr-3xl -mt-[1.5vw]'>
            <h1 className='px-9 w-[60%]'>
                <span className='text-[4vw] font-medium text-[#4e4e4e] leading-none tracking-tight'>
                    Create, study, and share smart flashcards with rich formatting.<br></br>
                    Your learning, your way
                </span>
            </h1>
            <div className='flex gap-5 w-full border-t-[1px] border-[#7E7E7E] mt-20'>
                <div className='w-1/3'>
                    <button className='m-8 flex uppercase gap-10 items-center px-10 py-6 mt-10 rounded-full text-zinc-200 bg-[#2e2e2e]'>
                        About us
                        <div className='w-2 h-2 bg-zinc-200 rounded-full'></div>
                    </button>
                </div>
                <div className='flex justify-center items-center w-2/3 h-[70vh] m-[5vw] p-10 tetx-zinc-900 text-[2vw] rounded-4xl border-2 text-[#6e6e6e]'>
                Pamflet was built with one goal in mind—helping learners absorb and retain knowledge more effectively.
                Whether you are preparing for exams, learning a language, or organizing your ideas, Pamflet adapts to your workflow.
                </div>
            </div>
        </div>
    </>
  )
}

export default about