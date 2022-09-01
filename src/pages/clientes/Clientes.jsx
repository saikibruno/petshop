import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ClienteService from "../../services/ClienteService";
import clienteValidator from "../../validators/clienteValidator";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/forms/Input";
import { mask, unMask } from "remask";
import apiCep from "../../services/apiCep";
import { Avatar } from "@mui/material";

const Clientes = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [imag, setImag] = useState("");  
  
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
    validator: clienteValidator,
    setValue,
  };

  useEffect(() => {
    if (params.id) {
      const cliente = ClienteService.get(params.id);
      for (let campo in cliente) {
        setValue(campo, cliente[campo]);
        setImag(cliente.foto);
      }
    }
  }, []);

  function salvar(dados) {
    if (params.id) {
      ClienteService.update(params.id, dados);
    } else {
      ClienteService.create(dados);
    }
    navigate("/clientes");
  }

  function handleChange(event) {
    const mascara = event.target.getAttribute("mask");
    setValue(event.target.name, mask(event.target.value, mascara));
  }

  function handleCep(event) {
    const valor = unMask(event.target.value);
    apiCep.get(`/ws/${valor}/json/`).then((resultado) => {
      const endereco = resultado.data;

      setValue("logradouro", endereco.logradouro);
      setValue("uf", endereco.uf);
      setValue("municipio", endereco.localidade);
      setValue("bairro", endereco.bairro);
    });
  } 

  return (
    <div>
      <h1>Clientes</h1>
      <br />      
      <div style={{display: 'flex',height:'600px',flexFlow:'column wrap',alignContent:'flex-start',backdropFilter:'blur(5px)'}}>
        <Form style={{ width: "400px",padding:'10px', }}>
          <Row>
            <Col>   
            <Form.Group>              
                <Form.Label><strong>Foto: </strong></Form.Label>                
                <Form.Control type="text" 
                  placeholder="Cole a URL da imagem aqui" {...register('foto', { 
                    onChange: (e) => {setImag(e.target.value)} 
            })}  />  
        <div className="p-1">
        <Avatar src={imag} sx={{ width: 60, height: 60 }}/>
        </div>             
            </Form.Group>                                       
            <Input name="nome" label="Nome" reference={reference} />  
            <Input name="sobrenome" label="Sobrenome" reference={reference} /> 
            <Input name="email" label="E-mail" reference={reference} />                                      
            <Input name="cep" label="CEP" mask="99.999-999" onChange={handleChange}
                  onBlur={handleCep} reference={reference} />
            <Input name="bairro" label="Bairro" reference={reference} />
            <Input name="uf" label="UF" reference={reference} />      
            <Input name="complemento" label="Complemento" reference={reference} />                        
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
            <Input name="cpf" label="CPF" mask="999.999.999-99" reference={reference}/>  
            <Input name="dt" label="Dt. Nascimento" type="date" reference={reference}/>
            <Input name="telefone" label="Telefone" mask="(99) 99999-9999" reference={reference} />                                          
            <Input name="logradouro" label="Logradouro" reference={reference} />            
            <Input name="municipio" label="Municipio" reference={reference} />              
            <Input name="numero" label="Numero" reference={reference} />
            </Col>
          </Row>          
        </Form>              
      </div>           
    </div>
  );
};

export default Clientes