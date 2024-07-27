import { useState } from 'react';
import { my_counter_app_backend } from 'declarations/my_counter_app_backend';

function App() {

  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(`[App] my_counter_app_backend:`, my_counter_app_backend);

  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      const count = await my_counter_app_backend.getCount();
      console.log(`[fetchCount] Count:`, count);

      setCounter(+count.toString()); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      let result = await my_counter_app_backend.inc(); // Increment the count by 1
      console.log(`[increment] result:`, result);
      console.log(`[increment] hash:`, result.hash);
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      await my_counter_app_backend.reset(); // Reset counter to 0
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };  

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      Counter: {counter}
      <br />
      <br />
      <button onClick={increment} style={{ opacity: loading ? 0.5 : 1 }} >Increment</button>
      <br />
      <br />
      <button>Decrement (Add your code)</button>
      <br />
      <br />
      <button onClick={reset} style={{ opacity: loading ? 0.5 : 1 }} >Reset to zero</button>
      <br />
      <br />

    </main>
  );
}

export default App;
