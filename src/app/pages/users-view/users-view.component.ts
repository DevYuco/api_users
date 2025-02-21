import { Component, inject } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute } from "@angular/router";
import { Iuser } from "../../interface/iuser";
import { BotoneraComponent } from "../../components/botonera/botonera.component";

@Component({
	selector: "app-users-view",
	standalone: true,
	imports: [BotoneraComponent],
	templateUrl: "./users-view.component.html",
	styleUrl: "./users-view.component.css",
})
export class UsersViewComponent {
	userservice = inject(UsersService);
	activatedRoute = inject(ActivatedRoute);

	myUser!: Iuser;

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: any) => {
			const id = params.id;
			this.userservice.getById(id).subscribe((data: Iuser) => {
				this.myUser = data;
			});
		});
	}
}
