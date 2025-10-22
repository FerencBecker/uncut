import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>VÁGATLANUL</h1>
        <p>Fotóműtermek - Néprajzi Múzeum</p>
      </header>
      <main>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>Count is {count}</button>
          <p>React 18 + TypeScript + Vite setup is working!</p>
        </div>
      </main>
    </div>
  );
};

export default App;
