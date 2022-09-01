class PetService {
    getAll(){
        const pets = localStorage.getItem('pets')
        return pets ? JSON.parse(pets) : []
    }

    get(id){
        const pets = this.getAll()
        return pets[id]
    }

    create(dados){
        const pets = this.getAll()
        pets.push(dados)
        localStorage.setItem('pets', JSON.stringify(pets))
    }

    update(id, dados){
        const pets = this.getAll()
        pets.splice(id, 1, dados)
        localStorage.setItem('pets', JSON.stringify(pets))
    }

    delete(id){
        const pets = this.getAll()
        pets.splice(id, 1)
        localStorage.setItem('pets', JSON.stringify(pets))
    }
}

export default new PetService()