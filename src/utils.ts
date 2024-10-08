import * as vscode from 'vscode';

import * as path from 'path';
import * as fs from 'fs';


export const EXTENSION_ID = "openplanet-angelscript-clang-format";
export const EXECUTABLE_CONFIG_KEY = 'executable';


/**
 * Get this extension configuration
 */
export function getExtensionConfig() {
    return vscode.workspace.getConfiguration(EXTENSION_ID, vscode.window.activeTextEditor?.document.uri);
}


/**
 * Get a path from the extension config, and resolve it to make sure it's absolute
 * @param config The config key
 */
export function getConfigPath(config: string) {
    let value = getExtensionConfig().get<string>(config);

    // Make sure value is a string and not empty
    if (!value || typeof value !== "string") {
        return undefined;
    }

    // If path isn't absolute, make it relative to the workspace root
    if (!path.isAbsolute(value)) {
        if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
            return undefined;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        value = path.join(workspaceRoot, value);
    }

    return path.normalize(value);
}


/**
 * Open the settings and filter the given property
 * @param config The config key to search for, should not include the extension ID
 */
export function openExtensionConfig(config: string) {
    vscode.commands.executeCommand('workbench.action.openSettings', `${EXTENSION_ID}.${config}`);
}


/**
 * Get the path to the default clang-format style file
 * @param extensionPath The extension's installation path
 */
export function getDefaultStyleFilepath(extensionPath: string) {
    return path.join(extensionPath, "resources", "default-style", ".clang-format");
}


/**
 * Get the path to the clang-format style file
 * @param extensionPath The extension's installation path
 */
export function getClangStyle(extensionPath: string) {
    let styleFilepath = getConfigPath("style");

    // TODO: Warn user if style file doesn't exist
    if (!styleFilepath || !fs.existsSync(styleFilepath)) {
        styleFilepath = getDefaultStyleFilepath(extensionPath);
    }

    return `file:${styleFilepath}`;
}


/**
 * @returns The path to the clang-format executable, or null if it doesn't exist
 */
export function getClangExecutable() {
    let clangExecutable = getConfigPath(EXECUTABLE_CONFIG_KEY);
    if (!clangExecutable) {
        // If user hasn't set a path, assume clang-format is in the PATH
        return "clang-format";
    }

    if (fs.existsSync(clangExecutable)) {
        return clangExecutable;
    }

    return null;
}
