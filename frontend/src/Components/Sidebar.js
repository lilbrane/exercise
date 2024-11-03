import React, { useEffect, useState } from 'react'
import axios from "axios"
import logo from "../syyclopsLogo.png"
import Dropdown from 'react-dropdown';

const Sidebar = ({ setSelected }) => {
    const [users, setUsers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("id")

    const sortOptions = [
        { value: 'id', label: 'Id' },
        { value: 'fName', label: 'Name' },
        { value: 'lName', label: 'Last name' },
    ];

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                // process.env.REACT_APP_WEB_API_URL
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?limit=20`)

                setUsers(response.data.users)
            } catch (err) {
                console.error(`ERROR in fetching users - ${err.message}`)
            }
        }

        fetchUsers();
    }, [])

    const changeOrder = async(selectedOption) => {
        try {
            console.log(selectedOption)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?limit=20&sortBy=${selectedOption.value}`)
            setSelectedOrder(selectedOption.label)
            setUsers(response.data.users)
        } catch (err) {
            console.error(`ERROR in fetching users - ${err.message}`)
        }
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
                    <Dropdown className='border border-syyclopsOrange px-2 rounded-lg' options={sortOptions} onChange={changeOrder} value={selectedOrder} menuClassName="dropdown-menu"/>

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