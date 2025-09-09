import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { intro, log, outro, spinner } from '@clack/prompts';
import { exec, execSyncOpts } from './utils.js';

const installDependencies = async () => {
  await exec('pnpm install', execSyncOpts);
};

const setupEnvironmentVariables = async () => {
  const files = [
    // { source: join('apps', 'api'), target: '.env.local' },
    // { source: join('apps', 'app'), target: '.env.local' },
    // { source: join('apps', 'web'), target: '.env.local' },
    // { source: join('packages', 'cms'), target: '.env.local' },
    { source: join('packages', 'database'), target: '.env' },
    // { source: join('packages', 'internationalization'), target: '.env.local' },
  ];

  for (const { source, target } of files) {
    await copyFile(join(source, '.env.example'), join(source, target));
  }
};

const setupOrm = async () => {
  const command = [
    'pnpm',
    'run',
    'build',
    '--filter',
    '@bokehboard/database',
  ].join(' ');

  await exec(command, execSyncOpts);
};

export const initialize = async () => {
  try {
    intro("Let's initialize your BokehBoard project!");

    const s = spinner();

    s.start();

    // s.message('Setting up environment variable files...');
    // await setupEnvironmentVariables();

    s.message('Installing dependencies...');
    await installDependencies();

    // s.message('Setting up ORM...');
    // await setupOrm();

    s.stop('Project initialized successfully!');

    outro(
      'Remember to set your environment variables in the `.env` files, then run `pnpm dx` before starting the project.'
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Failed to initialize project: ${error}`;

    log.error(message);
    process.exit(1);
  }
};
