const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const markdownItFootnote = require('markdown-it-footnote');

const cwd = process.cwd();
const langs = ['en-us', 'zh-cn'];
const mdPageTypes = ['docs', 'blog'];
const siteConfigSource = fs.readFileSync(path.join(cwd, 'site_config/site.js'), 'utf8');
const getSiteConfigString = (key, fallback = '') => {
  const match = siteConfigSource.match(new RegExp(`${key}:\\s*['"]([^'"]*)['"]`));
  return match ? match[1] : fallback;
};
const rootPath = getSiteConfigString('rootPath');
const defaultLanguage = getSiteConfigString('defaultLanguage', 'zh-cn');
const pageMetaSource = fs.readFileSync(path.join(cwd, 'site_config/pageMeta.js'), 'utf8');
const pageMeta = Function(`${pageMetaSource.replace('export default', 'return')}`)();
const templatePath = path.join(cwd, 'template.ejs');
const redirectTemplatePath = path.join(cwd, 'redirect.ejs');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {
        console.warn(err);
      }
    }
    return '';
  },
}).use(markdownItFootnote);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function removeGenerated() {
  ['index.html', '404.html', 'md_json', ...langs].forEach((item) => {
    fs.rmSync(path.join(cwd, item), { recursive: true, force: true });
  });
}

function getPageMetaValue(page, language, key) {
  return pageMeta
    && pageMeta[page]
    && pageMeta[page][language]
    && pageMeta[page][language][key]
    ? pageMeta[page][language][key]
    : '';
}

function splitMetaAndContent(text) {
  const lines = text.split(/\r?\n/);
  if (!lines[0] || !lines[0].startsWith('---')) {
    return { header: '', content: text };
  }

  let end = 1;
  for (; end < lines.length; end += 1) {
    if (lines[end].startsWith('---')) break;
  }

  return {
    header: lines.slice(1, end).join('\n'),
    content: lines.slice(end + 1).join('\n'),
  };
}

function parseMeta(header) {
  const meta = {};
  header.split('\n').forEach((line) => {
    const kv = line.split(':');
    const key = (kv.shift() || '').trim();
    if (!key) return;
    meta[key] = kv.join(':').trim();
  });
  return meta;
}

function parseMd(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const splitData = splitMetaAndContent(text);
  return {
    meta: parseMeta(splitData.header),
    __html: md.render(splitData.content),
  };
}

function renderTemplate(data) {
  return ejs.render(fs.readFileSync(templatePath, 'utf8'), {
    rootPath,
    __html: '',
    ...data,
  });
}

function renderRedirects() {
  if (!fs.existsSync(redirectTemplatePath)) return;
  const html = ejs.render(fs.readFileSync(redirectTemplatePath, 'utf8'), {
    defaultLanguage,
    rootPath,
  });
  writeFile(path.join(cwd, '404.html'), html);
}

function renderRootHome() {
  writeFile(path.join(cwd, 'index.html'), renderTemplate({
    title: getPageMetaValue('home', defaultLanguage, 'title') || 'home',
    keywords: getPageMetaValue('home', defaultLanguage, 'keywords') || 'home',
    description: getPageMetaValue('home', defaultLanguage, 'description') || 'home',
    entryPath: '/src/pages/home/index.jsx',
  }));
}

function renderPage(language, page, subPage = '') {
  const htmlPath = page === 'home'
    ? path.join(cwd, language, 'index.html')
    : path.join(cwd, language, page, subPage, 'index.html');
  const title = getPageMetaValue(page, language, 'title') || subPage || page;
  const keywords = getPageMetaValue(page, language, 'keywords') || subPage || page;
  const description = getPageMetaValue(page, language, 'description') || subPage || page;
  const entryPath = subPage
    ? `/src/pages/${page}/${subPage}/index.jsx`
    : `/src/pages/${page}/index.jsx`;

  writeFile(htmlPath, renderTemplate({
    title,
    keywords,
    description,
    entryPath,
  }));
}

function renderTopLevelPages() {
  const pagesPath = path.join(cwd, 'src/pages');
  fs.readdirSync(pagesPath).forEach((page) => {
    const pagePath = path.join(pagesPath, page);
    if (!fs.statSync(pagePath).isDirectory()) return;

    langs.forEach((language) => {
      if (fs.existsSync(path.join(pagePath, 'index.jsx'))) {
        renderPage(language, page);
      }
      fs.readdirSync(pagePath).forEach((subPage) => {
        const subPagePath = path.join(pagePath, subPage);
        if (fs.existsSync(path.join(subPagePath, 'index.jsx'))) {
          renderPage(language, page, subPage);
        }
      });
    });
  });
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) return walkFiles(filePath);
    return [filePath];
  });
}

function renderMarkdownPages(type) {
  const data = {
    'en-us': [],
    'zh-cn': [],
  };

  langs.forEach((language) => {
    const sourceRoot = path.join(cwd, type, language);
    walkFiles(sourceRoot)
      .filter(filePath => ['.md', '.markdown'].includes(path.extname(filePath)))
      .forEach((filePath) => {
        const parsed = parseMd(filePath);
        const relative = path.relative(sourceRoot, filePath);
        const relativeDir = path.dirname(relative) === '.' ? '' : path.dirname(relative);
        const basename = path.basename(relative, path.extname(relative));
        const targetDir = path.join(cwd, language, type, relativeDir);
        const link = path.join('', language, type, relativeDir, `${basename}.html`).replace(/\\/g, '/');

        writeFile(path.join(targetDir, `${basename}.json`), JSON.stringify({
          filename: path.basename(filePath),
          __html: parsed.__html,
          link: `/${link}`,
          meta: parsed.meta,
        }, null, 2));

        writeFile(path.join(targetDir, `${basename}.html`), renderTemplate({
          title: parsed.meta.title || basename,
          keywords: parsed.meta.keywords || basename,
          description: parsed.meta.description || basename,
          entryPath: `/src/pages/${type}/index.md.jsx`,
        }));

        data[language].push({
          filename: path.basename(filePath),
          link: `/${link}`,
          meta: parsed.meta,
        });
      });
  });

  writeFile(path.join(cwd, 'md_json', `${type}.json`), JSON.stringify(data, null, 2));
}

removeGenerated();
renderRedirects();
renderRootHome();
renderTopLevelPages();
mdPageTypes.forEach(renderMarkdownPages);
