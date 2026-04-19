import init from './commands/init';
import harness from './commands/harness';
import help from './commands/help';
import system from './services/system';

const app = {};

app.start = () => {
  const [command, ...args] = system.getProcessArgs().slice(2);
  if (!command) return handleMissingCommand();
  const exec = getCommandExecutorByName(command);
  return exec ? exec(...args) : handleCommandNotFound(command);
};

function getCommandExecutorByName(name){
  return {
    'init': init,
    'harness': harness,
    '--help': help
  }[name];
}

function handleMissingCommand(){
  system.log('No command given. Run "llmon --help" to learn about available commands.');
}

function handleCommandNotFound(command){
  system.log(`Unknown command: ${command}`);
  system.exitProcess(1);
}

export default app;
