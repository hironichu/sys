import { bind_sys_info, components } from "./bindings/bindings.ts";

//Might need to add more Typing in the future, for now this will do.
export const system = (() => {
  const info = bind_sys_info();
  let comp: unknown | undefined;
  if (Deno.getUid() === 0) {
    comp = components().list;
  }
  return { ...info, components: comp };
})();
