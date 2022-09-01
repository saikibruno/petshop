class AgendamentoService {
    getAll(){
        const agendamentos = localStorage.getItem('agendamentos')
        return agendamentos ? JSON.parse(agendamentos) : []
    }

    get(id){
        const agendamentos = this.getAll()
        return agendamentos[id]
    }

    create(dados){
        const agendamentos = this.getAll()
        agendamentos.push(dados)
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    }

    update(id, dados){
        const agendamentos = this.getAll()
        agendamentos.splice(id, 1, dados)
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    }

    delete(id){
        const agendamentos = this.getAll()
        agendamentos.splice(id, 1)
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    }
}

export default new AgendamentoService()