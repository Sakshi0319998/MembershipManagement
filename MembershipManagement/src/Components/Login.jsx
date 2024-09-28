// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate}from 'react-router-dom'

const login = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, setValues]= useState({
        
            email: "",
            password: ""
        })
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error,setError] = useState(null);
        axios.defaults.withCredentials = true;
    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin',values)
        .then(result => {
            if(result.data.loginStatus){
                useNavigate()('/dashboar')

            }else{
                setError(result.data.Error)
            }
         
    })
    
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-45 border loginForm'>
            <div className='text-danger' >
                {error & error}

            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' autoComplete='off' placeholder='Enter Email'
                   onChange={(e)=> setValues({...values,email: e.target.value})} className='form-control rounded-0'/>
                   
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' autoComplete='off' placeholder='Enter password'
                      onChange={(e)=> setValues({...values,password: e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                <div className='mb-1'>
                    <input type="checkbox" name="tick" id="tick" className='me-2'/>
                    <label htmlFor="password">You agree with terms & conditions</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default login