import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ["", [Validators.required, Validators.pattern(this.vs.emailPattern)],[this.ev]],
    username: ["", [Validators.required, this.vs.noPuedeSerAdmin]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required]]
  },{
    validators:[this.vs.camposIguales("password","password2")]
  })

  

  get emailErrorMessage():string{
    const errors=this.miFormulario.get("email")?.errors;
    if(errors?.["required"]){
      return "Obligatorio"
    } else if(errors?.["pattern"]){
      return "Formato incorrecto"
    } else if(errors?.["emailTomado"]){
      return "Email ya fue tomado"
    }
    return "";
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private ev: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "David Cortaberria",
      email: "test1@test.com",
      username: "dcortaberria",
      password: "yiesYurr",
      password2: "yiesYurr"
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
