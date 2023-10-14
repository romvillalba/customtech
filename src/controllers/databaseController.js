const fs = require('fs');
const path = require('path');

let modelo = function(nombreTabla) {
    return {
        filePath: path.join(__dirname, '../database/' + nombreTabla + '.json'),
        readFile() {
            let contenidoArchivo = fs.readFileSync(this.filePath, 'utf8');
        
            if(contenidoArchivo) {
                return JSON.parse(contenidoArchivo);
            }
        
            return [];
        },
        writeFile(contenidoAGrabar) {
            let contenidoAGrabarJSON = JSON.stringify(contenidoAGrabar, null, " ");
            fs.writeFileSync(this.filePath, contenidoAGrabarJSON);
        },
        nextId() {
            let listaElementos = this.readFile();
            let ultimoElemento = listaElementos.pop();

            if (ultimoElemento) {
                return ++ultimoElemento.id;
            }

            return 1;
        },
        listar() {
            return this.readFile();
        },
        buscar(id) {
            let listaElementos = this.readFile();
            return listaElementos.find(e => e.id == id)
        },
        crear(elemento) {
            let listaElementos = this.readFile();
            elemento.id = this.nextId();
            listaElementos.push(elemento);

            this.writeFile(listaElementos);

            return elemento.id;
        },
        modificar(elemento) {
            let listaElementos = this.readFile();
            let listaActualizada = listaElementos.map(e => {
                return (e.id == elemento.id) ? elemento : e;
            }); 

            this.writeFile(listaActualizada);

            return elemento.id;
        },
        borrar(id) {
            let listaElementos = this.readFile();
            let listaActualizada = listaElementos.filter(e => e.id != id); 

            this.writeFile(listaActualizada);
        }
    }
}

module.exports = modelo;