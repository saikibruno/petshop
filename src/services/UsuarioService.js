class UsuarioService {
    getAll(){
        const usuarios = localStorage.getItem('usuarios')
        return usuarios ? JSON.parse(usuarios) : []
    }

    get(id){
        const usuarios = this.getAll()
        return usuarios[id]
    }

    create(dados){
        const usuarios = this.getAll()
        usuarios.push(dados)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    update(id, dados){
        const usuarios = this.getAll()
        usuarios.splice(id, 1, dados)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    delete(id){
        const usuarios = this.getAll()
        usuarios.splice(id, 1)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
}

export default new UsuarioService()