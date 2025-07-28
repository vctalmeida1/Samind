import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import Professores from './pages/Professores';
import Ajuda from './pages/Ajuda';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
