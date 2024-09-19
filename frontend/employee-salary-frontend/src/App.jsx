import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:3002/employees');
    setEmployees(response.data);
  };

  const addEmployee = async () => {
    if (name && salary && department) {
      const newEmployee = { name, salary, department };
      await axios.post('http://localhost:3002/employees', newEmployee);
      fetchEmployees();
      setName('');
      setSalary('');
      setDepartment('');
    }
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:3002/employees/${id}`);
    fetchEmployees();
  };

  const editEmployee = (employee) => {
    setName(employee.name);
    setSalary(employee.salary);
    setDepartment(employee.department);
    setEditing(true);
    setEditId(employee._id);
  };

  const updateEmployee = async () => {
    if (name && salary && department) {
      await axios.put(`http://localhost:3002/employees/${editId}`, { salary, department });
      fetchEmployees();
      setName('');
      setSalary('');
      setDepartment('');
      setEditing(false);
      setEditId(null);
    }
  };

  return (
    <div className="App">
      <h1>Employee Salary Management</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        {editing ? (
          <button onClick={updateEmployee}>Update Employee</button>
        ) : (
          <button onClick={addEmployee}>Add Employee</button>
        )}
      </div>
      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee._id} className="employee">
            <span>{employee.name}</span>
            <span>{employee.department}</span>
            <span>{employee.salary}</span>
            <button onClick={() => editEmployee(employee)}>Edit</button>
            <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
