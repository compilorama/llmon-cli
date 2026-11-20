import { join, resolve } from 'path';
import system from './system';
import app from '../app';

system.fsMkdirSync = jest.fn();
system.fsWriteFileSync = jest.fn();
system.fsSymlinkSync = jest.fn();
system.fsAppendFileSync = jest.fn();
system.fsExistsSync = jest.fn();
system.pathJoin = jest.fn((...args) => join(...args));
system.pathResolve = jest.fn((...args) => resolve(...args));
system.osHomedir = jest.fn();
system.getProcessArgs = jest.fn();
system.exitProcess = jest.fn();
system.log = jest.fn();

export const fsMkdirSyncMock = system.fsMkdirSync;
export const fsWriteFileSyncMock = system.fsWriteFileSync;
export const fsSymlinkSyncMock = system.fsSymlinkSync;
export const fsAppendFileSyncMock = system.fsAppendFileSync;
export const fsExistsSyncMock = system.fsExistsSync;
export const pathJoinMock = system.pathJoin;
export const pathResolveMock = system.pathResolve;
export const osHomedirMock = system.osHomedir;
export const getProcessArgsMock = system.getProcessArgs;
export const exitProcessMock = system.exitProcess;
export const logMock = system.log;

export const simulateCommand = command => {
  const parts = command.split(' ');
  system.getProcessArgs.mockReturnValue(['node', ...parts]);
  app.start();
};

export const simulateHomedir = path => {
  system.osHomedir.mockReturnValue(path);
};

export const simulateDirectoryExistence = (...paths) => {
  system.fsExistsSync.mockImplementation(input => paths.includes(input));
};
