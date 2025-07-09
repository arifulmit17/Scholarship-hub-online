import React, { use, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';

const Register = () => {
    const navigate=useNavigate();
    const {createUser,updateUser,setUser, user}=use(AuthContext)
    const [showpassword, setShowpassword]=useState(false)
    const provider=new GoogleAuthProvider()

    const handleGoogleSignIn=()=>{
      console.log('signed in');
      signInWithPopup(auth,provider).then(result=>{
        console.log(result);
        Swal.fire({
            title: "Sign in successful",
            icon: "success",
            draggable: true
});
        
      }).catch(error=>{
        console.log(error);
      })
    }

    const handleRegister=e=>{
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form)

         const userData = Object.fromEntries(
        formData.entries()
        )
        const { email, password, name, photo }=userData
        
        Swal.fire({
            title: "Registration successful",
            icon: "success",
            draggable: true
        });
        
        createUser(email,password)
         .then(result=>{
             console.log(result)
             axios.post(`${import.meta.env.VITE_API_URL}/users`,userData).then(res=>{console.log(res.data)
                if(res.data.insertedId){
                                Swal.fire({
                                        title: "Data added to users collection successfully!",
                                        icon: "success",
                                        draggable: true
                        });
                        }
        }).catch(error=>{
            console.log(error);
        })
            updateUser({displayName: name, photoURL : photo}).then(()=>{
              setUser({...user,displayName: name, photoURL : photo})
            }).catch(error=>{
              console.log(error);
              setUser(user)
            })

            navigate('/')

          }
            
          ).catch(error=>{
            console.log(error);
          })
    }
    return (
        <div className='max-w-sm rounded-2xl mx-auto'>
          
          <h1 className='font-bold text-4xl my-5'>Please,Register Now !</h1>

            <form className='' onSubmit={handleRegister} >

              {/* Google Login */}
              <div className="my-6 space-y-4">
		<button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
			<p>Login with Google</p>
		</button>
		
	</div>
  <div className="flex items-center w-full my-4">
		<hr  className="w-full dark:text-gray-600" />
		<p className="px-3 dark:text-gray-600">OR</p>
		<hr  className="w-full dark:text-gray-600" />
	</div>
              {/* Username */}
               <input type="text" name='name' placeholder="Username " className="input w-full" />
               {/* PhotoUrl */}
               <input type="url" placeholder="https://"  name='photo' className="input w-full" />
               {/* Email input */}
               <input name='email' type="email" placeholder="mail@site.com" required className="input w-full" />
                {/* Password input  */}
                <div className='relative'>
                <input type={showpassword ? 'text' : 'password'} name='password' required placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="input w-full" />
                
                <button onClick={()=>{setShowpassword(!showpassword)}} className='btn btn-xs absolute bottom-2 right-4 '>
                {
                showpassword ? <FaEyeSlash /> : <FaEye />
                }
                </button>
                   
                </div>
              
        {/* Submit */}
        <br />
        <button type='submit' className='btn text-white w-full bg-gray-400'>Submit</button>
            </form>
        <h1 className='text-center '>Already registered, go to <NavLink to={'/login'} className={'font-bold hover:underline'}> login page</NavLink></h1>
        </div>
    );
};

export default Register;