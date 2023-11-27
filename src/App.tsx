import { useEffect, useState } from 'react';
import { register } from 'register-service-worker';
import './App.css';

function App() {
  const [message, setMessage] = useState('No message.');

  useEffect(() => {
    register('/sw.js', {
      registrationOptions: { scope: './' },
      ready() {
        setMessage('Service worker is active.');
      },
      registered() {
        setMessage('Service worker has been registered.');
      },
      cached() {
        setMessage('Content has been cached for offline use.');
      },
      updatefound() {
        setMessage('New content is downloading.');
      },
      updated() {
        setMessage('New content is available; please refresh.');
      },
      offline() {
        setMessage(
          'No internet connection found. App is running in offline mode.'
        );
      },
      error(error) {
        setMessage(`Error during service worker : ${error}`);
      },
    });
  }, []);

  return (
    <>
      <p>current version is `{import.meta.env.VITE_VERSION ?? 'undefined'}`</p>
      <p>{message}</p>
    </>
  );
}

export default App;
