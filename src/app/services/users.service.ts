import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Iuser } from "../interface/iuser";
import { map, Observable } from "rxjs";
import { Iresponse } from "../interface/iresponse";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	httpClient = inject(HttpClient);
	private baseUrl: string = "http://localhost:8085/api/users";
	private baseUrlServidor: string = "https://apiusers.matabuena.com/api/users";
	constructor() {}

	getAll(page: number, perPage: number): Observable<Iresponse> {
		return this.httpClient.get<Iresponse>(`${this.baseUrlServidor}/all/${page}/${perPage}`);
	}

	getById(id: number): Observable<Iuser> {
		return this.httpClient.get<Iuser>(`${this.baseUrlServidor}/${id}`);
	}

	updateOne(user: Iuser): Observable<Iuser> {
		return this.httpClient.put<Iuser>(this.baseUrlServidor + "/" + user.id, user);
	}

	insertOne(user: Iuser): Observable<Iuser> {
		return this.httpClient.post<Iuser>(this.baseUrlServidor, user);
	}

	deleteOne(id: number): Observable<Iuser> {
		return this.httpClient.delete<Iuser>(this.baseUrlServidor + "/" + id);
	}
}
