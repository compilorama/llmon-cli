import { mkdirSync, writeFileSync, symlinkSync, appendFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import service from './system';

describe('System Service', () => {
  it('should expose fs.mkdirSync as fsMkdirSync', () => {
    expect(service.fsMkdirSync).toBe(mkdirSync);
  });

  it('should expose fs.writeFileSync as fsWriteFileSync', () => {
    expect(service.fsWriteFileSync).toBe(writeFileSync);
  });

  it('should expose fs.symlinkSync as fsSymlinkSync', () => {
    expect(service.fsSymlinkSync).toBe(symlinkSync);
  });

  it('should expose fs.appendFileSync as fsAppendFileSync', () => {
    expect(service.fsAppendFileSync).toBe(appendFileSync);
  });

  it('should expose fs.existsSync as fsExistsSync', () => {
    expect(service.fsExistsSync).toBe(existsSync);
  });

  it('should expose path.join as pathJoin', () => {
    expect(service.pathJoin).toBe(join);
  });

  it('should expose path.resolve as pathResolve', () => {
    expect(service.pathResolve).toBe(resolve);
  });

  it('should expose os.homedir as osHomedir', () => {
    expect(service.osHomedir).toBe(homedir);
  });

  it('should exit process', () => {
    const originalExit = process.exit;
    process.exit = jest.fn();
    service.exitProcess(1);
    expect(process.exit).toHaveBeenCalledWith(1);
    process.exit = originalExit;
  });

  it('should return args passed the process', () => {
    const originalArgv = process.argv;
    process.argv = ['node', 'llmon', 'init'];
    expect(service.getProcessArgs()).toEqual(['node', 'llmon', 'init']);
    process.argv = originalArgv;
  });

  it('should log message', () => {
    const originalLog = console.log;
    console.log = jest.fn();
    service.log('Some message');
    expect(console.log).toHaveBeenCalledWith('Some message');
    console.log = originalLog;
  });
});
