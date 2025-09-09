import { type ExecSyncOptions, exec as execRaw } from 'node:child_process';
import { promisify } from 'node:util';

export const execSyncOpts: ExecSyncOptions = { stdio: 'ignore' };

export const exec = promisify(execRaw);
