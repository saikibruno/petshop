const clienteValidator = {
    nome: {
      required: "O campo Nome é Obrigatório!",    
    },
    dt: {
      required: "O campo Data de Nascimento é Obrigatório!",
    },
    foto: {
      required: "O campo Raça é Obrigatório!", 
      min: {
        value: 4,
        message: "O valor mínimo é 3"
    },   
    },
  };
  
  export default clienteValidator;
  