use anyhow::anyhow;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(PartialEq, Serialize, Deserialize)]
pub enum ServerStatus {
    NotStarted,
    Starting,
    Idle,
    ShuttingDown,
}

pub struct ServerController {
    path: String,
    address: String,
    port: u16,
    command: Command,
    status: ServerStatus,
}

impl ServerController {
    pub fn new(path: &str, address: &str, port: u16) -> Self {
        let command = Command::new(path);

        ServerController {
            path: path.to_string(),
            address: address.to_string(),
            port,
            command,
            status: ServerStatus::NotStarted,
        }
    }

    pub fn start(&mut self) -> Result<()> {
        if self.status != ServerStatus::NotStarted {
            return Err(anyhow!("The server is already running"));
        }

        self.command.spawn()?;

        Ok(())
    }
}
