import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit,FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = ({user, updateUser }) => {
    const [editing, setEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);
    const [originalUser, setOriginalUser] = useState(user);
    const [editHover, setEditHover] = useState(false)

    const [emailErr, setEmailErr] = useState("")
    const [phoneErr, setPhoneErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [ageErr, setAgeErr] = useState("")

    // used for updatiung mainContent user info and setting editing to false when changing user in sidebar
    useEffect(() => {
        setCurrentUser(user);
        setOriginalUser(user);
        setEditing(false);
        setEmailErr("")

        resetErrors();
    }, [user]);

    
    // saving editing changes
    const saveChanges = async() => {
        // if email not correct exit function
        if(emailErr !== "" || phoneErr !== "" || nameErr !== "" || ageErr !== "") return

        try {
            // const response = await axios.put(`https://dummyjson.com/users/${currentUser.id}`, {...currentUser})
            // process.env.REACT_APP_API_URL
            const response = await axios.put(`http://127.0.0.1:8000/users/${currentUser.id}`, {...currentUser})
            
            setCurrentUser(response.data)
            setEditing(false);
            // sending updated user to sidebar
            updateUser(response.data);

            toast.success("User updated successfully", {
                autoClose: 2000, 

            });

        } catch (err) {
            console.error(`ERROR in updating user - ${err.message}`)
            
            toast.error("Error updating user!", {
                autoClose: 2000,
            });
        }
    }

    // regex for testing email
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const checkEmail = () => { setEmailErr( !isValidEmail(currentUser.email) ? "Please enter a valid email address." : "")};
    const checkAge = () => { setAgeErr( currentUser.age === "" ? "Please provide your age." : "")};
    const checkName = () => { 
        let errMsg = ""
        if(currentUser.firstName === "" || currentUser.lastName === "") 
            errMsg = "Please enter your first and last name."
        else if(currentUser.firstName.length > 20 || currentUser.lastName.length > 20)
            errMsg = "Name and last name can't be over 20 letters."

        setNameErr(errMsg)
    };
    const checkPhone = () => { setPhoneErr( currentUser.phone === "" ? "Please provide your phone number." : "")};

    const resetErrors = () => {
        setEmailErr("")
        setNameErr("")
        setPhoneErr("")
        setAgeErr("")
    }

    const cancelEditing = () => {
        setCurrentUser(originalUser)
        setEditing(false)
        resetErrors()
    }

  return (
    
    <div className='w-full md:w-3/4 min-h-screen p-4 border-r text-syyclopsBlue overflow-y-auto my-auto flex '>
        <div className='mx-auto border-syyclopsOrange w-full md:w-3/4 p-4 md:p-6 lg:p-10 rounded-3xl border-8 center'>
            {
                currentUser != null ?
                    <>
                    {/* pulsing info text when editing */}
                       <p className={`text-base md:text-xl my-auto mx-auto font-bold  ${editing ? 'animate-pulse' : 'invisible'}`}>EDITING</p>

                        <div className='text-2xl md:text-4xl lg:text-5xl font-bold flex'>
                            
                            <p>User {currentUser.id}. info</p>
                          
                          {/* editing logo button, when hovered icon change to filled version */}
                          { !editing &&

                              <div className='ml-auto mr-10 relative'
                              onClick={() => setEditing(!editing)}
                              onMouseEnter={() => setEditHover(true)} 
                              onMouseLeave={() => setEditHover(false)}>
                                <FaRegEdit 
                                        className={`text-syyclopsLightBlue icon-transition absolute transition-opacity duration-300 ${editHover ? 'opacity-0 scale-100' : 'opacity-100 scale-100'} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16`} 
                                        
                                        />
                                <FaEdit 
                                        className={`text-syyclopsLightBlue icon-transition absolute transition-opacity duration-300 ${editHover ? 'opacity-100 scale-100' : 'opacity-0 scale-100'} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16`} 
                                        />
                            </div>
                        }

                        </div>

                        {/* Infor fields */}
                        <div className='grid grid-cols-3 gap-4 text-xl md:text-2xl font-semibold mt-10 '>
                            {/* name and last name together, when editing mode changed to inputs */}
                            <p className='col-span-3 lg:col-span-1 px-2 md:p-2 font-bold text-syyclopsLightBlue'>Name:</p>
                            {editing ? (
                                <div className='col-span-3 lg:col-span-2'>
                                    <div className='md:flex '>
                                        <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full'  value={currentUser.firstName} onChange={(e) => {
                                            const value = e.target.value;
                                            // only letters
                                            if (/^[A-Za-z]*$/.test(value) || value === "")
                                                setCurrentUser({ ...currentUser, firstName: value });
                                            }
                                        }
                                        onBlur={checkName}/>
                                        <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full'  value={currentUser.lastName} onChange={(e) => {
                                            const value = e.target.value;
                                            // only letters
                                            if (/^[A-Za-z]*$/.test(value) || value === "")
                                                setCurrentUser({ ...currentUser, lastName: value });
                                            }}
                                         onBlur={checkName}
                                         />
                                    </div>
                                    {nameErr !== "" && <p className="text-red-500 text-lg">{nameErr}</p>}

                                </div>

                            ) : (
                                <div className='flex col-span-3 lg:col-span-2 ml-5 lg:ml-0 space-x-2 lg:space-x-8'> 
                                    <span className='p-2'>{currentUser.firstName}</span>
                                    <span className='p-2'>{currentUser.lastName}</span>
                                </div>
                            )}

                            {/*  age can only be between 0 and 120 */}
                            <p className='col-span-3 lg:col-span-1 px-2 md:p-2 text-syyclopsLightBlue font-bold '>Age:</p>
                            {editing ? (
                                <div className='col-span-3 lg:col-span-2'>

                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full' value={currentUser.age} type='text'
                                    onChange={(e) => {
                                        // check if input is positive number between 0 and 120 (lower limit could be raised in irl scenario) 
                                        const newAge = e.target.value;
                                        if ((/^[0-9]+$/.test(newAge) && Number(newAge) > 0 && Number(newAge) <= 120) || newAge === "")
                                            setCurrentUser({ ...currentUser, age: newAge });
                                    }}
                                    onBlur={checkAge}
                                    />

                                    {ageErr !== "" && <p className="text-red-500 text-lg">{ageErr}</p>}
                                </div>

                                
                            ) : (
                                <span className='p-2 col-span-3 lg:col-span-2 ml-5 lg:ml-0'>{currentUser.age}</span>
                            )}

                            {/* radio button of three options  */}
                            <p className='col-span-3 lg:col-span-1 px-2 md:p-2 text-syyclopsLightBlue font-bold'>Gender:</p>
                            {editing ? (
                                <div className='col-span-3 lg:col-span-2 lg:flex justify-between mx-2 lg:mx-10 overflow-hidden'>
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
                                <span className='p-2 col-span-3 lg:col-span-2 ml-5 lg:ml-0'>{currentUser.gender}</span>
                            )}

                            {/* email field, with email validation check */}
                            <p className='col-span-3 lg:col-span-1 px-2 md:p-2 text-syyclopsLightBlue font-bold'>Email:</p>
                            {editing ? (
                                <div className='col-span-3 lg:col-span-2'>
                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full' value={currentUser.email} 
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                                    onBlur={() => checkEmail()}
                                    />
                                    {emailErr !== "" && <p className="text-red-500 text-lg">{emailErr}</p>}
                                </div>

                            ) : (
                                <span className='p-2 col-span-3 lg:col-span-2 whitespace-nowrap overflow-hidden ml-5 lg:ml-0'>{currentUser.email}</span>
                            )}

                            <p className='col-span-3 lg:col-span-1 px-2 md:p-2 text-syyclopsLightBlue font-bold'>Phone number:</p>
                            {editing ? (
                                <div className='col-span-3 lg:col-span-2'>

                                    <input className='border rounded border-syyclopsLightBlue border-opacity-30 p-2 w-full' value={currentUser.phone} 
                                    onChange={(e) => {
                                        // regex for phone number, allowed + in front, and dashes and spaces in middle
                                        const newPhoneNum = e.target.value;
                                        if (/^\+?[0-9\s()-]*$/.test(newPhoneNum) || newPhoneNum === "")
                                            setCurrentUser({ ...currentUser, phone: newPhoneNum });
                                    }} 
                                    onBlur={checkPhone}
                                    />
                                    {phoneErr !== "" && <p className="text-red-500 text-lg">{phoneErr}</p>}

                                </div>

                            ) : (
                                <span className='p-2 col-span-3 lg:col-span-2 whitespace-nowrap overflow-hidden ml-5 lg:ml-0'>{currentUser.phone}</span>
                            )}
                        </div>

                        {editing && 
                        <div className="flex place-content-center mt-8 space-x-4">
                            <button className='bg-green p-3 text-white text-xl rounded-lg hover:scale-105 hover:transition-all' onClick={() => saveChanges()}>Save changes</button>
                            <button className='bg-red-500 p-3 text-white text-xl rounded-lg hover:scale-105 hover:transition-all' onClick={() => cancelEditing()}>Cancel</button>
                        </div>

                        
                        }
                    </>
                :
                // Message when no users selected
                <div className='text-4xl font-bold flex justify-center'>
                    <div>
                        <p>No selected user</p>
                        <p className='text-2xl'>select a user from the list</p>
                    </div>
                </div>
                
            }
            
        <ToastContainer hideProgressBar={true} />
            
        </div>
    </div>
  )
}

export default MainContent