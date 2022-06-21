use std::process::Command;
use std::process::{Child, Stdio};

pub struct ServerController {
    pub path: String,
    pub address: String,
    pub process: Child,
    pub output: Stdio,
}

impl ServerController {
    pub fn new(path: &str, address: &str) -> anyhow::Result<Self> {
        let output = Stdio::piped();

        let process = Command::new(path)
            .args(["server", "--address", address])
            .spawn()?;

        Ok(ServerController {
            path: path.to_string(),
            address: address.to_string(),
            process: process,
            output: output,
        })
    }
}
