import { Iuser } from "./iuser";
//Interface para datos de la api
export interface Iresponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	results: Iuser[];
}
