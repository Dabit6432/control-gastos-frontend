//Importamos dependencias y blibliotecas necesarias
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'


// importamos las páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';

// Importamos los componentes necesarios
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/new-transaction" element={<ProtectedRoute><NewTransaction /></ProtectedRoute>} />
        <Route path="/edit-transaction/:id" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
