import React, { useEffect, useState } from 'react'
import {  Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PetService from '../../services/PetService';
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import "../../App.css";
import apiGatos from "../../services/apiGatos";

const PetsDetalhe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [gato,setGato] = useState([]);

  const [pet, setPet] = useState({});

  useEffect(() => {
    apiGatos.get("").then((resultado) => {
      setGato(resultado.data);        
    });  
    const us = PetService.get(params.id);
      setPet(us);        
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
          navigate("/pets");
        }
      });
    }
    function isBigEnough(value) {      
      return value.image?.url === pet.foto;
    }
    var gaa = gato.filter(isBigEnough);

return (
  <div>
      <br />
      <br /><br />      
    <br />
    <Card className='bg_fosco' style={{ width: '25rem' }} >          
        <div style={{ alignSelf: 'center' }}>
    <Card.Img variant="top" src={pet.foto} style={{ width: '10rem' }}/>
    </div>
    <Card.Body>          
      <Card.Title><h1>{pet.nome} {pet.sobrenome}</h1></Card.Title>
      <Row><Col>
      <Card.Text><strong>ID:</strong> {pet.id}</Card.Text>
      <Card.Text><strong>Raça:</strong> {!gato.length ? "":gaa[0].name}</Card.Text>
      <Card.Text><strong>Nome completo:</strong> {pet.nome} {pet.sobrenome}</Card.Text>              
      <Card.Text><strong>Data nascimento:</strong> {pet.dt}</Card.Text>      
      </Col> 
      </Row>          
      <Card.Text className='mt-3'><Link            
                to={
                  "/pets/" + params.id
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
                    pet.nome
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

export default PetsDetalhe