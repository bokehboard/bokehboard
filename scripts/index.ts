#!/usr/bin/env node

import { program } from 'commander';
import { initialize } from './initialize.js';

program
  .command('init')
  .description('Initialize the bokehboard repository after cloning')
  .action(initialize);

program.parse(process.argv);
