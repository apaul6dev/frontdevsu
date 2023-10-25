export class Cliente {
    idPersona: number | null;
    contrasena: string;
    identificacion: string;
    nombre: string;
    direccion: string;
    edad: number;
    estado: string;
    genero: string;
    telefono: string;

    constructor(
        idPersona: number,
        contrasena: string,
        identificacion: string,
        nombre: string,
        direccion: string,
        edad: number,
        estado: string,
        genero: string,
        telefono: string
    ) {
        this.idPersona = idPersona;
        this.contrasena = contrasena;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.direccion = direccion;
        this.edad = edad;
        this.estado = estado;
        this.genero = genero;
        this.telefono = telefono;
    }
}
