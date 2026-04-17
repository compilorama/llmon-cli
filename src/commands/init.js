import system from '../services/system';

const init = () => {
  const dir = system.pathJoin(system.osHomedir(), 'llmon');
  system.fsMkdirSync(dir, { recursive: true });
  system.fsWriteFileSync(system.pathJoin(dir, 'AGENTS.md'), '');
  system.fsWriteFileSync(system.pathJoin(dir, 'SKILLS.md'), '');
  system.log('You have successfully initialized llmon!');
};

export default init;
