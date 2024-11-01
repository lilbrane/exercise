import React, { useEffect, useState } from 'react'
import axios from "axios"
import logo from "../syyclopsLogo.png"
import Dropdown from 'react-dropdown';

const Sidebar = ({ setSelected }) => {
    const [users, setUsers] = useState([]);

    const options = [
        'name', 'last name', "id"
    ];
      const defaultOption = options[0];

    useEffect(() => {
        
        const fetchUsers = async() => {
            try {
                // const response = await axios.get("https://dummyjson.com/users?limit=20")
                const response = await axios.get("http://127.0.0.1:8000/users?limit=20")

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
    <div className='sidebar w-1/4 h-screen  border-r bg-syyclopsBlue text-white overflow-y-auto '>
        <div className='flex justify-center sticky top-0 bg-syyclopsBlue p-4 mt-0 '>
            <img src={logo} alt="logo" className=' my-auto w-1/2' />
        </div>
        <div className='px-4'>
            <div className='flex justify-between'>

                <p className='text-syyclopsOrange font-semibold text-3xl'>Users</p>
                <div className='flex space-x-2 my-auto'>
                    <p className=''>Sort by: </p>
                    <Dropdown className='border border-syyclopsOrange px-2 rounded-lg' options={options} onChange={console.log("select")} value={defaultOption} placeholder="Select an option" menuClassName="dropdown-menu"/>

                </div>
            </div>
            <div>
                { users.length == 0 ? 
                    <div className='flex justify-center text-lg mt-4'>
                        <p>No users found</p>
                    </div>

                    :
                    users.map((user) => (
                        <div key={user.id} className='userDiv border-syyclopsOrange rounded-xl border p-4 text-2xl my-4 hover:bg-syyclopsLightBlue transition duration-300 whitespace-nowrap overflow-hidden' onClick={()=> {setSelected(user)}}>
                        <div className='mainInfo flex w-full font-semibold'>
                            <p className='mr-4'>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <div className='mr-5 ml-auto'>
                                <p>{user.id}</p>
                            </div>
                        </div>
        
                    </div>
                    ))
                }
            
            </div>
        </div>
    
    </div>
  )
}

export default Sidebar