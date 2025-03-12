import { useEffect } from "react";
import UserData from "./components/UserData";
import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users"); 
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="app-container">
      <h1 className="app-title">User Directory</h1>
      {users.length > 0 ? (
        <div className="users-flex-container">
        {users.map((user) => (
          <UserData 
            key={user.id} 
            name={user.name} 
            email={user.email} 
            company={user.company.name} 
          />
        ))}
      </div>
      ) : (
        <p>Loading users...</p>
        )
      }
    </div>
  );
}
export default App;
