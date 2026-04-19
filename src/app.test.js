import {
  fsMkdirSyncMock,
  fsWriteFileSyncMock,
  fsSymlinkSyncMock,
  fsAppendFileSyncMock,
  fsExistsSyncMock,
  exitProcessMock,
  logMock,
  simulateHomedir,
  simulateDirectoryExistence,
  simulateCommand
} from './services/testing';

describe('App', () => {
  beforeEach(() => {
    fsMkdirSyncMock.mockClear();
    fsWriteFileSyncMock.mockClear();
    fsSymlinkSyncMock.mockClear();
    fsAppendFileSyncMock.mockClear();
    fsExistsSyncMock.mockReset();
    exitProcessMock.mockClear();
    logMock.mockClear();
  });

  it('should create the llmon home directory and the AGENTS.md and SKILLS.md files', () => {
    simulateHomedir('fake/home');
    simulateCommand('llmon init');
    expect(fsMkdirSyncMock).toHaveBeenCalledWith('fake/home/llmon', { recursive: true });
    expect(fsWriteFileSyncMock).toHaveBeenCalledWith('fake/home/llmon/AGENTS.md', '');
    expect(fsWriteFileSyncMock).toHaveBeenCalledWith('fake/home/llmon/SKILLS.md', '');
    expect(logMock).toHaveBeenCalledWith('You have successfully initialized llmon!');
  });

  it('should not recreate the llmon home directory nor rewrite AGENTS.md/SKILLS.md when it already exists', () => {
    simulateHomedir('fake/home');
    simulateDirectoryExistence('fake/home/llmon');
    simulateCommand('llmon init');
    expect(fsExistsSyncMock).toHaveBeenCalledWith('fake/home/llmon');
    expect(fsMkdirSyncMock).not.toHaveBeenCalled();
    expect(fsWriteFileSyncMock).not.toHaveBeenCalled();
    expect(logMock).toHaveBeenCalledWith('llmon had been initialized already');
  });

  it('should symlink the llmon home, write .cursorrules, and gitignore both entries in the target directory when running the harness command', () => {
    simulateHomedir('fake/home');
    simulateCommand('llmon harness /fake/target');
    expect(fsSymlinkSyncMock).toHaveBeenCalledWith('fake/home/llmon', '/fake/target/.llmon');
    expect(fsWriteFileSyncMock).toHaveBeenCalledWith('/fake/target/.cursorrules', `Follow all instructions in:

./.llmon/AGENTS.md
./.llmon/SKILLS.md

These define behavior, coding standards, and capabilities.
`);
    expect(fsAppendFileSyncMock).toHaveBeenCalledWith('/fake/target/.git/info/exclude', '\n.llmon\n.cursorrules\n');
    expect(logMock).toHaveBeenCalledWith('You have successfully harnessed the directory /fake/target');
  });

  it('should not re-harness the target directory when it already contains a .llmon entry', () => {
    simulateHomedir('fake/home');
    simulateDirectoryExistence('/fake/target/.llmon');
    simulateCommand('llmon harness /fake/target');
    expect(fsExistsSyncMock).toHaveBeenCalledWith('/fake/target/.llmon');
    expect(fsSymlinkSyncMock).not.toHaveBeenCalled();
    expect(fsWriteFileSyncMock).not.toHaveBeenCalled();
    expect(fsAppendFileSyncMock).not.toHaveBeenCalled();
    expect(logMock).toHaveBeenCalledWith('The directory /fake/target had been harnessed already');
  });

  it('should log a helpful hint and not exit when no command is given', () => {
    simulateCommand('llmon');
    expect(logMock).toHaveBeenCalledWith('No command given. Run "llmon --help" to learn about available commands.');
    expect(exitProcessMock).not.toHaveBeenCalled();
  });

  it('should log an unknown command message and exit with code 1 when given command does not exist', () => {
    simulateCommand('llmon foo');
    expect(logMock).toHaveBeenCalledWith('Unknown command: foo');
    expect(exitProcessMock).toHaveBeenCalledWith(1);
  });
});
