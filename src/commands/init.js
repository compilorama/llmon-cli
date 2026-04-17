import system from '../services/system';

const init = () => {
  const dir = system.pathJoin(system.osHomedir(), 'llmon');
  if (system.fsExistsSync(dir)) {
    system.log('llmon had been initialized already');
    return;
  }
  system.fsMkdirSync(dir, { recursive: true });
  system.fsWriteFileSync(system.pathJoin(dir, 'AGENTS.md'), '');
  system.fsWriteFileSync(system.pathJoin(dir, 'SKILLS.md'), '');
  system.log('You have successfully initialized llmon!');
};

export default init;
