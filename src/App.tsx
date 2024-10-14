import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { SentencesApi, Sentence } from "./api/api"; 
import { Configuration } from "./api/configuration";

const config = new Configuration({
  basePath: 'http://localhost:3001/v1',
  // apiKey: 'your-api-key',
});
const api = new SentencesApi(config);

function App() {
  const [count, setCount] = useState(0);
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const fetchSentences = async () => {
    try {
      const response = await api.sentencesSentenceIdGet(1);
      setSentences(response.data.main ? [response.data.main] : []);
    } catch (error) {
      console.error('Error fetching sentences:', error);
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
      
      <p>Sentence List</p>
      <button onClick={fetchSentences}>Fetch Sentences</button>
      <ul>
        {sentences.map((main: Sentence) => (
          <li key={main.sentence_id}>{main.sentence}</li>
        ))}
      </ul>
    </>
  );
}

export default App;