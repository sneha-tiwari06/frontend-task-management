import React, { useEffect, useState } from "react";
import {axiosInstance, FILE_BASE_URL, } from "../utils/axiosInstance";


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/tasks", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="container mt-5">
      <h2>Task Dashboard</h2>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(task.due_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {task.assigned_to?.email || "Unassigned"}
            </p>

            {task.attached_documents && task.attached_documents.length > 0 && (
              <div>
                <strong>Attachments:</strong>
                <ul>
                  {task.attached_documents.map((file, index) => {
                    const fileUrl = `${FILE_BASE_URL}${file.replace(/\\/g, "/")}`;
                                       
                    return (
                      <li key={index}>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File {index + 1}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
