// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.1/plug.ts"
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}
function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as Deno.UnsafePointer)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}
const opts = {
  name: "cpus",
  url: (new URL("../dist", import.meta.url)).toString(),
  policy: CachePolicy.NONE,
}
const _lib = await prepare(opts, {
  sys_info: { parameters: [], result: "pointer", nonblocking: false },
})
export type SystemInfo = {
  cpu: Array<Cpu>
  mem: Memory
  disk: Array<Disks>
  process: Array<Process>
}
export type Process = {
  pid: string
  name: string
  cmd: string
  exe: string
  environ: Array<string>
  memory: number
  virtual_memory: number
  status: string
  start_time: number
  run_time: number
  cpu_usage: number
  disk_usage: DiskUsage
}
export type Cpu = {
  name: string
  freq: number
  usage: number
  vendor_id: string
  brand: string
  available_core: number
  total_core: number
}
export type Disks = {
  mount_point: string
  is_removable: boolean
  total_space: number
  available: number
  filesystem: string
  name: string
  type_: string
}
export type DiskUsage = {
  writen: number
  read: number
  total_writen: number
  total_read: number
}
export type Memory = {
  total: number
  free: number
  used: number
  swap_used: number
  swap_free: number
  swap_total: number
}
export function sys_info() {
  let rawResult = _lib.symbols.sys_info()
  const result = readPointer(rawResult)
  return JSON.parse(decode(result)) as SystemInfo
}
