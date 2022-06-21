#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod server_controller;

use anyhow::{Context, Result};
use server_controller::ServerStatus;
use std::result;

use crate::server_controller::ServerController;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn start_server() -> result::Result<(), String> {
    let mut controller = ServerController::new("sssss", "", 1);
    match controller.start() {
        Ok(()) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
fn server_status() -> Result<ServerStatus, String> {
    Err("fail".to_string())
}

fn main() -> Result<()> {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![greet, start_server, server_status])
        .run(context)
        .with_context(|| format!("error while running tauri application"))?;

    Ok(())
}
