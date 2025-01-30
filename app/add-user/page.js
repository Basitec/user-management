"use client"
import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Head from "next/head";
import {addUser, fetchUsers,createUser} from '@/store/userSlice'
import { useDispatch } from 'react-redux'

const metadata = {
  title: "Add a new user",
  description: "A simple user management app",
};
const page = () => {
    const apiUrl = 'https://reqres.in/api/users';
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter()
    const [loading, setLoading] = useState(false); 
    const dispatch = useDispatch()
    const formik = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
      },
      validationSchema: Yup.object({
        firstname: Yup.string()
         .required('*Firstname is required*')
         .min(2, 'Firstame must be at least 2 characters long'),
        lastname: Yup.string()
         .required('*Lastname is required*')
         .min(2, 'Lastname must be at least 2 characters long'),
        email: Yup.string()
         .email('Invalid email address')
         .required('*Email is required*'),
      }),
      onSubmit: async (values, actions) => {
        
        try {
          console.log(values);
          
          const newUser = {
            id: Date.now(),
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
           
          }
          
          const response = await axios.post(apiUrl,newUser)
          dispatch(createUser(newUser));
          dispatch(fetchUsers())
          if(response.status == 201){
            setSuccessMessage("User created successfully! Redirecting...");
            
            setTimeout(()=>{
              router.push('/users')
            },2000)
          }
        } catch (err) {
            if (err.response) {
                // Handle API errors
                setError(err.response.data.message || "Something went wrong.");
              } else {
                // Handle network or other errors
                setError("Failed to connect to the server. Please try again.");
              }
        }
      },
    })
  return (
    <>
    <Head>
      <title>Add new User</title>
    </Head>
    <section 
    className='bg-[#00000095] w-[100%] h-[100vh] bg-[url("/bgImage3.jpg")] bg-center bg-cover bg-no-repeat bg-blend-darken mx-auto p-8 flex flex-col gap-6 justify-center items-center'
    >
      <div className="wrapper w-[50%] bg-[rgba(0,0,0,0.28)] flex flex-col items-center p-4 gap-2 rounded backdrop-blur-md max-sm:w-[90%]">
      <h1 className=' text-center text-[#fff] font-bold text-xl '>Sign Up  to be part of our users</h1>
      {successMessage &&<> <div className='text-white'>{successMessage}</div> <div role="status" className='flex items-center'>
              <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-[#fff]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div> </>}
        <form action="" onSubmit={formik.handleSubmit} className=' grid grid-cols-2 items-center gap-4 w-[90%]'>
        <div className='flex flex-col gap-2  transition-all'>
        <label htmlFor="firstname" className=' text-lg text-[#fff]'>Firstname:</label>
        <input type="text" className="input w-[100%] p-2" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
        {formik.errors.firstname && formik.touched.firstname ? <p className='text-[#f00] '>{formik.errors.firstname}</p>: ''}
        </div>
        <div className='flex flex-col gap-2'>
        <label htmlFor="lastname" className='text-lg text-[#fff]'>Lastname</label>
        <input type="text" name="lastname"  className="input p-2 w-[100%]" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
        {formik.errors.lastname && formik.touched.lastname ? <p className="text-[#f00]">{formik.errors.lastname}</p>: ''}
        </div>
        <div className=' col-start-1 col-end-3 flex flex-col gap-2 text-[#fff]'>
        <label htmlFor="email" className=' text-lg'>Email:</label>
        <input type="email" id="email" name="email"  className="input p-2 w-[100%]" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  required />
        {formik.errors.email && formik.touched.email ? <p className="text-[#f00]">{formik.errors.email}</p>: ''}
        </div>
        <button type="submit" className='  bg-[#1de01d] py-2 text-white rounded-lg hover:bg-[#2fe82f] transition duration-100 col-start-1 col-end-3'>Sign Up</button>
      </form>
      </div>
    </section>
    </>
  )
}

export default page
