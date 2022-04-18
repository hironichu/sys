use num_cpus;
use deno_bindgen::*;

#[deno_bindgen]
pub fn get_phy() -> i32 {
	num_cpus::get_physical() as i32
}
#[deno_bindgen]
pub fn get_available() -> i32 {
	num_cpus::get() as i32
}