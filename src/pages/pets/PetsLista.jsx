import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTrash, BsFillPencilFill, BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import PetService from "../../services/PetService";
import "../../App.css";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { Avatar } from "@mui/material";

const PetsLista = () => {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPerPage] = useState(2);
  const [pets1, setPets1] = useState([]);
  const [value, setValue] = useState("");

  let end = page * totalPerPage;
  let start = end - totalPerPage;
  const paginado = pets1.slice(start, end);
  const TotalPages = Math.ceil(pets1.length / totalPerPage);

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

  const handleChange = (e) => setValue(e.target.value);

  async function handleBlur() {
    if ((await value.toLowerCase()) === "") {
      await setPets(PetService.getAll());
      setPets1(pets);
    } else {
      await setPets1(pets.filter((el) => el.nome.toLowerCase() === value.toLowerCase()));
    }
  }

  useEffect(() => {
    setPets(PetService.getAll());
    setPets1(PetService.getAll());
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
          "Pet " + nome + " excluido com sucesso!",
          "success"
        );
        PetService.delete(id);
        setPets(PetService.getAll());        
        setPets1(PetService.getAll());
      }
    });
  }
  return (
    <div>
      <br /><br /><br />
      <h1>Pets</h1>
      <br />
      <Link className="btn btn-info mb-3" to={"/pets/create"}>
        <FaPlus /> Novo
      </Link>
      <Row>
        <Col className="my-1" sm={2}>
          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Pesquisar por Nome: </strong>
            </Form.Label>
            <Form.Control
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nome"
            />
          </Form.Group>
        </Col>
      </Row>
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
            <th>Foto</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Data Nascimento</th>            
          </tr>
        </thead>
        <tbody>
          {paginado.map((item, i) => (
            <tr key={i}>
              <td>
              <Link
                  to={
                    "/petsDetalhe/" +
                    pets.findIndex((cod) => cod.id === item.id)
                  }
                  title="Detalhes"
                >
                  <BsSearch className="text-primary" />
                </Link>{" | "}
                <Link
                  to={
                    "/pets/" +
                    pets.findIndex((cod) => cod.id === item.id)
                  }
                  title="Editar"
                >
                  <BsFillPencilFill className="text-dark" />
                </Link>{" | "}
                <BsTrash
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    apagar(
                      pets.findIndex((cod) => cod.id === item.id),
                      item.nome
                    )
                  }
                  title="Excluir"
                  className="text-danger"
                />
              </td>
              <td><Avatar src={item.foto} sx={{ width: 30, height: 30 }}/></td>
              <td>{item.nome}</td>
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

export default PetsLista;
