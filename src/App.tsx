import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <header className="App-header">
      <img src={reactLogo} className="w-20" alt="logo" />
      <p className="bg-red-400">Hello Vite + React!</p>
    </header>
  );
}

export default App;
