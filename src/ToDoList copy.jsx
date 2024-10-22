import React, { useState, useEffect } from 'react'

function ToDoList(){



    const [user, setUser] = useState(null);  // Logged-in user state
    const [username, setUsername] = useState('');  // Input field for username
    const [password, setPassword] = useState('');  // Input field for password
  

    const[tasks,setTasks] = useState(["eat", "walk the dog"]);
    const[newTasks, setNewTask] = useState("");


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));  // Get the user object from localStorage
        if (savedUser) {
          setUser(savedUser.username);  // Set the user if found in localStorage
        }
      }, []);

     const handleLogin = (e) => {
        e.preventDefault();
        
        // Retrieve stored user credentials from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
    
        // Check if entered username and password match the stored ones
        if (storedUser && storedUser.username === username && storedUser.password === password) {
          setUser(storedUser.username);  // Log in the user by setting the user state
        } else {
          alert('Invalid username or password');
        }
      };
      const handleSignup = (e) => {
        e.preventDefault();
    
        if (username && password) {
          // Create a user object
          const newUser = {
            username: username,
            password: password,
          };
    
          // Store the user object in localStorage
          localStorage.setItem('user', JSON.stringify(newUser));
    
          setUser(username);  // Log in the user after signing up
        } else {
          alert('Please enter both a username and password');
        }
      };

      const handleLogout = () => {
        setUser(null);  // Clear the user state
      };


    function handleInputChange(event){
            setNewTask(event.target.value)
    }

    function addTask(){
        
        if(newTasks.trim() !== ""){
            setTasks(t => [...tasks, newTasks]);
            setNewTask("")
        }
    }

    function deleteTask(index){
        
        const updatedTasks = tasks.filter( (_ , i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskup(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskdown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    

    return (
        <Router>
          <div>
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </nav>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="/" element={
                user ? (
                  <div>
                    <h2>Welcome, {user}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                    {/* To-do list section */}
                    <div className="to-do-list">
                      <h1>To-Do List</h1>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter a Task"
                          value={newTasks}
                          onChange={handleInputChange}
                        />
                        <button className="add-button" onClick={addTask}>Add</button>
                      </div>
                      <ol>
                        {tasks.map((task, index) => (
                          <li key={index}>
                            <span className="text">{task}</span>
                            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                            <button className="move-button" onClick={() => moveTaskup(index)}>Up</button>
                            <button className="move-button" onClick={() => moveTaskdown(index)}>Down</button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2>Home</h2>
                    <p>Please log in or sign up.</p>
                  </div>
                )
              } />
            </Routes>
          </div>
        </Router>
            );
      
//     return(
//             <div>
//               {/* If no user is logged in, show the login and signup forms */}
//               {!user ? (
//                 <div>
//                   <h2>Login</h2>
//                   <form onSubmit={handleLogin}>
//                     <input
//                       type="text"
//                       placeholder="Enter username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                       type="password"
//                       placeholder="Enter password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button type="submit">Login</button>
//                   </form>
          
//                   <h2>Signup</h2>
//                   <form onSubmit={handleSignup}>
//                     <input
//                       type="text"
//                       placeholder="Create username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                       type="password"
//                       placeholder="Create password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button type="submit">Signup</button>
//                   </form>
//                 </div>
//             ) : (
//                 <div className="to-do-list">
//                   <h1>To-Do List</h1>
          
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Enter a Task"
//                       value={newTasks}
//                       onChange={handleInputChange}
//                     />
          
//                     <button className="add-button" onClick={addTask}>
//                       Add
//                     </button>
//                   </div>
          
//                   <ol>
//                     {tasks.map((task, index) => (
//                       <li key={index}>
//                         <span className="text">{task}</span>
//                         <button className="delete-button" onClick={() => deleteTask(index)}>
//                           Delete
//                         </button>
//                         <button className="move-button" onClick={() => moveTaskup(index)}>
//                           Up
//                         </button>
//                         <button className="move-button" onClick={() => moveTaskdown(index)}>
//                           Down
//                         </button>
//                       </li>
//                 ))}
//                   </ol>
//                 </div>
//             )}
//             </div>
//           );
          
// }

export default ToDoList