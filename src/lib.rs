use deno_bindgen::*;
use sysinfo::{
    ProcessExt, ProcessorExt, System, SystemExt, DiskExt,DiskType
};

#[deno_bindgen]
pub struct Memory {
	total: u64,
	free: u64,
	used: u64,
	swap_used : u64,
	swap_free: u64,
	swap_total: u64,
}

#[deno_bindgen]
pub struct Disks {
	mount_point: String,
	is_removable: bool,
	total_space: u64,
	available: u64,
	filesystem: String,
	name: String,
	type_: String,
}

#[deno_bindgen]
pub struct Cpu {
	name: String,
	freq: u64,
	usage: f32,
	vendor_id: String,
	brand: String,
	available_core: usize,
	total_core: usize,
}

#[deno_bindgen]
pub struct DiskUsage {
	writen: u64,
	read: u64,
	total_writen: u64,
	total_read: u64,
}

#[deno_bindgen]
pub struct Process {
	pid: String,
	name: String,
	cmd: String,
	exe: String,
	environ: Vec<String>,
	memory: u64,
	virtual_memory: u64,
	status: String,
	start_time: u64,
	run_time: u64,
	cpu_usage: f32,
	disk_usage: DiskUsage,
}


#[deno_bindgen]
pub struct SystemInfo {
	cpu: Vec<Cpu>,
	mem: Memory,
	disk: Vec<Disks>,
	process: Vec<Process>,
}

pub enum DenoDiskType {
	UNKNOWN,
	HDD,
	SSD,
}
impl std::fmt::Display for DenoDiskType {
	fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
		match self {
			DenoDiskType::HDD => write!(f, "HDD"),
			DenoDiskType::SSD => write!(f, "SSD"),
			_ => write!(f, "UNKNOWN"),
		}
	}
}
#[deno_bindgen]
pub fn sys_info() -> SystemInfo {
	let sys = System::new_all();
	let cpu = sys.processors();
	let disk = sys.disks();
	let process = sys.processes();

	let cpu_vec = cpu.into_iter().map(|cpu| {
		Cpu {
			name: cpu.name().to_string(),
			freq: cpu.frequency(),
			usage: cpu.cpu_usage(),
			vendor_id: cpu.vendor_id().to_string(),
			brand: cpu.brand().to_string(),
			available_core: num_cpus::get(),
			total_core: sys.physical_core_count()
			.map(|c| c ).unwrap_or(0)
		}
	}).collect::<Vec<Cpu>>();
	let disk_vec = disk.into_iter().map(|disk| {
		let filesystem = disk.file_system();
		let name = String::from_utf8_lossy(filesystem).to_string();
		let disktype = match disk.type_() {
			DiskType::HDD => DenoDiskType::HDD,
			DiskType::SSD => DenoDiskType::SSD,
			_ => DenoDiskType::UNKNOWN,
		};
		Disks {
			mount_point: disk.mount_point().display().to_string(),
			is_removable: disk.is_removable(),
			total_space: disk.total_space(),
			available: disk.available_space(),
			filesystem: name,
			name: disk.name().to_os_string().into_string().unwrap(),
			type_: disktype.to_string()
		}
	}).collect::<Vec<Disks>>();
	//Do the same for process
	let process_vec = process.into_iter().map(|process| {
		let pid = process.0;
		let environ = process.1.environ();
		Process {
			pid: pid.to_string(),
			name: process.1.name().to_string(),
			cmd: process.1.cmd().concat(),
			exe: process.1.exe().display().to_string(),
			environ: environ.to_vec(),
			memory: process.1.memory(),
			virtual_memory: process.1.virtual_memory(),
			status: process.1.status().to_string(),
			start_time: process.1.start_time(),
			run_time: process.1.run_time(),
			cpu_usage: process.1.cpu_usage(),
			disk_usage: DiskUsage {
				read: process.1.disk_usage().read_bytes,
				writen: process.1.disk_usage().written_bytes,
				total_read: process.1.disk_usage().total_read_bytes,
				total_writen: process.1.disk_usage().total_written_bytes,
			}
		}
	}).collect::<Vec<Process>>();
	SystemInfo { 
		cpu: cpu_vec, 
		mem: Memory { 
			total: sys.total_memory(), 
			free: sys.free_memory(), 
			used: sys.used_memory(),
			swap_used: sys.used_swap(),
			swap_total: sys.total_swap(),
			swap_free: sys.free_swap(), 
		}, 
		disk: disk_vec, 
		process: process_vec
	}
}