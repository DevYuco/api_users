import { Component, inject, Input } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { Router, RouterLink } from "@angular/router";
import Swal from "sweetalert2";

@Component({
	selector: "app-botonera",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./botonera.component.html",
	styleUrl: "./botonera.component.css",
})
export class BotoneraComponent {
	userService = inject(UsersService);
	router = inject(Router);

	@Input() id!: number;
	@Input() parent: string = "";

	deleteUser(id: number) {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción eliminará al usuario definitivamente.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
		}).then((result) => {
			if (result.isConfirmed) {
				this.userService.deleteOne(id).subscribe((data) => {
					if (data.id) {
						Swal.fire({
							icon: "success",
							title: "Usuario eliminado",
							text: `${data.firstName} ${data.lastName} ha sido eliminado correctamente.`,
							confirmButtonText: "Aceptar",
						}).then(() => {
							if (this.parent === "view") {
								this.router.navigate(["/home"]);
							} else {
								window.location.reload();
							}
						});
					}
				});
			}
		});
	}
}
