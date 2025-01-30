"use client"
import React from 'react'

const pagination = ({totalPages,currentPage,onPageChange}) => {


  return (
    <div >
        <div 
        className={'link text-center bg-[rgba(255,255,255,0.28)]  flex w-1/5 mx-auto  backdrop-blur-md  justify-center gap-5 py-2 my-2 max-sm:w-[30%]'}
        >
          {
            [...Array(totalPages)].map((_,index)=>{
              const pageNum = index+1
              const isActive = currentPage === pageNum;
              return (
                <button key={pageNum}  className={isActive ? " bg-black px-3 text-yellow-300 font-bold" : "text-white"}
                 onClick={()=> onPageChange(pageNum)}>
                    {pageNum}
                </button>)
              })
              }

        </div>
    </div>
  )
}

export default pagination
