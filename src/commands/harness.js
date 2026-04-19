import system from '../services/system';

const harness = directory => {
  const targetDir = system.pathResolve(directory);
  const targetLlmon = system.pathJoin(targetDir, '.llmon');
  if (system.fsExistsSync(targetLlmon)) {
    system.log(`The directory ${targetDir} had been harnessed already`);
    return;
  }
  applyHarness(targetDir, targetLlmon);
};

function applyHarness(targetDir, targetLlmon){
  const llmonHome = system.pathJoin(system.osHomedir(), 'llmon');
  const excludePath = system.pathJoin(targetDir, '.git', 'info', 'exclude');
  system.fsSymlinkSync(llmonHome, targetLlmon);
  system.fsWriteFileSync(system.pathJoin(targetDir, '.cursorrules'), getCursorRulesContent());
  system.fsAppendFileSync(excludePath, '\n.llmon\n.cursorrules\n');
  system.log(`You have successfully harnessed the directory ${targetDir}`);
}

function getCursorRulesContent(){
  return `Follow all instructions in:

./.llmon/AGENTS.md
./.llmon/SKILLS.md

These define behavior, coding standards, and capabilities.
`;
}

export default harness;
