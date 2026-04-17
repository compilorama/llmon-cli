import { symlinkSync, writeFileSync, appendFileSync } from 'fs';
import { resolve, join } from 'path';
import { homedir } from 'os';

const CURSORRULES_CONTENT = `Follow all instructions in:

./.llmon/AGENTS.md
./.llmon/SKILLS.md

These define behavior, coding standards, and capabilities.
`;

const harness = (dir) => {
  const targetDir = resolve(dir);
  const llmonHome = join(homedir(), 'llmon');

  symlinkSync(llmonHome, join(targetDir, '.llmon'));
  writeFileSync(join(targetDir, '.cursorrules'), CURSORRULES_CONTENT);

  const excludePath = join(targetDir, '.git', 'info', 'exclude');
  appendFileSync(excludePath, '\n.llmon\n');
};

export default harness;
