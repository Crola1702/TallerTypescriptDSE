export class Student {
    nombre: string;
    codigo: string;
    cedula: number;
    edad: number;
    direccion: string;
    telefono: string;

    constructor(nombre: string, codigo: string, cedula: number,
         edad: number, direccion: string, telefono: string){
            this.nombre = nombre;
            this.codigo = codigo;
            this.cedula = cedula;
            this.edad = edad;
            this.direccion = direccion;
            this.telefono = telefono;
    }
}