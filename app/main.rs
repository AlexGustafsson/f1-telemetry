#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod server_controller;
mod state;

use anyhow::{Context, Result};
use server_controller::ServerController;
use state::ApplicationState;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() -> Result<()> {
    let context = tauri::generate_context!();

    let server = ServerController::new("./cli", "0.0.0.0:20777")?;
    let state = ApplicationState { server: server };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![greet])
        .run(context)
        .with_context(|| format!("error while running tauri application"))?;

    Ok(())
}
