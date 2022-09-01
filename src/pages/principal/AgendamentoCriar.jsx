import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import AgendamentoService from "../../services/AgendamentoService";
import PetService from "../../services/PetService";
import ClienteService from "../../services/ClienteService";

import agendamentoValidator from "../../validators/agendamentoValidator";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/forms/Input";
import { Avatar } from "@mui/material";
import apiGatos from "../../services/apiGatos";


const AgendamentoCriar = () => {
  const params = useParams();
  const navigate = useNavigate();  
  

  const [gatos,setGatos] = useState([]);  
  
  const [clientes,setClientes] = useState([]);
  const [pets, setPets] = useState([]);
  const [agendamentos,setAgendamentos] = useState([]);
  
  
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
    validator: agendamentoValidator,
    setValue,
  };

  useEffect(() => {    
    setAgendamentos(AgendamentoService.getAll());  
    setClientes(ClienteService.getAll());        
    setPets(PetService.getAll());
    apiGatos.get("").then((resultado) => {
      setGatos(resultado.data);        
    });
    if (params.id) {
      const agen = AgendamentoService.get(params.id);      
      for (let campo in agen) {        
        setValue(campo, agen[campo]);           
      }      
        
    }
  }, [clientes]);

  function salvar(dados) {
    if (params.id) {
      AgendamentoService.update(params.id, dados);
    } else {
      AgendamentoService.create(dados);
    }
    navigate("/");
  }
     
  
  return (
    <div>
      <br /><br /><br />
      <h1>Agendamento</h1>          
      <br />          
      <div style={{display: 'flex',height:'400px',flexFlow:'column wrap',alignContent:'flex-start',backdropFilter:'blur(5px)'}}>
        <Form style={{ width: "400px",padding:'10px', }}>
          <Row>
            <Col>                                                   
            <Form.Group className="mb-3" controlId="procedimento" >
          <Form.Label>Procedimento: </Form.Label>
          <Form.Select {...register("procedimento", agendamentoValidator.procedimento)} required>
            <option>Selecione</option>            
              <option  value="Banho e Tosa">Banho e Tosa</option>
              <option  value="Banho">Banho</option>
              <option  value="Tosa">Tosa</option>
          </Form.Select>
          {errors.procedimento && <span>Campo Obrigatório</span>}
        </Form.Group>
        <Form.Group>
        <Form.Label><strong>Cliente: </strong></Form.Label>  
        <Form.Select                   
                  {...register('cliente',  agendamentoValidator.cliente)} >
                    <option>Selecione</option>
                    {clientes.map((item) => 
                      <option key={item.nome} id={item.nome} value={item.id} >{item.nome}</option>
                    )}
                  </Form.Select>
        </Form.Group>
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
            <Input name="dat" label="data" type="date" reference={reference} />
            <Form.Group className="mb-3" controlId="hora" >
          <Form.Label><strong>Hora: </strong></Form.Label>
          <Form.Select {...register("hora", agendamentoValidator.hora)} required>
            <option>Selecione</option>            
              <option  value="8:00">8:00</option>
              <option  value="9:00">9:00</option>
              <option  value="10:00">10:00</option>
              <option  value="11:00">11:00</option>              
              <option  value="13:00">13:00</option>
              <option  value="14:00">14:00</option>
              <option  value="15:00">15:00</option>
              <option  value="16:00">16:00</option>
              <option  value="17:00">17:00</option>
          </Form.Select>
          {errors.hora && <span>Campo Obrigatório</span>}
        </Form.Group>
            </Col>
          </Row>          
        </Form>              
      </div>           
    </div>
  );
};
export default AgendamentoCriar