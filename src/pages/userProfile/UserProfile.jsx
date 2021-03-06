import React, { useEffect, useState } from 'react'
import Rightbar from "../../components/rightbar/Rightbar";
import LanguageIcon from '@material-ui/icons/Language';
import { PersonAdd } from '@material-ui/icons';
import "./userProfile.css"
import { useParams } from 'react-router';
import axios from '../../axios-users';
import Topbar from '../../components/topbar/Topbar';

export default function UserProfile({userdata}) {
    const [userInfo, setuserInfo] = useState({
        name: "",
        designation: "",
        email: "",
        city: "",
        state: "",
        zip: "",
        website: "",
        friendCount: ""
    })
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/${id}`).then(data => {

            setuserInfo({
                name: data.data.name,
                designation: data.data.designation,
                email: data.data.email,
                city: data.data.city,
                state: data.data.zip,
                website: data.data.website,
                friendCount: data.data.friends.length
            })

        }).catch(err => {
            console.log(err)
        })
    }, [id])
    const onAddFriendHandler = () => {
        axios.put(`/${id}/addfriend`).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
        <Topbar data={userdata}/>
        <div className="userContainer">
            <div className="userProfile">
                <div className="userBanner">

                </div>
                <div className="userProfileInfo">
                    <img src="" alt="" />
                    <h2>{userInfo.name}</h2>
                    <p>{userInfo.designation}</p>
                    <p>{userInfo.email}</p>
                    <ul className="userDetails">
                        <li className="userDetailsItem">{userInfo.city}</li>
                        <li className="userDetailsItem">{userInfo.state}</li>
                        <li className="userDetailsItem">{userInfo.zip}</li>
                        <li className="userDetailsItem">{userInfo.friendCount} friends</li>
                    </ul>
                </div>
                <div className="userProfileAction">
                    <button className="addFriend" onClick={() => onAddFriendHandler()}>
                        <span className="addFriendItem">
                            <PersonAdd /> <span>Add Friend</span>
                        </span>
                    </button>
                    <button className="visitWebsite">
                        <span className="visitWebsiteItem">
                            <a href={userInfo.website} target="_blank">  <LanguageIcon /><span>Visit Website</span>
                            </a>
                        </span>
                    </button>
                </div>
            </div>
            <div className="suggestions">
                <Rightbar />
            </div>
        </div>
        </>
    )
}
