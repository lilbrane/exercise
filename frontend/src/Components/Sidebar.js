import React, { useEffect, useState } from 'react'
import axios from "axios"

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

    const select = (user) => {
        console.log(user)
        setSelected(user)
    }

  return (
    <div className='sidebar w-1/4 h-screen p-4 border-r bg-syyclopsBlue text-white overflow-y-auto'>
        <p className='text-syyclopsOrange font-semibold my-6 mb-10 text-4xl'>Users</p>
        <div>
            {
                users.map((user) => (
                    <div key={user.id} className='userDiv border-syyclopsOrange rounded-xl border p-4 text-2xl my-4 hover:bg-syyclopsLightBlue transition duration-300 whitespace-nowrap overflow-hidden' onClick={()=> {select(user)}}>
                    {/* <div key={user.id} className='userDiv rounded-xl p-4 text-2xl my-4 hover:bg-syyclopsLightBlue ' onClick={()=> {select(user)}}> */}
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
  )
}

export default Sidebar