import system from '../services/system';

const version = () => {
  const pkgPath = system.pathJoin(__dirname, '../../package.json');
  const content = system.fsReadFileSync(pkgPath, 'utf8');
  system.log(JSON.parse(content).version);
};

export default version;
