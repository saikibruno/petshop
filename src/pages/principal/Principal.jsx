import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTrash, BsFillPencilFill, BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import "../../App.css";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { Avatar } from "@mui/material";
import apiGatos from "../../services/apiGatos"
import ClienteService from "../../services/ClienteService"
import PetService from "../../services/PetService"
import UsuarioService from "../../services/UsuarioService"
import AgendamentoService from "../../services/AgendamentoService"



const Principal = () => {  
  const [page, setPage] = useState(1);
  const [totalPerPage] = useState(2);
  const [gatos,setGatos] = useState([]);
  const [clientes,setClientes] = useState([]);
  const [pets, setPets] = useState([]);
  const [usuarios,setUsuarios] = useState([]);  
  const [agendamentos,setAgendamentos] = useState([]);

  let end = page * totalPerPage;
  let start = end - totalPerPage;
  const paginado = agendamentos.slice(start, end);
  const TotalPages = Math.ceil(agendamentos.length / totalPerPage);

  function prevPage() {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  }

  function nextPage() {
    if (page >= TotalPages) {
      return null;
    }
    setPage(page + 1);
  }

  useEffect(() => {    
    setPets(PetService.getAll());
    setClientes(ClienteService.getAll());
    setUsuarios(UsuarioService.getAll());
    setAgendamentos(AgendamentoService.getAll()); 
    apiGatos.get("").then((resultado) => {
      setGatos(resultado.data);
    });
       
  }, []);

  function apagar(id, nome) {
    Swal.fire({
      title: "Tem certeza que deseja excluir? " + nome,
      text: "Não da para voltar atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, exclua isso!",
      cancelButtonText: "Não, eu errei!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Excluido!",
          "Agendamento " + nome + " excluido com sucesso!",
          "success"
        );
        AgendamentoService.delete(id);
        setAgendamentos(AgendamentoService.getAll());                
      }
    });
  }
  return (
    <div>
      <br /><br /><br />
      <h1>Agendamento</h1>
      <br />
      <Link className="btn btn-info mb-3" to={"/agendamentos/create"}>
        <FaPlus /> Novo
      </Link>      
      <div className="p-1">
        <Button className="btn btn-secondary" onClick={prevPage}>
          <BiSkipPrevious />
        </Button>{" "}
        {page} / {TotalPages}{" "}
        <Button className="btn btn-secondary" onClick={nextPage}>
          <BiSkipNext />
        </Button>
        {"    "}
        {"    "}
      </div>      
      <Table striped bordered hover className="bg_fosco">
        <thead>
          <tr>
            <th>#</th>
            <th>Procedimento</th>
            <th>Foto Pet</th>
            <th>Nome Pet</th>
            <th>Data Agendamento</th>            
            <th>Dono</th>
          </tr>
        </thead>
        <tbody>
          {paginado.map((item, i) => (
            <tr key={i}>
              <td>
              <Link
                  to={
                    "/agendamentoDetalhe/" +
                    agendamentos.findIndex((cod) => cod.id === item.id)
                  }
                  title="Detalhes"
                >
                  <BsSearch className="text-primary" />
                </Link>{" | "}
                <Link
                  to={
                    "/agendamentos/" +
                    agendamentos.findIndex((cod) => cod.id === item.id)
                  }
                  title="Editar"
                >
                  <BsFillPencilFill className="text-dark" />
                </Link>{" | "}
                <BsTrash
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    apagar(
                      agendamentos.findIndex((cod) => cod.id === item.id),
                      item.nome
                    )
                  }
                  title="Excluir"
                  className="text-danger"
                />
              </td>              
              <td>{item.procedimento}</td>
              <td>{item.sobrenome}</td>
              <td>{item.dt}</td>
              
            </tr>
          ))}          
        </tbody>
      </Table>
      <Link className="btn btn-danger" to={-1}>
              <BsArrowLeft /> Voltar
            </Link>
    </div>
  );
};

export default Principal;
