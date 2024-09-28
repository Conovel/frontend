import React from 'react';
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { PetsApi, Pet } from "./api/api"; 
import { Configuration } from "./api/configuration";

const config = new Configuration({
  basePath: 'http://localhost:3001/v1',
  // apiKey: 'your-api-key',
});
const api = new PetsApi(config);

function App() {
  const [count, setCount] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]); 

  const fetchPets = async () => {
    try {
      const response = await api.listPets();
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Button variant="contained">Hello world</Button>
      
      <p>Pet List</p>
      <button onClick={fetchPets}>Fetch Pets</button>
      <ul>
        {pets.map((pet: Pet) => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
