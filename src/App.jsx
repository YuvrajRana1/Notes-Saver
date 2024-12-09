import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/pastes",
    element: (
      <>
        <Navbar />
        <Paste />
      </>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;
