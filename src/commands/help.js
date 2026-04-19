import system from '../services/system';

const help = () => {
  const docPath = system.pathJoin(__dirname, '../docs/help.txt');
  const content = system.fsReadFileSync(docPath, 'utf8');
  system.log(content);
};

export default help;
