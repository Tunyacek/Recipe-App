import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    async function greetGuest() {
      try {
        setIsLoading(true);
        const res = await axios.get(url);
        setGreeting(res.data);
      } catch (error) {
        setError("Nastala chyba");
      } finally {
        setIsLoading(false);
      }
    }
    greetGuest();
  }, []);

  if (isLoading) return <p>Nahravam...</p>;
  if (error) return <p>{error}</p>;
  return <p>{greeting}</p>;
}

export default App;
