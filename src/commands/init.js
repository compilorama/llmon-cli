import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const init = () => {
  const dir = join(homedir(), 'llmon');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'AGENTS.md'), '');
  writeFileSync(join(dir, 'SKILLS.md'), '');
};

export default init;
