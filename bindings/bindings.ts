// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.1/plug.ts";
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v;
  return new TextEncoder().encode(v);
}
function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as Deno.UnsafePointer);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}
const opts = {
  name: "cpus",
  url: (new URL("../dist", import.meta.url)).toString(),
  policy: CachePolicy.NONE,
};
const _lib = await prepare(opts, {
  bind_sys_info: { parameters: [], result: "pointer", nonblocking: false },
  components: { parameters: [], result: "pointer", nonblocking: false },
});
export type Cpu = {
  name: string;
  freq: number;
  usage: number;
  vendor_id: string;
  brand: string;
};
export type Process = {
  pid: string;
  name: string;
  cmd: string;
  exe: string;
  environ: Array<string>;
  memory: number;
  virtual_memory: number;
  status: string;
  start_time: number;
  run_time: number;
  cpu_usage: number;
  disk_usage: DiskUsage;
};
export type MachineCPU = {
  core: number;
  threads: number;
};
export type User = {
  name: string;
  groups: Array<string>;
  uid: string;
  gid: string;
};
export type DiskUsage = {
  writen: number;
  read: number;
  total_writen: number;
  total_read: number;
};
export type Disks = {
  mount_point: string;
  is_removable: boolean;
  total_space: number;
  available: number;
  filesystem: string;
  name: string;
  type_: string;
};
export type CompInfo = {
  list: Array<Comp>;
};
export type Memory = {
  total: number;
  free: number;
  used: number;
  swap_used: number;
  swap_free: number;
  swap_total: number;
};
export type Comp = {
  label: string;
  critial_temp: number;
  max_temp: number;
  temp: number;
};
export type Machine = {
  name: string;
  version: string;
  hostname: string;
  uptime: number;
  cpu: MachineCPU;
};
export type SystemInfo = {
  machine: Machine;
  cpus: Array<Cpu>;
  mem: Memory;
  users: Array<User>;
  disk: Array<Disks>;
  process: Array<Process>;
};
export function bind_sys_info() {
  let rawResult = _lib.symbols.bind_sys_info();
  const result = readPointer(rawResult);
  return JSON.parse(decode(result)) as SystemInfo;
}
export function components() {
  let rawResult = _lib.symbols.components();
  const result = readPointer(rawResult);
  return JSON.parse(decode(result)) as CompInfo;
}
