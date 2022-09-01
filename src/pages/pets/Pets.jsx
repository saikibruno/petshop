import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import PetService from "../../services/PetService";
import petValidator from "../../validators/petValidator";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/forms/Input";
import { Avatar } from "@mui/material";
import apiGatos from "../../services/apiGatos";

const Pets = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [imag, setImag] = useState();
  
  const [gato,setGato] = useState([]);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const date_date = new Date().getDate();
  const date_mes = new Date().getMonth();
  const date_ano = new Date().getFullYear();
  const date_minuto = new Date().getMinutes();
  const date_segundo = new Date().getSeconds();
  
  const id = (date_ano+""+date_mes+""+date_date+""+date_minuto+""+date_segundo);
  
  const reference = {
    register,
    errors,
    validator: petValidator,
    setValue,
  };

  useEffect(() => {    
    apiGatos.get("").then((resultado) => {
      setGato(resultado.data);        
    });
    if (params.id) {
      const pet = PetService.get(params.id);      
      for (let campo in pet) {
        setValue(campo, pet[campo]);
        setImag(pet.foto);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      PetService.update(params.id, dados);
    } else {
      PetService.create(dados);
    }
    navigate("/pets");
  }

  function isBigEnough(value) {
    let t = value.image?.url === imag;    
    return t
  }
  var gaa = gato.filter(isBigEnough);    
  
  return (
    <div>
      <br /><br /><br />
      <h1>Pets</h1>          
      <br />          
      <div style={{display: 'flex',height:'400px',flexFlow:'column wrap',alignContent:'flex-start',backdropFilter:'blur(5px)'}}>
        <Form style={{ width: "400px",padding:'10px', }}>
          <Row>
            <Col>   
            <Form.Group controlId="foto">              
                <Form.Label><strong>Raça: </strong></Form.Label>                
                {params.id ? 
                  <Form.Select {...register('foto', { 
                      onChange: (e) => {setImag(e.target.value)} 
                  })} disabled>
                    {params.id ? <option value={imag}>{!gato.length ? "":gaa[0].name}</option>:<option>Selecione o gato</option>}
                    {gato.map((item) => 
                      <option key={item.name} id={item.name} value={item.image?.url} >{item.name}</option>
                    )}
                  </Form.Select> :                   
                  <Form.Select                   
                  {...register('foto', { 
                      onChange: (e) => {setImag(e.target.value)} 
                  })} >
                    <option>Selecione a raça</option>
                    {gato.map((item) => 
                      <option key={item.name} id={item.name} value={item.image?.url} >{item.name}</option>
                    )}
                  </Form.Select>                                    
                  }                  
                <div className="p-1">
                  <Avatar src={imag} sx={{ width: 60, height: 60 }}/>                                    
                </div>
            </Form.Group>                                       
            <Input name="nome" label="Nome" reference={reference} />  
            <Input name="sobrenome" label="Sobrenome" reference={reference} />
            </Col>
          </Row>    
          <div>
            <Button onClick={handleSubmit(salvar)} className="btn btn-success">
              <FaCheck /> Salvar
            </Button>{" "}
            <Link className="btn btn-danger" to={-1}>
              <BsArrowLeft /> Voltar
            </Link>
          </div>        
        </Form>
        <Form style={{ width: "400px",padding:'10px' }}>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId={id}>
                <Form.Label><strong>ID: </strong></Form.Label>
                <Form.Control {...register('id', { value: id })}  disabled/>
            </Form.Group>
            <br /><br />            
            <Input name="dt" label="Dt. Nascimento" type="date" reference={reference}/>            
            </Col>
          </Row>          
        </Form>              
      </div>           
    </div>
  );
};

export default Pets