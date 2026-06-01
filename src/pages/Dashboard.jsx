import { useState, useEffect } from "react";

function Dashboard() {
  const [task, setTask] = useState("");
  const [stage, setStage] = useState("Todo");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task) return;

    const newTask = {
      id: Date.now(),
      text: task,
      stage,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateStage = (id, newStage) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, stage: newStage } : t
      )
    );
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <input
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      >
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button onClick={addTask}>Add Task</button>

      {tasks.map((item) => (
        <div key={item.id} className="task">
          <h3>{item.text}</h3>

          <select
            value={item.stage}
            onChange={(e) =>
              updateStage(item.id, e.target.value)
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button onClick={() => deleteTask(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;