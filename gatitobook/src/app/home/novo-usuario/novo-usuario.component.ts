import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private novoUsuarioService: NovoUsuarioService,
    private formBuilder: FormBuilder,
    private usuarioExistenteService: UsuarioExisteService) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(15)]],
      userName: ['', 
        [minusculoValidator], 
        [this.usuarioExistenteService.usuarioJaExiste()]
      ],
      password: [''],
    })
  }

  cadastrar(){
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario)

  }

}
