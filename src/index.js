import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import promptSync from 'prompt-sync';


/*
COURSE COMMANDS:
  course getAll                                → Get all courses
  course get <id>                              → Get a course by ID
  course add <name> <startDate>                → Add a new course (Format of startDate/courseName: YYYY-MM-DD/course-name)
  course update <id> <name> <startDate>        → Update a course (Format of startDate/courseName: YYYY-MM-DD/course-name)
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

*/


const prompt = promptSync();

console.log('Welcome to the School Manager CLI!');
console.log('Type "help" for a list of commands, or "exit" to quit.');

while (true) {
  const userInput = prompt('> ');
  if (userInput.toLowerCase() === 'exit') {
    console.log('Thanks for using the School Manager CLI. Goodbye!');
    break;
  }

  if (userInput.toLowerCase() === 'help') {
    console.log('\n');
    console.log('course getAll                                             →  get all courses');
    console.log('course get <id>                                           →  get a course by ID');
    console.log('course add <name> <startDate>                             →  add a new course (Format of startDate/courseName: YYYY-MM-DD/course-name)');
    console.log('course update <id> <name> <startDate>                     →  update a course (Format of startDate/courseName: YYYY-MM-DD/course-name)');
    console.log('course delete <id>                                        →  delete a course');
    console.log('course join <courseId> <traineeId>                        →  add trainee to course');
    console.log('course leave <courseId> <traineeId>                       →  remove trainee from course');
    console.log('trainee fetchAll                                          →  get all trainees');
    console.log('trainee fetch <id>                                        →  get a trainee by ID');
    console.log('trainee add <firstName> <lastName>                        →  add a new trainee');
    console.log('trainee update <id> <firstName> <lastName>                →  update a trainee');
    console.log('trainee delete <id>                                       →  delete a trainee');
    console.log('\n');
    continue;
  }


  const { entity, action, args } = parseCommand(userInput);

  if (entity === 'course') {
    const result = handleCourseCommand(action, args);
    if (result !== undefined && result !== null) console.log(result);
  } else if (entity === 'trainee') {
    const result = handleTraineeCommand(action, args);
    if (result !== undefined && result !== null) console.log(result);
  } else {
    console.log('ERROR: Invalid command. Type "help" for a list of commands.');
  }

}
