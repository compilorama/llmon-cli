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
  const homeDir = system.osHomedir();
  const shouldWriteCursorRules = system.fsExistsSync(system.pathJoin(homeDir, '.cursor'));
  system.fsSymlinkSync(system.pathJoin(homeDir, 'llmon'), targetLlmon);
  if (shouldWriteCursorRules) writeCursorRules(targetDir);
  if (system.fsExistsSync(system.pathJoin(targetDir, '.git'))) excludeFromGit(targetDir, shouldWriteCursorRules);
  system.log(`You have successfully harnessed the directory ${targetDir}`);
}

function writeCursorRules(targetDir){
  system.fsWriteFileSync(system.pathJoin(targetDir, '.cursorrules'), getCursorRulesContent());
}

function excludeFromGit(targetDir, shouldExcludeCursorRules){
  const excludePath = system.pathJoin(targetDir, '.git', 'info', 'exclude');
  const entries = shouldExcludeCursorRules ? ['.llmon', '.cursorrules'] : ['.llmon'];
  system.fsAppendFileSync(excludePath, `\n${entries.join('\n')}\n`);
}

function getCursorRulesContent(){
  return `Follow all instructions in:

./.llmon/AGENTS.md
./.llmon/SKILLS.md

These define behavior, coding standards, and capabilities.
`;
}

export default harness;
