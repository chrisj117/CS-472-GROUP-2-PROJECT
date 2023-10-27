import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RequestASchool from './pages/RequestASchool'
import About from './pages/About'
import Navbar from './components/Navbar'

function App() {
  return (
    <main className="max-w-screen-2xl mx-auto py-8">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request-a-school" element={<RequestASchool />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
