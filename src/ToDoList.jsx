import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';  // Separate Login Component
import Signup from './Signup';  // Separate Signup Component

function ToDoList({user}){



    // const [user, setUser] = useState(null);  // Logged-in user state
    // const [username, setUsername] = useState('');  // Input field for username
    // const [password, setPassword] = useState('');  // Input field for password
  

    const[tasks,setTasks] = useState(["eat", "walk the dog"]);
    const[newTasks, setNewTask] = useState("");


    // useEffect(() => {
    //     const savedUser = JSON.parse(localStorage.getItem('user'));  // Get the user object from localStorage
    //     if (savedUser) {
    //       setUser(savedUser.username);  // Set the user if found in localStorage
    //     }
    //   }, []);

    //  const handleLogin = (e) => {
    //     e.preventDefault();
        
    //     // Retrieve stored user credentials from localStorage
    //     const storedUser = JSON.parse(localStorage.getItem('user'));
    
    //     // Check if entered username and password match the stored ones
    //     if (storedUser && storedUser.username === username && storedUser.password === password) {
    //       setUser(storedUser.username);  // Log in the user by setting the user state
    //     } else {
    //       alert('Invalid username or password');
    //     }
    //   };
    //   const handleSignup = (e) => {
    //     e.preventDefault();
    
    //     if (username && password) {
    //       // Create a user object
    //       const newUser = {
    //         username: username,
    //         password: password,
    //       };
    
    //       // Store the user object in localStorage
    //       localStorage.setItem('user', JSON.stringify(newUser));
    
    //       setUser(username);  // Log in the user after signing up
    //     } else {
    //       alert('Please enter both a username and password');
    //     }
    //   };

    //   const handleLogout = () => {
    //     setUser(null);  // Clear the user state
    //   };


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

    


        return(
            <div>
                {user ? (
                    <div className="to-do-list">
                    <h1>To-Do List</h1>
                    {/* <button className="logoutButton" onClick={handleLogout}>Logout</button> */}
            
                    <div>
                        <input
                        type="text"
                        placeholder="Enter a Task"
                        value={newTasks}
                        onChange={handleInputChange}
                        />
            
                        <button className="add-button" onClick={addTask}>
                        Add
                        </button>
                    </div>
            
                    <ol>
                        {tasks.map((task, index) => (
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                            </button>
                            <button className="move-button" onClick={() => moveTaskup(index)}>
                            Up
                            </button>
                            <button className="move-button" onClick={() => moveTaskdown(index)}>
                            Down
                            </button>
                        </li>
                    ))}
                    </ol>
                    </div>
                        ) : (<ul></ul>

                        )}
            </div>
        );
            
        

        }

export default ToDoList