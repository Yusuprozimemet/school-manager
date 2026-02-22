import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin, // Reads from standard input (keyboard/terminal)
  output: process.stdout, // Writes prompts/output to standard output (terminal)
});

function showHelp() {
  console.log(`
╬══════════════════════════════════════════════════════╗
║              School Manager CLI - Help               ║
╚══════════════════════════════════════════════════════╝

COURSE COMMANDS:
  course getAll                                → Get all courses
  course get <id>                              → Get a course by ID
  course add <name> <startDate>                → Add a new course (Format of startDate: YYYY-MM-DD)
  course update <id> <name> <startDate>        → Update a course (Format of startDate: YYYY-MM-DD)
  course delete <id>                           → Delete a course
  course join <courseId> <traineeId>           → Add trainee to course
  course leave <courseId> <traineeId>          → Remove trainee from course

TRAINEE COMMANDS:
  trainee fetchAll                             → Get all trainees
  trainee fetch <id>                           → Get a trainee by ID
  trainee add <firstName> <lastName>           → Add a new trainee
  trainee update <id> <firstName> <lastName>   → Update a trainee
  trainee delete <id>                          → Delete a trainee

OTHER:
  help                                         → Show this help menu
  exit                                         → Quit the application
  `);
}

function prompt() {
  rl.question('Enter command: ', (answer) => {
    try {
      // Clean the input
      let input = answer.trim();

      // Exit
      if (input === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      // Help
      if (input === 'help') {
        showHelp();
        prompt(); // Ask again
        return;
      }

      // Parse and run command
      let cmd = parseCommand(input);

      let result;
      if (cmd.command === 'course') {
        result = handleCourseCommand(cmd.subcommand, cmd.args);
      } else if (cmd.command === 'trainee') {
        result = handleTraineeCommand(cmd.subcommand, cmd.args);
      } else {
        console.log('❌ Wrong command. Type "help"');
      }

      // Show result if we have one
      if (result) console.log(result);

      // Ask for next command
      prompt();
    } catch (error) {
      console.log('😅 Something went wrong! Try again.');
      prompt(); // Ask again
    }
  });
}

console.log(`
╬═══════════════════════════════════════════════════════╗
║                                                       ║
║        🎓  School Manager CLI  🎓                     ║
║                                                       ║
║   Manage your courses and trainees with ease!         ║
║                                                       ║
║   Type  "help"  to see all available commands         ║
║   Type  "exit"  to quit                               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);

prompt();
