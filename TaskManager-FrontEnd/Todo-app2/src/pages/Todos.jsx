// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// export default function Todos() {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [targetDate, setTargetDate] = useState('');
//   const [error, setError] = useState('');
//   const { user } = useAuth();
//   const [priority, setPriority] = useState('MEDIUM');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterPriority, setFilterPriority] = useState('ALL');
//   const [filterCompleted, setFilterCompleted] = useState('ALL');
//   const [formErrors, setFormErrors] = useState({});
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [editData, setEditData] = useState({ task: '', targetDate: '', priority: 'MEDIUM' });

//   const api = axios.create({
//     baseURL: 'http://localhost:8080/api/todos',
//     headers: { Authorization: `Bearer ${user.token}` }
//   });

//   const utcToLocalDateTime = (utcDate) => {
//   if (!utcDate) return '';
//   const date = new Date(utcDate);
//   const localISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
//   return localISO.slice(0, 16); // 'YYYY-MM-DDTHH:mm'
// };

//   const localToUTCDateTime = (localDateStr) => {
//   if (!localDateStr) return '';
//   const local = new Date(localDateStr);
//   const timezoneOffset = local.getTimezoneOffset();
//   const utc = new Date(local.getTime() - timezoneOffset * 60000); // offset in ms
//   return utc.toISOString().replace(/\.\d{3}Z$/, '');
// };

//   useEffect(() => {
//     fetchTodos();
//   }, [searchQuery, filterPriority, filterCompleted]);

//   const validateForm = () => {
//     const errors = {};
//     if (!newTodo.trim()) errors.task = 'Task is required';
//     if (!targetDate) errors.targetDate = 'Target date is required';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const fetchTodos = async () => {
//     try {
//       const response = await api.get('/search', {
//         params: {
//           query: searchQuery,
//           priority: filterPriority === 'ALL' ? null : filterPriority,
//           completed: filterCompleted === 'ALL' ? null : filterCompleted === 'true'
//         }
//       });
//       const safeTodos = response.data.map(todo => ({
//         ...todo,
//         priority: todo.priority || 'MEDIUM'
//       }));
//       setTodos(safeTodos);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch todos. Please try again later.');
//     }
//   };

//   const addTodo = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     try {
//       const formattedTargetDate = localToUTCDateTime(targetDate);
//       await api.post('', {
//         task: newTodo,
//         targetDate: formattedTargetDate,
//         priority: priority.toUpperCase(),
//         completed: false,
//       });
//       setNewTodo('');
//       setTargetDate('');
//       setPriority('MEDIUM');
//       setFormErrors({});
//       fetchTodos();
//     } catch (err) {
//       setError('Failed to add todo. Please try again.');
//     }
//   };

//   const toggleTodo = async (id, currentCompleted) => {
//     try {
//       const todoToUpdate = todos.find(todo => todo.id === id);
//       const updatedTodo = {
//         ...todoToUpdate,
//         completed: !currentCompleted,
//         completionDate: !currentCompleted ? new Date().toISOString().replace(/\.\d{3}Z$/, '') : null,
//       };
//       await api.put(`/${id}`, updatedTodo);
//       fetchTodos();
//     } catch (err) {
//       setError('Failed to update todo.');
//     }
//   };

//   const startEdit = (todo) => {
//     setEditingTodo(todo.id);
//     setEditData({
//       task: todo.task,
//       targetDate: utcToLocalDateTime(todo.targetDate),
//       priority: todo.priority || 'MEDIUM'
//     });
//   };

//   const updateTodo = async (id) => {
//   try {
//     const formattedEditData = {
//       ...editData,
//       targetDate: editData.targetDate ? localToUTCDateTime(editData.targetDate) : null,
//     };
//     await api.put(`/${id}`, formattedEditData);
//     setEditingTodo(null);
//     fetchTodos();
//   } catch (err) {
//     setError('Failed to update todo.');
//   }
// };

//   const deleteTodo = async (id) => {
//     try {
//       await api.delete(`/${id}`);
//       fetchTodos();
//     } catch (err) {
//       setError('Failed to delete todo.');
//     }
//   };

//   return (
//     <div className="min-h-screen w-full px-4 py-6 bg-gradient-to-br from-indigo-200 via-purple-100 to-sky-100">
//       <h1 className="text-4xl font-bold text-center text-purple-800 mb-6 drop-shadow animate-fade-in">📋 Your Todos</h1>

//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 animate-pulse">{error}</div>}

