import { Iuser } from "./iuser";

export interface Iresponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	results: Iuser[];
}
