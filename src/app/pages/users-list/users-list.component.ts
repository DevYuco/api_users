import { Component, inject } from "@angular/core";
import { Iuser } from "../../interface/iuser";
import { UsersService } from "../../services/users.service";
import { Iresponse } from "../../interface/iresponse";
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
	selector: "app-users-list",
	standalone: true,
	imports: [UserCardComponent],
	templateUrl: "./users-list.component.html",
	styleUrl: "./users-list.component.css",
})
export class UsersListComponent {
	private userService = inject(UsersService);

	arrUsers: Iuser[];
	page: number;
	totalPages: number;
	perPage: number;

	constructor() {
		this.arrUsers = [];
		this.page = 1;
		this.totalPages = 1;
		this.perPage = 8;
	}

	ngOnInit() {
		this.loadUsers();
	}

	loadUsers() {
		this.userService.getAll(this.page, this.perPage).subscribe((data: Iresponse) => {
			this.arrUsers = data.results;
			this.page = data.page;
			this.totalPages = data.total_pages;
		});
	}
	//metodo para pasar de pagina y cargar los usuarios con la paginacion
	nextPage() {
		if (this.page < this.totalPages) {
			this.page++;
			this.loadUsers();
		}
	}
	//metodo para retroceder de pagina y cargar los usuarios con la paginacion
	prevPage() {
		if (this.page > 1) {
			this.page--;
			this.loadUsers();
		}
	}
}
