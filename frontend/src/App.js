import { useState } from "react";
import MainContent from "./Components/MainContent";
import Sidebar from "./Components/Sidebar";

function App() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState(null); 

  // called when editing is saved and send changes user to the sidebar
  const updateSelectedUser = (updatedUserData) => {
    setSelectedUser(updatedUserData);
    setUpdatedUser(updatedUserData);
  };

  return (
    <div className="flex items-center h-screen w-full">
      < Sidebar setSelected={setSelectedUser} updatedUser={updatedUser}/>
      < MainContent user={selectedUser} updateUser={updateSelectedUser}/>
    </div>
  );
}

export default App;
