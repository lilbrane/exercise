import React, { useEffect, useState } from 'react'
import axios from "axios"
import logo from "../syyclopsLogo.png"

const Sidebar = ({ setSelected }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        const fetchUsers = async() => {
            try {
                const response = await axios.get("https://dummyjson.com/users?limit=20")
                console.log(response.data.users)

                setUsers(response.data.users)
            } catch (err) {
                console.error(`ERROR in fetching users - ${err.message}`)
            }
        }

        fetchUsers();
    }, [])

  return (
    <div className='sidebar w-1/4 h-screen  border-r bg-syyclopsBlue text-white overflow-y-auto '>
        <div className='flex justify-center sticky top-0 bg-syyclopsBlue p-4 mt-0 '>
            <img src={logo} alt="logo" className=' my-auto w-1/2' />
        </div>
        <div className='px-4'>

            <p className='text-syyclopsOrange font-semibold  text-3xl'>Users</p>
            <div>
                {
                    users.map((user) => (
                        <div key={user.id} className='userDiv border-syyclopsOrange rounded-xl border p-4 text-2xl my-4 hover:bg-syyclopsLightBlue transition duration-300 whitespace-nowrap overflow-hidden' onClick={()=> {setSelected(user)}}>
                        <div className='mainInfo flex w-full font-semibold'>
                            <p className='mr-4'>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <div className='mr-5 ml-auto'>
                                <p>{user.id}</p>
                            </div>
                        </div>
                        
                        {/* <div className='secondInfo flex mt-2 text-base text-gray-400'>
                            <p className='mr-4'>Age: {user.age}</p>
                            <p>Gender: {user.gender}</p>
                        </div>
        
                        <div className='contactInfo flex mt-3 space-x-6 text-lg'>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                        </div> */}
        
                    </div>
                    ))
                }
            
            </div>
        </div>
    
    </div>
  )
}

export default Sidebar