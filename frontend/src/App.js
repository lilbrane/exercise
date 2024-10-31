import { useState } from "react";
import MainContent from "./Components/MainContent";
import Sidebar from "./Components/Sidebar";

function App() {
  const [selectedUser, setSelectedUser] = useState(null)

  
  return (
    <div className="flex items-center h-screen w-full">
      < Sidebar setSelected={setSelectedUser}/>
      < MainContent user={selectedUser}/>
    </div>
  );
}

export default App;
