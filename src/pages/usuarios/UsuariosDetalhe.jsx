import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import "../../App.css";
import Collapse from 'react-bootstrap/Collapse';

const UsuariosDetalhe = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [usuario, setUsuario] = useState({});
  
    useEffect(() => {
        const us = UsuarioService.get(params.id);
        setUsuario(us);        
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
              "Usuário " + nome + " excluido com sucesso!",
              "success"
            );
            UsuarioService.delete(id);
            navigate("/usuarios");
          }
        });
      }

  return (
    <div>
        <br />
        <br /><br />
        
      <br />
      <Card className='bg_fosco' style={{ width: '25rem' }} >          
          <div style={{ alignSelf: 'center' }}>
      <Card.Img variant="top" src={usuario.foto} style={{ width: '10rem' }}/>
      </div>
      <Card.Body>          
        <Card.Title><h1>{usuario.nome} {usuario.sobrenome}</h1></Card.Title>
        <Row><Col>
        <Card.Text><strong>ID:</strong> {usuario.id}</Card.Text>
        <Card.Text><strong>Nome completo:</strong> {usuario.nome} {usuario.sobrenome}</Card.Text>        
        <Card.Text><strong>CPF:</strong> {usuario.cpf}</Card.Text>
        <Card.Text><strong>E-mail:</strong> {usuario.email}</Card.Text>
        <Card.Text><strong>Telefone:</strong> {usuario.telefone}</Card.Text>
        <Card.Text><strong>Data nascimento:</strong> {usuario.dt}</Card.Text>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="collapse-text"
        aria-expanded={open}        
      >
        Mais
      </Button>  
        </Col>
        <Col>        
      <Collapse in={open}>
          <div id="collapse-text">
        <Card.Text><strong>CEP:</strong> {usuario.cep}</Card.Text>
        <Card.Text><strong>Logradouro:</strong> {usuario.logradouro}</Card.Text>
        <Card.Text><strong>Bairro:</strong> {usuario.bairro}</Card.Text>
        <Card.Text><strong>Cidade:</strong> {usuario.municipio}</Card.Text>
        <Card.Text><strong>UF:</strong> {usuario.uf}</Card.Text>
        <Card.Text><strong>Numero:</strong> {usuario.numero}</Card.Text>
        <Card.Text><strong>Complemento:</strong> {usuario.complemento}</Card.Text>
        </div>
        </Collapse>
        </Col> 
        </Row>          
        <Card.Text className='mt-3'><Link            
                  to={
                    "/usuarios/" + params.id
                  }
                  title="Editar"
                >
                  <BsFillPencilFill className="text-dark"/>
                </Link>{" "}
                <BsTrash
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    apagar(
                      params.id,
                      usuario.nome
                    )
                  }
                  className="text-danger"
                  title="Excluir"
                /></Card.Text>
      </Card.Body>
    </Card>
        
      <Link className="btn btn-danger mt-2" to={-1}>
              <BsArrowLeft /> Voltar
            </Link>
    </div>
  )
}

export default UsuariosDetalhe