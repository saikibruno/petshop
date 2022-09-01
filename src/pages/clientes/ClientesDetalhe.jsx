import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClienteService from '../../services/ClienteService';
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import "../../App.css";
import Collapse from 'react-bootstrap/Collapse';

const ClientesDetalhe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [cliente, setCliente] = useState({});

  useEffect(() => {
      const us = ClienteService.get(params.id);
      setCliente(us);        
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
          ClienteService.delete(id);
          navigate("/clientes");
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
    <Card.Img variant="top" src={cliente.foto} style={{ width: '10rem' }}/>
    </div>
    <Card.Body>          
      <Card.Title><h1>{cliente.nome} {cliente.sobrenome}</h1></Card.Title>
      <Row><Col>
      <Card.Text><strong>ID:</strong> {cliente.id}</Card.Text>
      <Card.Text><strong>Nome completo:</strong> {cliente.nome} {cliente.sobrenome}</Card.Text>        
      <Card.Text><strong>CPF:</strong> {cliente.cpf}</Card.Text>
      <Card.Text><strong>E-mail:</strong> {cliente.email}</Card.Text>
      <Card.Text><strong>Telefone:</strong> {cliente.telefone}</Card.Text>
      <Card.Text><strong>Data nascimento:</strong> {cliente.dt}</Card.Text>
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
      <Card.Text><strong>CEP:</strong> {cliente.cep}</Card.Text>
      <Card.Text><strong>Logradouro:</strong> {cliente.logradouro}</Card.Text>
      <Card.Text><strong>Bairro:</strong> {cliente.bairro}</Card.Text>
      <Card.Text><strong>Cidade:</strong> {cliente.municipio}</Card.Text>
      <Card.Text><strong>UF:</strong> {cliente.uf}</Card.Text>
      <Card.Text><strong>Numero:</strong> {cliente.numero}</Card.Text>
      <Card.Text><strong>Complemento:</strong> {cliente.complemento}</Card.Text>
      </div>
      </Collapse>
      </Col> 
      </Row>          
      <Card.Text className='mt-3'><Link            
                to={
                  "/clientes/" + params.id
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
                    cliente.nome
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

export default ClientesDetalhe