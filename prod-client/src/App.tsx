// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Room from './pages/Room';
import Stats from './pages/Stats';
import ProductivePalsLanding from './pages/Landing';
import PomodoroTimer from './components/ui/PageTimer';
import HomeCarousel from './pages/HomeCarousel';
import AuthForms from './pages/AuthForms';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/auth" element={<AuthForms/>} />
        <Route path="/" element={<HomeCarousel/>} />
        <Route path="/Timer" element={<PomodoroTimer/>} />
        {/* <Route path="/room/:id" element={<Room/>} /> */}
        <Route path="/room" element={<Room/>} />
        <Route path="/stats" element={<Stats/>} />
        <Route path="/landing" element={<ProductivePalsLanding/>} />

      </Routes>
    </Router>
  );
};

export default App;
