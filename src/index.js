import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import * as readline from 'readline'; // Use ES module syntax for readline
import { fileURLToPath } from 'url'; // Needed to get __filename in ES modules

const rl = readline.createInterface({
  input: process.stdin, // Use process.stdin for input
  output: process.stdout, // Use process.stdout for output
});

export function showHelp() {
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

export function prompt(customRl) {
  const rlToUse = customRl || rl; // Use the provided readline interface or the default one
  rlToUse.question('Enter command: ', (answer) => {
    try {
      let input = answer.trim();

      if (input === 'exit') {
        console.log('Goodbye!');
        rlToUse.close();
        return;
      }

      if (input === 'help') {
        showHelp();
        prompt(rlToUse);
        return;
      }

      let cmd = parseCommand(input);

      let result;
      if (cmd.entity === 'course') {
        result = handleCourseCommand(cmd.action, cmd.args);
      } else if (cmd.entity === 'trainee') {
        result = handleTraineeCommand(cmd.action, cmd.args);
      } else {
        console.log('❌ Wrong command. Type "help"');
      }

      if (result) console.log(result);

      prompt(rlToUse);
    } catch (error) {
      console.log('😅 Something went wrong! Try again.');
      prompt(rlToUse);
    }
  });
}

// Only run CLI when this file is executed directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
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
}
