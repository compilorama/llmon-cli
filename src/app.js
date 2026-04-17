import init from './commands/init';
import harness from './commands/harness';
import system from './services/system';

const app = {}

app.start = () => {
  const [command, ...args] = system.getProcessArgs().slice(2);
  const exec = getCommandExecutorByName(command);
  return exec ? exec(...args) : handleCommandNotFound(command);
};

function getCommandExecutorByName(name){
  return {
    'init': init,
    'harness': harness
  }[name];
}

function handleCommandNotFound(command){
  system.log(`Unknown command: ${command}`);
  system.exitProcess(1);
}

export default app;
