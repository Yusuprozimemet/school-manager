import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import * as readline from 'readline'; // Use ES module syntax for readline
import { fileURLToPath } from 'url'; // Needed to get __filename in ES modules
import chalk from 'chalk'; // For colored terminal output
import figlet from 'figlet'; // For ASCII art banners
import Table from 'cli-table3'; // For nice table formatting in the terminal

function printBanner() {
  console.log(chalk.cyan(figlet.textSync('School CLI', { font: 'Slant' })));
  console.log(chalk.dim('  Manage your courses and trainees with ease!\n'));
}

export function showHelp() {
  console.log(
    chalk.bold.cyan(
      '\n╔══════════════════════════════════════════════════════╗'
    )
  );
  console.log(
    chalk.bold.cyan('║          School CLI  —  Help Menu                    ║')
  );
  console.log(
    chalk.bold.cyan(
      '╚══════════════════════════════════════════════════════╝\n'
    )
  );

  console.log(chalk.bold.cyan('  COURSE COMMANDS'));
  [
    ['course getAll', 'Get all courses'],
    ['course get <id>', 'Get a course by ID'],
    ['course add <CourseName> <startDate>', 'Add a new course (YYYY-MM-DD)'],
    [
      'course update <id> <CourseName> <startDate>',
      'Update a course (YYYY-MM-DD)',
    ],
    ['course delete <id>', 'Delete a course'],
    ['course join <courseId> <traineeId>', 'Add trainee to course'],
    ['course leave <courseId> <traineeId>', 'Remove trainee from course'],
  ].forEach(([cmd, desc]) =>
    console.log(`  ${chalk.green(cmd.padEnd(45))} ${chalk.dim(desc)}`)
  );

  console.log(chalk.bold.cyan('\n  TRAINEE COMMANDS'));
  [
    ['trainee fetchAll', 'Get all trainees'],
    ['trainee fetch <id>', 'Get a trainee by ID'],
    ['trainee add <firstName> <lastName>', 'Add a new trainee'],
    ['trainee update <id> <firstName> <lastName>', 'Update a trainee'],
    ['trainee delete <id>', 'Delete a trainee'],
  ].forEach(([cmd, desc]) =>
    console.log(`  ${chalk.green(cmd.padEnd(45))} ${chalk.dim(desc)}`)
  );

  console.log(chalk.bold.cyan('\n  OTHER'));
  console.log(
    `  ${chalk.green('help'.padEnd(45))} ${chalk.dim('Show this help menu')}`
  );
  console.log(
    `  ${chalk.green('exit'.padEnd(45))} ${chalk.dim('Quit the application')}`
  );
  console.log();
}

function printResult(result) {
  if (!result) return;

  // Array of objects → full table
  if (
    Array.isArray(result) &&
    result.length > 0 &&
    typeof result[0] === 'object'
  ) {
    const table = new Table({
      head: Object.keys(result[0]).map((k) => chalk.bold.cyan(k)),
      style: { border: ['dim'] },
    });
    result.forEach((row) =>
      table.push(Object.values(row).map((v) => String(v ?? '')))
    );
    console.log(table.toString());
    return;
  }

  // Single object → key/value table
  if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
    const table = new Table({ style: { border: ['dim'] } });
    Object.entries(result).forEach(([k, v]) =>
      table.push({ [chalk.bold.cyan(k)]: String(v ?? '') })
    );
    console.log(table.toString());
    return;
  }

  // Plain string / number
  console.log(chalk.white(result));
}

export function prompt(customRl) {
  const rl =
    customRl ||
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

  rl.question(chalk.bold.cyan('  › '), (answer) => {
    const input = answer.trim();

    if (!input) {
      prompt(rl);
      return;
    }

    if (input === 'exit') {
      console.log(chalk.cyan('\n  Thank you for using School CLI.\n'));
      rl.close();
      return;
    }

    if (input === 'help') {
      showHelp();
      prompt(rl);
      return;
    }

    try {
      const cmd = parseCommand(input);

      let result;
      if (cmd.entity === 'course') {
        result = handleCourseCommand(cmd.action, cmd.args);
      } else if (cmd.entity === 'trainee') {
        result = handleTraineeCommand(cmd.action, cmd.args);
      } else {
        console.log(
          chalk.red(
            '\n  ERROR: Unknown command. Type "help" to see available commands.\n'
          )
        );
        prompt(rl);
        return;
      }

      console.log(chalk.green('\n  SUCCESS: Command completed.\n'));
      printResult(result);
    } catch (error) {
      console.log(
        chalk.red(`\n  ERROR: Something went wrong: ${error.message}\n`)
      );
    }

    console.log();
    prompt(rl);
  });
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const help = chalk.bold.green('help');
  const exit = chalk.bold.red('exit');
  printBanner();
  console.log(chalk.dim(`  Type ${help} for commands, ${exit} to quit.\n`));
  prompt();
}
