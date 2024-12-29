import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

// Logger utility
class Logger {
  private logFile: string;

  constructor(logFileName: string = 'build_test.log') {
    this.logFile = path.join(process.cwd(), logFileName);
    this.initializeLogFile();
  }

  private initializeLogFile() {
    if (!fs.existsSync(this.logFile)) {
      fs.writeFileSync(this.logFile, `Build Test Log Initialized: ${new Date().toISOString()}\n`);
    }
  }

  log(message: string) {
    const logEntry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.logFile, logEntry);
    console.log(message);
  }

  success(message: string) {
    this.log(chalk.green(`SUCCESS: ${message}`));
  }

  warn(message: string) {
    this.log(chalk.yellow(`WARNING: ${message}`));
  }

  error(message: string) {
    this.log(chalk.red(`ERROR: ${message}`));
  }
}

const logger = new Logger();

// Utility to run shell commands
function runCommand(command: string, description: string) {
  logger.log(`Running: ${description}`);
  try {
    const output = execSync(command, { stdio: 'pipe', encoding: 'utf-8' });
    logger.success(`${description} - Completed`);
    logger.log(output);
  } catch (error: any) {
    logger.error(`${description} - Failed`);
    logger.log(error.stdout || error.message);
    throw new Error(`${description} failed`);
  }
}

// Automated tests
function testBuildProcess() {
  try {
    logger.log('Starting automated build tests...');

    // Step 1: Check dependencies
    runCommand('npm install', 'Installing dependencies');
    logger.success('Dependencies are up to date.');

    // Step 2: Lint the project
    runCommand('npx eslint . --ext .js,.ts,.tsx', 'Running linting');
    logger.success('Linting passed without issues.');

    // Step 3: Run unit tests
    runCommand('npx jest', 'Running unit tests');
    logger.success('All unit tests passed.');

    // Step 4: Build the project
    runCommand('npm run build', 'Building the project');
    logger.success('Project built successfully.');

    // Step 5: Check for issues in the built files
    const buildDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(buildDir)) {
      logger.error('Build directory not found. Build process might have failed.');
    } else {
      logger.success('Build directory found.');
    }

    // Step 6: Suggest changes based on logs
    suggestChanges();

    logger.success('Build process completed successfully.');
  } catch (error) {
    logger.error('Automated build testing failed.');
    logger.log(error.message);
  }
}

// Suggest changes based on logs
function suggestChanges() {
  const issues = [];

  if (!fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
    issues.push('TypeScript configuration file (tsconfig.json) is missing.');
  }

  if (!fs.existsSync(path.join(process.cwd(), '.eslintrc.js'))) {
    issues.push('ESLint configuration file (.eslintrc.js) is missing.');
  }

  if (!fs.existsSync(path.join(process.cwd(), 'next.config.js'))) {
    issues.push('Next.js configuration file (next.config.js) is missing.');
  }

  if (issues.length > 0) {
    logger.warn('The following changes are needed to improve the build process:');
    issues.forEach((issue, index) => logger.warn(`${index + 1}. ${issue}`));
  } else {
    logger.success('No issues found. Your project setup looks good!');
  }
}

// Execute the build testing process
testBuildProcess();

