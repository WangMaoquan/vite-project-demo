import { useState } from 'react';
import reactLogo from '@assets/react.svg';
import './App.css';
import { ReactComponent as ReactSVGLogo } from '@assets/react.svg';
// ?worker 指明是一个webworker
// import Worker from './webwork/index.js?worker';

// 使用vite-plugin-wasm 或者在 .wasm?init
// import init from './wasm/fib.wasm?init';

function App() {
  const [count, setCount] = useState(0);

  // const worker = new Worker();
  // worker.addEventListener('message', (e) => {
  //   console.log(e);
  // });

  // type FibFunc = (num: number) => number;
  // init({}).then(({ exports }) => {
  //   const fibFunc = exports.fib as FibFunc;
  //   console.log('Fib result:', fibFunc(10));
  // });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <ReactSVGLogo></ReactSVGLogo>
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
    </div>
  );
}

export default App;
