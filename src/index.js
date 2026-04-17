#!/usr/bin/env node
import init from './commands/init';
import harness from './commands/harness';

const [command, ...args] = process.argv.slice(2);

function start(){
  const exec = getCommandExecutorByName(command)
  return exec ? exec(...args) : handleCommandNotFound()
}

function getCommandExecutorByName(name){
  return {
    'init': init,
    'harness': harness
  }[name];
}

function handleCommandNotFound(){
  console.log(`Unknown command: ${command}`);
  process.exit(1);
}

start();
