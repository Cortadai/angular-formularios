import {Component} from '@angular/core';

interface Persona {
  nombre: string;
  faves: Fave[];
}

interface Fave {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: []
})
export class DinamicosComponent {

  persona: Persona = {
    nombre: "David",
    faves: [
      {id: 1, nombre: "Mass Effect"},
      {id: 2, nombre: "Cyberpunk 2077"},
      {id: 3, nombre: "X-COM 2"}
    ]
  }
  nuevo: string = "";

  guardar() {
    console.log("form posteado")
  }

  eliminar(index: number) {
    this.persona.faves.splice(index, 1);
  }

  agregarNuevo() {
    const nuevoFave: Fave = {
      id: this.persona.faves.length + 1,
      nombre: this.nuevo
    }
    this.persona.faves.push({...nuevoFave});
    this.nuevo = "";
  }


}
