#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 拓展类型Map
const EXT_MAP = {
  '.tsx': 'tsx',
  '.ts': 'ts',
  '.jsx': 'jsx',
  '.js': 'js',
  '.css': 'css',
  '.scss': 'scss',
  '.json': 'json',
};

function getCodeExtension(filePath) {
  const ext = path.extname(filePath);

  return EXT_MAP[ext] || 'text';
}

// 获取文件名
function getRelativeFileName(filePath, basePath) {
  return path.relative(basePath, filePath);
}

// 生成 tabs
function generateTabs(dirPath) {
  const files = [];

  function collectFiles(currentPath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentPath, item.name);

      if (item.isDirectory()) {
        collectFiles(fullPath);
      } else if (item.isFile() && /\.(tsx?|jsx?|css|scss|json)$/.test(item.name)) {
        files.unshift(fullPath);
      }
    }
  }

  collectFiles(dirPath);

  if (files.length === 0) {
    return '';
  }

  let tabsContent = '<Tabs>\n';

  for (const filePath of files) {
    const fileName = getRelativeFileName(filePath, dirPath);
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = getCodeExtension(filePath);

    tabsContent += `  <TabItem label="${fileName}">\n`;
    tabsContent += `    \`\`\`${ext}\n`;
    tabsContent += content
      .split('\n')
      .map((line) => `    ${line}`)
      .join('\n');
    tabsContent += '\n    ```\n';
    tabsContent += `  </TabItem>\n`;
  }

  tabsContent += '</Tabs>';

  return tabsContent;
}

// 生成预览
function generatePreview(dirPath) {
  // 组件入口路径
  const indexPath = path.join(dirPath, 'index.tsx');
  // 组件名 - 驼峰
  const Comp = path
    .basename(dirPath)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  if (!fs.existsSync(indexPath)) {
    throw new Error(`index.tsx not found in ${dirPath}`);
  }

  const relativeDemoPath = path.relative('src/', dirPath).replace(/\\/g, '/');
  const demoImportPath = `@/${relativeDemoPath}`;

  return `import ${Comp} from "${demoImportPath}"
import Preview from '@/components/preview';
import { Tabs, TabItem } from '@/components/tabs';

<Preview>
  <${Comp} />
</Preview>`;
}

// 复制到剪贴板
function copyToClipboard(text) {
  try {
    const platform = process.platform;
    if (platform === 'darwin') {
      execSync('pbcopy', { input: text });
    } else if (platform === 'linux') {
      execSync('xclip -selection clipboard', { input: text });
    } else if (platform === 'win32') {
      execSync('clip', { input: text });
    } else {
      console.log('Clipboard not supported on this platform');
      return false;
    }
    return true;
  } catch (error) {
    console.log('Failed to copy to clipboard:', error.message);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node gen-preview-code.js <path-to-demo-directory> [options]');
    console.log('\nOptions:');
    console.log('  --preview-only, -p    Generate preview only');
    console.log('  --tabs-only, -t       Generate tabs only');
    console.log('  (default)             Generate both preview and tabs');
    process.exit(1);
  }

  // 解析选项
  let previewOnly = false;
  let tabsOnly = false;
  let demoPath = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--preview-only' || arg === '-p') {
      previewOnly = true;
    } else if (arg === '--tabs-only' || arg === '-t') {
      tabsOnly = true;
    } else if (!arg.startsWith('-')) {
      demoPath = arg;
    }
  }

  // 如果同时指定了两个选项，报错
  if (previewOnly && tabsOnly) {
    console.error('Error: Cannot specify both --preview-only and --tabs-only');
    process.exit(1);
  }

  // 如果没有指定路径，报错
  if (!demoPath) {
    console.error('Error: Demo directory path is required');
    process.exit(1);
  }

  if (!fs.existsSync(demoPath)) {
    console.error(`Directory not found: ${demoPath}`);
    process.exit(1);
  }

  if (!fs.statSync(demoPath).isDirectory()) {
    console.error(`Not a directory: ${demoPath}`);
    process.exit(1);
  }

  try {
    const parts = [];

    if (previewOnly) {
      console.log('Generating preview content...');
      const previewContent = generatePreview(demoPath);
      parts.push(previewContent);
    } else if (tabsOnly) {
      console.log('Generating tabs content...');
      const tabsContent = generateTabs(demoPath);
      if (tabsContent) {
        parts.push(tabsContent);
      } else {
        console.warn('Warning: No code files found to generate tabs');
      }
    } else {
      console.log('Generating preview and tabs content...');
      const previewContent = generatePreview(demoPath);
      const tabsContent = generateTabs(demoPath);
      parts.push(previewContent);
      if (tabsContent) {
        parts.push(tabsContent);
      }
    }

    const fullContent = parts.join('\n\n');

    console.log('\n--- Generated Content ---\n');
    console.log(fullContent);
    console.log('\n--- End of Content ---\n');

    if (copyToClipboard(fullContent)) {
      console.log('✓ Content copied to clipboard!');
    } else {
      console.log('✗ Failed to copy to clipboard');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
