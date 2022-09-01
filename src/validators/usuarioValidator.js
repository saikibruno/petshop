const usuarioValidator = {
    nome: {
      required: "O campo Nome é Obrigatório!",    
    },
    sobrenome: {
      required: "O campo Sobrenome é Obrigatório!",    
    },
    cpf: {
      required: "O campo CPF é Obrigatório!",
    },
    email: {    
      required: "O campo E-mail é Obrigatório!",
      maxLength: {
        value: 100,
        message: "Qtd máxima de caracteres ultrapassada",
      }
    },
    cep: {
      required: "O campo CEP é Obrigatório!",
    },
    telefone: {
      required: "O campo Telefone é Obrigatório!",
    },
    dt: {
      required: "O campo Data de Nascimento é Obrigatório!",
    },
  };
  
  export default usuarioValidator;
  