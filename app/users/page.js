"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch,useSelector } from 'react-redux'
import { fetchUsers,setPage, removeUser } from '@/store/userSlice'
import Pagination from '@/components/pagination'
// import { useRouter } from 'next/router'


const page = () => {
  const [loading,setLoading] = useState(true)
  const router = useRouter()
  let searchParams = useSearchParams()
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users.users)
  const totalPages = useSelector((state)=>state.users.totalPages)
  const currentPage = Number(searchParams.get("page")) || 1; 
  useEffect(()=>{

    async function getData(){
      try {
       dispatch(fetchUsers(currentPage))
      } catch (error) {
        console.log(error);
        
      }
      finally{
        setLoading(false)
      }
    }
    
    getData()
  },[currentPage,dispatch])
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(removeUser(id));
    }
  };
  const handleChange= (page)=>{
    router.push(`/users?page=${page}`);
    dispatch(setPage(page));
  }
  return (
    <>
    <section className='py-2'>
    <div className='wrapper w-[80%] bg-[rgba(0,0,0,0.28)] flex flex-col items-center mx-auto p-4 gap-2 rounded-lg backdrop-blur-md text-white max-sm:w-[90%]'>
      <h1 className=' text-center font-black'> List of all the present users</h1>
      <table className='users w-[100%] mx-auto  border-collapse border-spacing-[20px] max-sm:border-spacing-0  max-sm:w-[100%]' >
      {/* cellPadding={'20'} cellSpacing={"10"} */}
        <thead className=''>
          <tr className='max-sm:py-4'>
            <th className=' p-[10px] max-sm:p-2'>S/n</th>
            <th className=' p-[10px] max-sm:p-2'>Avatar</th>
            <th className=' p-[10px] max-sm:p-2'>Fullname</th>
            <th className=' p-[10px] max-sm:p-2 hidden md:table-cell'>Email</th>
            <th className=' p-[10px] max-sm:p-2 hidden md:table-cell'> Take Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading? (<div role="status" className='flex items-center'>
              <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-[#fff]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span> Getting users' info
          </div>):
          (
            <>
            {
              users.map((eachData,index)=>(
                <>
                <tr key={index}>
                  <td  className=' p-[10px] max-sm:p-2'>{eachData.id}</td>
                  <td className=' flex items-center justify-center p-[20px] max-sm:p-2'><Image src={eachData.avatar} alt={eachData.first_name}  width={100} height={100} className=' rounded-full max-sm:w-[50px]'/></td>
                  <td  className=' p-[10px] max-sm:p-2'> 
                    <div>
                  <h1>{eachData.first_name}</h1>
                  <h1>{eachData.last_name}</h1>
                    </div></td>
                  <td  className=' p-[10px] hidden md:table-cell'>{eachData.email}</td>
                  <td  className=' p-[10px] hidden md:table-cell'><button className=' bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition duration-100 max-md:px-4' onClick={() => handleDelete(eachData.id)} 
                  >Delete User</button></td>
                </tr>
                <tr className='md:hidden border ' key={index+1}>
                <td colSpan="3" className="border p-2 ">
                <span className="block"><strong>Email:</strong> {eachData.email}</span>
                <span className="block"><strong>Take Action:</strong> <button className=' bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition duration-100 max-sm:px-3 max-sm:py-1' onClick={() => handleDelete(eachData.id)} 
                  >Delete User</button></span>
                </td>
                </tr>
                </>
              ))
            }
            </>
          )
          }
          
        </tbody>
        {
          loading === false ?
        <tfoot>
          <tr><td colSpan={"5"} className=' p-[10px]'><button className=' bg-[#1de01d] text-white px-8 py-4 rounded-full hover:bg-[#2fe82f] transition duration-100 max-sm:py-2' onClick={()=>{router.push("/add-user")}}
          > <span className=' font-black'>+</span> Add new user </button></td></tr>
        </tfoot>:""
        }
      </table>


    </div>
    </section>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleChange} />
    </>
  )
}

export default page
