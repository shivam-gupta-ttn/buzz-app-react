import React,{useState, useEffect} from 'react'
import { Redirect, Route } from 'react-router';
import axios from '../axios-users';
  
  
function ProtectedRoute({component:Component,...rest}) {
    const [isAuthenticated, setisAuthenticated] = useState(null)
    const [user, setuser] = useState(null)
    useEffect(() => {
       
        axios.get("http://localhost:5500/api/auth/check").then(data=>{
        if(data.status === 200){
            // console.log(data)
            setisAuthenticated(true)
            setuser(data.data)
        }else{
            setisAuthenticated(false)
        }
        }).catch(err=>{
            setisAuthenticated(false)
        })
    }, [isAuthenticated])
    if(isAuthenticated===null){
        return "loading";
    }
    console.log("protected",user)
    return (
        <Route {...rest} render={props=> isAuthenticated ? (
            <Component {...props} userdata={user}/>
          ) : <Redirect to="/login"/> } />
    )
}

export default ProtectedRoute
