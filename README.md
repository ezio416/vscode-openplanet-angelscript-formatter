# Openplanet AngelScript Clang-Format
## WORK IN PROGRESS

Format Openplanet AngelScript code using Clang-Format

<br>

## Usage

Use `Format Document` _(Default Shortcut: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>)_ to format the current document.  
Or `Format Selection` _(Default Shortcut: <kbd>Ctrl</kbd> + <kbd>K</kbd> <kbd>Ctrl</kbd> + <kbd>F</kbd>)_ to format the currently selected code.

<br>

## Setup

1. Set the configuration `openplanet-angelscript-clang-format.executable` to point to a __clang-format.exe__ executable.

2. Optionally create a [.clang-format](https://clang.llvm.org/docs/ClangFormatStyleOptions.html) file containing your preferences and set the configuration `openplanet-angelscript-clang-format.style` to point to that file.
You can generate a .clang-format file by running the VS Code command: **"Openplanet AngelScript Clang-Format: Generate Config File"**

Note: Paths can be either absolute or relative to the workspace.
