const fs = require('node:fs');
const path = require('node:path');

const cwd = process.cwd();
const dist = path.join(cwd, 'dist');

function copyDir(source, target, filter = () => true) {
  if (!fs.existsSync(source)) return;
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    fs.readdirSync(source).forEach((name) => {
      copyDir(path.join(source, name), path.join(target, name), filter);
    });
    return;
  }
  if (!filter(source)) return;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyJsonFiles(sourceRoot, targetRoot) {
  if (!fs.existsSync(sourceRoot)) return;
  fs.readdirSync(sourceRoot).forEach((name) => {
    const source = path.join(sourceRoot, name);
    const target = path.join(targetRoot, name);
    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
      copyJsonFiles(source, target);
    } else if (path.extname(name) === '.json') {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);
    }
  });
}

const skipMarkdown = filePath => !['.md', '.markdown'].includes(path.extname(filePath));

copyDir(path.join(cwd, 'img'), path.join(dist, 'img'));
copyDir(path.join(cwd, 'docs'), path.join(dist, 'docs'), skipMarkdown);
copyDir(path.join(cwd, 'blog'), path.join(dist, 'blog'), skipMarkdown);
copyJsonFiles(path.join(cwd, 'zh-cn'), path.join(dist, 'zh-cn'));
copyJsonFiles(path.join(cwd, 'en-us'), path.join(dist, 'en-us'));
copyJsonFiles(path.join(cwd, 'md_json'), path.join(dist, 'md_json'));
