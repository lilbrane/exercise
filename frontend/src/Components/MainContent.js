import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit,FaEdit } from "react-icons/fa";

const MainContent = ({user}) => {
    const [editing, setEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);
    const [editHover, setEditHover] = useState(false)
    const [emailErr, setEmailErr] = useState("")

    useEffect(() => {
        setCurrentUser(user);
        setEditing(false);
        setEmailErr("")

    }, [user]);

    

    const saveChanges = async() => {
        if(emailErr != "") return

        try {
            const response = await axios.put(`https://dummyjson.com/users/${currentUser.id}`, {...currentUser})
            
            setCurrentUser(response.data)
            setEditing(false);

        } catch (err) {
            console.error(`ERROR in updating user - ${err.message}`)
        }
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const checkEmail = () => {

        if (!isValidEmail(currentUser.email)) {
            setEmailErr("Please enter a valid email address.");
        } else {
            setEmailErr("");
        }
    };

  return (
    
    <div className='w-3/4 h-screen p-4 border-r text-syyclopsBlue overflow-y-auto flex'>
        <div className='mx-auto border-syyclopsOrange w-3/4 p-10 rounded-3xl border-8'>
            {
                currentUser != null ?
                    <>
                       <p className={`text-xl my-auto mx-auto font-bold ${editing ? 'animate-pulse' : 'invisible'}`}>EDITING</p>

                        <div className='text-5xl font-bold flex'>
                            
                            <p>User {currentUser.id} info</p>
                          
                            <div className='ml-auto mr-10 relative'
                                onClick={() => setEditing(!editing)}
                                onMouseEnter={() => setEditHover(true)} 
                                onMouseLeave={() => setEditHover(false)}>
                                <FaRegEdit 
                                    className={`text-syyclopsLightBlue icon-transition absolute transition-opacity duration-300 ${editHover ? 'opacity-0 scale-100' : 'opacity-100 scale-100'}`} 
                                    size={50} 
                                />
                                <FaEdit 
                                    className={`text-syyclopsBlue icon-transition absolute transition-opacity duration-300 ${editHover ? 'opacity-100 scale-100' : 'opacity-0 scale-100'}`} 
                                    size={50} 
                                />
                            </div>

                        </div>
                        <div className='grid grid-cols-3 gap-4 text-2xl font-semibold mt-10'>
                            <p className='col-span-1 p-2'>Name:</p>
                            {editing ? (
                                <div className='flex col-span-2'>
                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full'  value={currentUser.firstName} onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}/>
                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full'  value={currentUser.lastName} onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}/>
                                </div>
                            ) : (
                                <div className='flex col-span-2 space-x-8'> 
                                    <span className='p-2'>{currentUser.firstName}</span>
                                    <span className='p-2'>{currentUser.lastName}</span>
                                </div>
                            )}

                            <p className='col-span-1 p-2'>Age:</p>
                            {editing ? (
                                <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 col-span-2' value={currentUser.age} 
                                onChange={(e) => {
                                    // check if input is positive number between 0 and 120 (lower limit could be raised in irl scenario) 
                                    const newAge = e.target.value;
                                    if ((/^[0-9]+$/.test(newAge) && Number(newAge) > 0 && Number(newAge) <= 120) || newAge === "")
                                        setCurrentUser({ ...currentUser, age: newAge });
                                }
                                    
                                }/>
                            ) : (
                                <span className='p-2 col-span-2'>{currentUser.age}</span>
                            )}

                            <p className='col-span-1 p-2'>Gender:</p>
                            {editing ? (
                                <div className='col-span-2 flex justify-between mx-10 overflow-hidden'>
                                    <div className='space-x-2'>
                                        <input type="radio" id="male" name="gender" value="male" 
                                            checked={currentUser.gender === "male"} 
                                            onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
                                            />
                                        <label htmlFor="male">male</label>
                                    </div>

                                    <div className='space-x-2'>
                                        <input type="radio" id="female" name="gender" value="female" 
                                            checked={currentUser.gender === "female"}
                                            onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value})}
                                            />
                                        <label htmlFor="female">female</label>
                                    </div>

                                    <div className='space-x-2'>
                                        <input type="radio" id="other" name="gender" value="other" 
                                            checked={currentUser.gender === "other"} 
                                            onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value})}
                                            />
                                        <label htmlFor="other">other</label>
                                    </div>
                                </div>
                            ) : (
                                <span className='p-2 col-span-2'>{currentUser.gender}</span>
                            )}
                             {/* <input  className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 col-span-2' value={currentUser.gender} onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })} /> */}

                            <p className='col-span-1 p-2'>Email:</p>
                            {editing ? (
                                <div className='col-span-2'>
                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full' value={currentUser.email} 
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                                    onBlur={() => checkEmail()}
                                    />
                                    {emailErr !== "" && <p className="text-red-500 text-lg">{emailErr}</p>}

                                </div>


                            ) : (
                                <span className='p-2 col-span-2 whitespace-nowrap overflow-hidden'>{currentUser.email}</span>
                            )}

                            <p className='col-span-1 p-2'>Phone number:</p>
                            {editing ? (
                                <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 col-span-2' value={currentUser.phone} 
                                onChange={(e) => {
                                    // regex for phone number, allowed + in front, and dashes and spaces in middle
                                    const newPhoneNum = e.target.value;
                                    if (/^\+?[0-9\s()-]*$/.test(newPhoneNum) || newPhoneNum === "")
                                        setCurrentUser({ ...currentUser, phone: newPhoneNum });
                                }} />
                            ) : (
                                <span className='p-2 col-span-2 whitespace-nowrap overflow-hidden'>{currentUser.phone}</span>
                            )}
                        </div>

                        {editing && 
                        <div className="flex place-content-center mt-8">
                            <button className='bg-green p-3 text-white text-xl rounded-lg hover:scale-105 hover:transition-all' onClick={() => saveChanges()}>Save changes</button>
                        </div>
                        }
                    </>
                :

                <div className='text-4xl font-bold flex justify-center'>
                    <div>
                        <p>No selected user</p>
                        <p className='text-2xl'>select a user from the list</p>
                    </div>
                </div>
            }
        </div>

    </div>
  )
}

export default MainContent