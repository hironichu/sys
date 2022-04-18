import {sys_info} from "./bindings/bindings.ts";

//Might need to add more Typing in the future, for now this will do.
export const sys = () => {
	return sys_info()
};
