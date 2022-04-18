import {get_available, get_phy} from "./bindings/bindings.ts";


export const cpus = () => {
	return {
		available: get_available(),
		physical: get_phy()
	}
}
