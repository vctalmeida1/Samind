import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import Professores from './pages/Professores';
import Ajuda from './pages/Ajuda';
import Login from './pages/Login';
import Dados from './pages/Dados';
import Boletim from './pages/Boletim';
import LancarNotas from './pages/LancarNotas';
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dados" element={<Dados />} />
        <Route path="/boletim" element={<Boletim />} />
        <Route path="/lancar-notas" element={<LancarNotas />} />
      </Routes>
    </Router>
  );
}

export default App;
