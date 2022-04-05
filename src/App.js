import React from 'react';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const[employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("https://crud-jt.herokuapp.com/create", {
      name: name, 
      age: age, 
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([...employeeList, {
        name: name, 
        age: age, 
        country: country,
        position: position,
        wage: wage
      }])
    })
  }

  const getEmployees = () => {
    Axios.get("https://crud-jt.herokuapp.com/employees").then((response) => {
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeWage = (id) => {
    Axios.put("https://crud-jt.herokuapp.com/update", {wage: newWage, id: id}).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id == id ? {id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage} : val
      }))
    }
    )
  }

  const deleteEmployee = (id) => {
    Axios.delete(`https://crud-jt.herokuapp.com/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
         return val.id != id
      }))
    })
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder='Nombre' onChange={(event) => {setName(event.target.value);}} />
        <br/><br/>
        <input type="number" placeholder='Edad' onChange={(event) => {setAge(event.target.value);}} />
        <br/><br/>
        <input type="text" placeholder='País' onChange={(event) => {setCountry(event.target.value);}} />
        <br/><br/>
        <input type="text" placeholder='Ocupación' onChange={(event) => {setPosition(event.target.value);}} />
        <br/><br/>
        <input type="number" placeholder='Salario' onChange={(event) => {setWage(event.target.value);}} />
        <br/><br/>
        <button onClick={addEmployee} >Add employee</button>
        <br/><br/>
      </div>
      <button onClick={getEmployees} >Mostrar empleados</button>
      {employeeList.map((val, key) => {
        return <div> 
                  <p>{val.name}</p>
                  <p>{val.age}</p>
                  <p>{val.country}</p>
                  <p>{val.position}</p>
                  <p>{val.wage}</p>
                  <div>
                    <input type="text" placeholder='2000...' onChange={(event) => {setNewWage(event.target.value);}} />
                    <button onClick={() => {updateEmployeeWage(val.id)}} >Update</button>
                    <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                  </div>
                </div>
      })}
    </div>
  );
}

export default App;
