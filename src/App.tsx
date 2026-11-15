
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

const Admin = lazy(() => import('./components/Admin'))
const AdminLogin = lazy(() => import('./components/AdminLogin'))

function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AdminLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] text-[#f3f0e9]">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d6ad54]">
        Loading Admin Dashboard...
      </p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AdminLoading />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
