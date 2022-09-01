import Menu from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import Usuarios from "./pages/usuarios/Usuarios";
import UsuariosLista from "./pages/usuarios/UsuariosLista";
import UsuariosDetalhe from "./pages/usuarios/UsuariosDetalhe";

import Principal from "./pages/principal/Principal";
import AgendamentosCriar from "./pages/principal/AgendamentoCriar"
import AgendamentosDetalhe from "./pages/principal/AgendamentosDetalhe"

import ClientesLista from "./pages/clientes/ClientesLista";
import Clientes from "./pages/clientes/Clientes";
import ClientesDetalhe from "./pages/clientes/ClientesDetalhe";

import PetsLista from "./pages/pets/PetsLista";
import Pets from "./pages/pets/Pets";
import PetsDetalhe from "./pages/pets/PetsDetalhe";



function App() {
  return (
    <div>      
      <BrowserRouter>
        <Menu />
        <Container>
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/agendamentos/create" element={<AgendamentosCriar />} />            
            <Route path="/agendamentos/id:" element={<AgendamentosCriar />} />
            <Route path="/agendamentosDetalhe/id:" element={<AgendamentosDetalhe />} />


            <Route path="/usuarios" element={<UsuariosLista />} />
            <Route path="/usuarios/create" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<Usuarios />} />
            <Route path="/usuariosDetalhe/:id" element={<UsuariosDetalhe />} />

            <Route path="/clientes" element={<ClientesLista />} />
            <Route path="/clientes/create" element={<Clientes />} />
            <Route path="/clientes/:id" element={<Clientes />} />
            <Route path="/clientesDetalhe/:id" element={<ClientesDetalhe />} />

            <Route path="/pets" element={<PetsLista />} />
            <Route path="/pets/create" element={<Pets />} />
            <Route path="/pets/:id" element={<Pets />} />
            <Route path="/petsDetalhe/:id" element={<PetsDetalhe />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
