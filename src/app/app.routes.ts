import { Routes } from "@angular/router";
import { UsersListComponent } from "./pages/users-list/users-list.component";
import { UsersViewComponent } from "./pages/users-view/users-view.component";
import { UsersFormComponent } from "./pages/users-form/users-form.component";

export const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "home" },
	{ path: "home", component: UsersListComponent },
	{ path: "user/:id", component: UsersViewComponent },
	{ path: "newuser", component: UsersFormComponent },
	{ path: "updateuser/:id", component: UsersFormComponent },
	{ path: "**", redirectTo: "home" },
];
