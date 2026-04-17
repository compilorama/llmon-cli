# llmon-cli

`llmon` helps you manage LLM context files on Cursor across multiple projects.

Instead of duplicating `AGENTS.md`, `SKILLS.md` and Cursor rules in every repository, `llmon` keeps a single source of truth in your home directory and links it into each project you harness. Update the context files once, and every harnessed project stays in sync.

## Installation

```bash
npm i -g @compilorama/llmon-cli
```

## Usage

Using `llmon` is a three-step workflow:

1. **Initialize llmon.** This creates a central `llmon` directory in your home folder, which will hold the LLM context files shared across all your projects.

   ```bash
   llmon init
   ```

   It will create the following structure:

   ```
   ~/llmon/
   ├── AGENTS.md
   └── SKILLS.md
   ```

2. **Populate `AGENTS.md` and `SKILLS.md`.** Open the files created by `init` and write down the behavior, coding standards and capabilities you want your LLM to follow.

3. **Harness your projects.** For each project you want to apply these context files to, run `harness` pointing to the project directory. This exposes the shared context to Cursor through an isolated `.llmon` entry inside the project.

   ```bash
   llmon harness ./path/to/your/project
   ```

   From this point on, Cursor will follow the instructions defined in `~/llmon/AGENTS.md` and `~/llmon/SKILLS.md` while working on that project, regardless the agent selected inside the editor (Codex, Opus, etc).

## API

`llmon` exposes two commands.

### `init`

```bash
llmon init
```

Creates the central context directory at `~/llmon` (if it doesn't exist yet) and scaffolds two empty files inside it:

- `~/llmon/AGENTS.md`
- `~/llmon/SKILLS.md`

These files are where you describe the behavior, coding standards and capabilities your LLM should follow across all harnessed projects.

### `harness`

```bash
llmon harness <directory>
```

Wires a project up to your central `llmon` context. Given a target `<directory>` (absolute or relative), it will:

1. Create a symlink `<directory>/.llmon` pointing to `~/llmon`, so the project can read the shared `AGENTS.md` and `SKILLS.md` without copying them.
2. Write a `<directory>/.cursorrules` file that instructs Cursor to follow the rules defined in `./.llmon/AGENTS.md` and `./.llmon/SKILLS.md`.
3. Append `.llmon` and `.cursorrules` to `<directory>/.git/info/exclude`, so these entries are ignored locally by Git without touching the project's shared `.gitignore`.

After harnessing, the project contains:

```
<directory>/
├── .llmon -> ~/llmon
└── .cursorrules
```

## How to contribute

### Requirements

- [Node.js](https://nodejs.org/) 22 or greater
- [npm](https://www.npmjs.com/) 10 or greater

### Running the project locally

1. Clone the repository:

   ```bash
   git clone https://github.com/compilorama/llmon-cli.git
   cd llmon-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the test suite:

   ```bash
   npm test
   ```

4. Lint the source code:

   ```bash
   npm run format
   ```

5. Build the distributable output (transpiles `src/` into `dist/`):

   ```bash
   npm run build
   ```
