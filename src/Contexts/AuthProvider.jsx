import axios from 'axios';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loader,setLoader]=useState(true);
    const [search, setSearch]=useState("")
    const createUser=(email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth
            ,email,password)
    }

    const LoginUser=(email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const LogOutUser=()=>{
        setLoader(true)
        return signOut(auth);
    }

    const updateUser=(updatedData)=>{
        return updateProfile(auth.currentUser,updatedData);
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            // if(currentUser?.email){
            //     axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{email: currentUser?.email}).then(res=>
            //         localStorage.setItem('token',res.data.token))
            // }
            
            setLoader(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const userInfo={
       createUser,
       LoginUser,
       user,
       loader,
       LogOutUser,
       updateUser,
       setUser,
       search,
       setSearch
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;