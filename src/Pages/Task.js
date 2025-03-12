import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Filter out users with role "admin"
      const filteredUsers = res.data.filter(user => user.role === "user");
      setUsers(filteredUsers);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
        alert("You can only upload up to 3 files.");
        return;
    }
    setFiles(selectedFiles);
};

const addTask = async (e) => {
  e.preventDefault();
  try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("priority", priority);
      formData.append("due_date", dueDate);
      formData.append("assigned_to", assignedTo);

      // Append files correctly
      for (let i = 0; i < files.length; i++) {
          formData.append("attached_documents", files[i]); // Use same name as backend multer expects
      }

      await axiosInstance.post("/tasks", formData, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setAssignedTo("");
      setFiles([]);
      fetchTasks();
  } catch (err) {
      console.error("Error adding task:", err);
  }
};

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Tasks</h2>
      <form onSubmit={addTask} className="mb-3">
        <input className="form-control mb-2" type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="form-control mb-2" placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select className="form-control mb-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input className="form-control mb-2" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        
        <select className="form-control mb-2" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Assign to User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.email}</option>
          ))}
        </select>

        <input type="file" className="form-control mb-2" multiple onChange={handleFileChange} />

        <button className="btn btn-primary w-100" type="submit">Add Task</button>
      </form>

      <ul className="list-group mt-3">
        {tasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task._id}>
            <div>
              <strong>{task.title}</strong> - {task.priority} | Assigned to: {task.assigned_to?.email || "Unassigned"}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
