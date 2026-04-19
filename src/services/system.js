import { mkdirSync, writeFileSync, symlinkSync, appendFileSync, existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';

const service = {};

service.fsMkdirSync = mkdirSync;
service.fsWriteFileSync = writeFileSync;
service.fsSymlinkSync = symlinkSync;
service.fsAppendFileSync = appendFileSync;
service.fsExistsSync = existsSync;
service.fsReadFileSync = readFileSync;
service.pathJoin = join;
service.pathResolve = resolve;
service.osHomedir = homedir;
service.getProcessArgs = () => process.argv;
service.exitProcess = (...args) => process.exit(...args);
service.log = (...args) => console.log(...args);

export default service;
