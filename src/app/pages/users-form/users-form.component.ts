import { Component, inject } from "@angular/core";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Iuser } from "../../interface/iuser";
import Swal from "sweetalert2";

@Component({
	selector: "app-users-form",
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: "./users-form.component.html",
	styleUrl: "./users-form.component.css",
})
export class UsersFormComponent {
	router = inject(Router);
	userService = inject(UsersService);
	activatedRoute = inject(ActivatedRoute);

	userForm: FormGroup;
	tipo: string;

	constructor() {
		this.tipo = "Nuevo";
		this.userForm = new FormGroup(
			{
				id: new FormControl("", []),
				username: new FormControl("", []),
				firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
				lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
				email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
				image: new FormControl("", [Validators.required, Validators.pattern(/^(https?:\/\/)[\w\-]+(\.[\w\-]{2,})+[/#?]?.*$/)]),
			},
			[]
		);
	}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: any) => {
			if (params.id) {
				this.tipo = "Actualizar";
				this.userService.getById(params.id).subscribe((data: Iuser) => {
					this.userForm.patchValue({
						//He utilziado patch value para no crear dos new FormGroup
						id: data.id,
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						image: data.image,
					});
				});
			}
		});
	}
	//He utulizado sweetalert2 para los mensajes de confirmacion,npm install sweetalert2 y lo importamos
	getDataForm() {
		if (this.tipo == "Nuevo") {
			const firstName = this.userForm.value.firstName.trim(); //quitamos espacios
			const lastName = this.userForm.value.lastName.trim().split(" ")[0]; // Solo el primer apellido

			// Generar username limpio sin caracteres ni tildes
			const username = this.normalizeString(`${firstName}.${lastName}`.toLowerCase());

			// Añadir el username al formulario
			this.userForm.patchValue({
				username: username,
			});

			this.userService.insertOne(this.userForm.value).subscribe((data) => {
				//confirmaciones con sweetalert2
				Swal.fire({
					icon: "success",
					title: "Usuario añadido",
					text: `${data.firstName} ${data.lastName} (ID: ${data.id})`,
					confirmButtonText: "Aceptar",
				}).then(() => {
					this.router.navigate(["/home"]);
				});
			});
		} else {
			const firstName = this.userForm.value.firstName.trim(); //quitamos espacios
			const lastName = this.userForm.value.lastName.trim().split(" ")[0]; // Solo el primer apellido

			// Generar username limpio
			const username = this.normalizeString(`${firstName}.${lastName}`.toLowerCase());

			// Añadir el username al formulario
			this.userForm.patchValue({
				username: username,
			});

			this.userService.updateOne(this.userForm.value).subscribe((data) => {
				//Confirmaciones con sweetalert2
				Swal.fire({
					icon: "success",
					title: "Usuario actualizado",
					text: `El nuevo usuario es: ${this.userForm.value.firstName} ${this.userForm.value.lastName}`,
					confirmButtonText: "Volver al listado",
				}).then(() => {
					this.router.navigate(["/home"]);
				});
			});
		}
	}

	//Funcion para valdaciones
	checkControl(formControlName: string, validador: string): boolean | undefined {
		return this.userForm.get(formControlName)?.hasError(validador) && this.userForm.get(formControlName)?.touched;
	}
	//funcion para limpiar tildes y caracteres
	normalizeString(str: string): string {
		return str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/\s+/g, "");
	}
}