//       <div className="flex flex-wrap gap-4 mb-6 justify-center animate-slide-up">
//         <input type="text" placeholder="Search todos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-400" />
//         <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
//           <option value="ALL">All Priorities</option>
//           <option value="HIGH">High</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="LOW">Low</option>
//         </select>
//         <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
//           <option value="ALL">All Statuses</option>
//           <option value="true">Completed</option>
//           <option value="false">Pending</option>
//         </select>
//       </div>

//       <form onSubmit={addTodo} className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-in">
//         <input type="text" placeholder="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="px-3 py-2 rounded border border-gray-300 w-full sm:w-auto" />
//         <input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="px-3 py-2 rounded border border-gray-300 w-full sm:w-auto" />
//         <select value={priority} onChange={(e) => setPriority(e.target.value)} className="px-3 py-2 rounded border border-gray-300">
//           <option value="HIGH">High</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="LOW">Low</option>
//         </select>
//         <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">Add Todo</button>
//       </form>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
//         {todos.map(todo => (
//           <div key={todo.id} className={`p-4 rounded-xl shadow-md bg-white border-l-4 ${todo.completed ? 'border-green-400' : 'border-purple-400'} hover:scale-[1.01] transition-all`}>
//             {editingTodo === todo.id ? (
//               <form onSubmit={(e) => { e.preventDefault(); updateTodo(todo.id); }} className="space-y-2">
//                 <input type="text" value={editData.task} onChange={(e) => setEditData({ ...editData, task: e.target.value })} className="w-full px-3 py-2 border rounded" required />
//                 <input type="datetime-local" value={editData.targetDate} onChange={(e) => setEditData({ ...editData, targetDate: e.target.value })} className="w-full px-3 py-2 border rounded" required />
//                 <select value={editData.priority} onChange={(e) => setEditData({ ...editData, priority: e.target.value })} className="w-full px-3 py-2 border rounded">
//                   <option value="HIGH">High</option>
//                   <option value="MEDIUM">Medium</option>
//                   <option value="LOW">Low</option>
//                 </select>
//                 <div className="flex gap-2">
//                   <button type="submit" className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
//                   <button type="button" onClick={() => setEditingTodo(null)} className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-lg font-semibold text-purple-800">{todo.task}</h3>
//                   <span className={`text-xs font-medium px-2 py-1 rounded bg-${todo.priority?.toLowerCase()}-100 text-${todo.priority?.toLowerCase()}-800`}>
//                     {todo.priority}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">📅 {new Date(todo.targetDate).toLocaleString()}</p>
//                 {todo.completionDate && <p className="text-xs text-green-600">✅ Completed on {new Date(todo.completionDate).toLocaleString()}</p>}
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   <button onClick={() => toggleTodo(todo.id, todo.completed)} className="flex-1 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm">
//                     {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
//                   </button>
//                   <button onClick={() => startEdit(todo)} className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">Edit</button>
//                   <button onClick={() => deleteTodo(todo.id)} className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterCompleted, setFilterCompleted] = useState("ALL");
  const [filterExpired, setFilterExpired] = useState("ALL");
  const [formErrors, setFormErrors] = useState({});
  const [editingTodo, setEditingTodo] = useState(null);
  const [editData, setEditData] = useState({
    task: "",
    targetDate: "",
    priority: "MEDIUM",
  });

  const { user } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:8080/api/todos",
    headers: { Authorization: `Bearer ${user.token}` },
  });

  const utcToLocalDateTime = (utcDate) => {
    if (!utcDate) return "";
    const date = new Date(utcDate);
    const localISO = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    return localISO.slice(0, 16);
  };

  const localToUTCDateTime = (localDateStr) => {
    if (!localDateStr) return "";
    const local = new Date(localDateStr);
    const timezoneOffset = local.getTimezoneOffset();
    const utc = new Date(local.getTime() - timezoneOffset * 60000);
    return utc.toISOString().replace(/\.\d{3}Z$/, "");
  };

  const getMinDateTime = () => {
    const now = new Date(Date.now() + 60000); // 1 minute from now
    const localISO = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();
    return localISO.slice(0, 16);
  };

  const isExpired = (todo) => {
    return !todo.completed && new Date(todo.targetDate) < new Date();
  };

  const validateForm = () => {
    const errors = {};
    if (!newTodo.trim()) errors.task = "Task is required";
    if (!targetDate) errors.targetDate = "Target date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchTodos = async () => {
    try {
      const response = await api.get("/search", {
        params: {
          query: searchQuery,
          priority: filterPriority === "ALL" ? null : filterPriority,
          completed:
            filterCompleted === "ALL" ? null : filterCompleted === "true",
        },
      });

      let todos = response.data.map((todo) => ({
        ...todo,
        priority: todo.priority || "MEDIUM",
      }));

      if (filterExpired === "EXPIRED") {
        todos = todos.filter((todo) => isExpired(todo));
      } else if (filterExpired === "ACTIVE") {
        todos = todos.filter((todo) => !isExpired(todo));
      }

      setTodos(todos);
      setError("");
    } catch (err) {
      setError("Failed to fetch todos. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [searchQuery, filterPriority, filterCompleted, filterExpired]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (new Date(targetDate) <= new Date()) {
      setError("Target date/time must be in the future.");
      return;
    }

    try {
      const formattedTargetDate = localToUTCDateTime(targetDate);
      await api.post("", {
        task: newTodo,
        targetDate: formattedTargetDate,
        priority: priority.toUpperCase(),
        completed: false,
      });
      setNewTodo("");
      setTargetDate("");
      setPriority("MEDIUM");
      setFormErrors({});
      fetchTodos();
    } catch (err) {
      setError("Failed to add todo. Please try again.");
    }
  };

  const toggleTodo = async (id, currentCompleted) => {
    const todo = todos.find((t) => t.id === id);
    if (isExpired(todo)) {
      setError("Cannot complete an expired task.");
      return;
    }

    try {
      const updatedTodo = {
        ...todo,
        completed: !currentCompleted,
        completionDate: !currentCompleted
          ? new Date().toISOString().replace(/\.\d{3}Z$/, "")
          : null,
      };
      await api.put(`/${id}`, updatedTodo);
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo.");
    }
  };

  const startEdit = (todo) => {
    if (isExpired(todo)) {
      setError("Cannot edit an expired todo.");
      return;
    }
    setEditingTodo(todo.id);
    setEditData({
      task: todo.task,
      targetDate: utcToLocalDateTime(todo.targetDate),
      priority: todo.priority || "MEDIUM",
    });
  };

  const updateTodo = async (id) => {
    if (new Date(editData.targetDate) <= new Date()) {
      setError("Edited target date must be in the future.");
      return;
    }
    try {
      const formattedEditData = {
        ...editData,
        targetDate: editData.targetDate
          ? localToUTCDateTime(editData.targetDate)
          : null,
      };
      await api.put(`/${id}`, formattedEditData);
      setEditingTodo(null);
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchTodos();
    } catch (err) {
      setError("Failed to delete todo.");
    }
  };

  return (
    <motion.div className="min-h-screen w-full px-4 py-6 bg-gradient-to-br from-indigo-200 via-purple-100 to-sky-100">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-6 drop-shadow">
        📋 Your Todos
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300"
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300"
        >
          <option value="ALL">All Statuses</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
        <select
          value={filterExpired}
          onChange={(e) => setFilterExpired(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300"
        >
          <option value="ALL">All Dates</option>
          <option value="ACTIVE">Active</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <form
        onSubmit={addTodo}
        className="flex flex-wrap gap-4 justify-center mb-8"
      >
        <input
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 w-full sm:w-auto"
        />
        <input
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          min={getMinDateTime()}
          className="px-3 py-2 rounded border border-gray-300 w-full sm:w-auto"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
        >
          Add Todo
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => {
          const expired = isExpired(todo);
          const cardClasses = expired
            ? "border-red-400 bg-red-50 text-gray-700"
            : todo.completed
            ? "border-green-400"
            : "border-purple-400";

          return (
            <div
              key={todo.id}
              className={`p-4 rounded-xl shadow-md bg-white border-l-4 ${cardClasses}`}
            >
              {editingTodo === todo.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateTodo(todo.id);
                  }}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    value={editData.task}
                    onChange={(e) =>
                      setEditData({ ...editData, task: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                  <input
                    type="datetime-local"
                    value={editData.targetDate}
                    onChange={(e) =>
                      setEditData({ ...editData, targetDate: e.target.value })
                    }
                    min={getMinDateTime()}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                  <select
                    value={editData.priority}
                    onChange={(e) =>
                      setEditData({ ...editData, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTodo(null)}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-purple-800">
                      {todo.task}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded bg-${todo.priority.toLowerCase()}-100 text-${todo.priority.toLowerCase()}-800`}
                    >
                      {todo.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📅 {new Date(todo.targetDate).toLocaleString()}
                  </p>

                  {todo.completionDate && (
                    <p className="text-xs text-green-600">
                      ✅ Completed on{" "}
                      {new Date(todo.completionDate).toLocaleString()}
                    </p>
                  )}

                  {expired && !todo.completed && (
                    <p className="text-xs font-medium text-red-600 mt-1">
                      ⚠️ This task is expired
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    {!expired && (
                      <>
                        <button
                          onClick={() => toggleTodo(todo.id, todo.completed)}
                          className="flex-1 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
                        >
                          {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                        </button>
                        <button
                          onClick={() => startEdit(todo)}
                          className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
