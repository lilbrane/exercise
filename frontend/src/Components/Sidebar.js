import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../syyclopsLogo.png';
import Dropdown from 'react-dropdown';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Sidebar = ({ setSelected, updatedUser  }) => {
    const [users, setUsers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('id');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // chould be in env
    // const api_url = process.env.REACT_APP_API_URL
    const api_url = "http://127.0.0.1:8000"

    // user dropdown options
    const sortOptions = [
        { value: 'id', label: 'Id' },
        { value: 'fName', label: 'Name' },
        { value: 'lName', label: 'Last name' },
    ];

    // called when Sidebar is loaded, gets users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${api_url}/users?limit=20`);
                setUsers(response.data.users);
            } catch (err) {
                console.error(`ERROR in fetching users - ${err.message}`);
            }
        };

        fetchUsers();
    }, []);

    // when changing the sortBy options in the dropdown, makes a call to backend with sortBy value in query
    const changeOrder = async (selectedOption) => {
        try {
            const response = await axios.get(`${api_url}/users?limit=20&sortBy=${selectedOption.value}`);
            setSelectedOrder(selectedOption.label);
            setUsers(response.data.users);
        } catch (err) {
            console.error(`ERROR in fetching users - ${err.message}`);
        }
    };

    // close sidebar automatically if its small screen width and set selected user
    const changeSelectedUser = (usr) => {
        setSelected(usr);
        setIsSidebarOpen(false)
    }

    // when sidebar gets updated user from mainContent, filter it out
    useEffect(() => {
        if (updatedUser) {
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
            );
        }
    }, [updatedUser]);

    return (
        <div className="relative flex  sm:w-1/4">
            {/* Button for bringing out sidebar, visible when screen width is for small devices */}
            <button
                className={`z-20 absolute left-0 p-1 bg-syyclopsOrange text-white sm:hidden rounded-r-xl ${isSidebarOpen ? '' : 'translate-x-0'}`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <IoIosArrowBack size={30} /> : <IoIosArrowForward size={30} />}
            </button>

            {/* sidebar */}
            <div className={`z-10 sidebar fixed top-0 left-0 h-screen bg-syyclopsBlue text-white overflow-y-auto transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:relative`}
            >
                <div className="flex justify-center sticky top-0 bg-syyclopsBlue py-6 z-50">
                    <img src={logo} alt="logo" className="my-auto w-3/5 md:w-4/5 lg:w-3/5" />
                </div>
                <div className="px-4">
                    <div className=" justify-between">

                        <p className="text-syyclopsOrange font-semibold text-lg md:text-2xl lg:text-3xl">Users</p>

                        <div className="flex md:space-x-0 lg:space-x-2 space-x-2 my-auto mt-2 z-30">
                            <p className="text-sm md:text-base">Sort by: </p>
                            <Dropdown className="border border-syyclopsOrange px-2 rounded-lg z-40" options={sortOptions} onChange={changeOrder} value={selectedOrder} menuClassName="dropdown-menu "/>
                        </div>

                    </div>
                    <div>
                        {/* msg if no users were reciev from server */}
                        {users.length === 0 ? (
                            <div className="flex justify-center text-lg mt-4">
                                <p>No users found</p>
                            </div>
                        ) : (
                            // otherwise map them out
                            users.map((user) => (
                                <div
                                    key={user.id}
                                    className="userDiv border-syyclopsOrange rounded-xl border p-4 text-base md:text-lg lg:text-xl my-4 hover:bg-syyclopsLightBlue transition duration-300 whitespace-nowrap overflow-hidden"
                                    onClick={() => { changeSelectedUser(user) }}
                                >
                                    <div className="mainInfo sm:flex lg:flex  md:inline-block w-full font-semibold">
                                        <div className=" font-bold">{user.id}</div>
                                        <div className="flex mx-auto">
                                            <p className="mr-1 lg:mr-4 ">{user.firstName}</p>
                                            <p className="">{user.lastName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
