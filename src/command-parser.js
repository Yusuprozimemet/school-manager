export function parseCommand(userInput) {
  // Match quoted strings (with or without spaces) OR unquoted tokens
  const parts = [];
  const regex = /"([^"]*?)"|(\S+)/g; // split by whitespace, convert to array
  // This regex captures either quoted strings (group 1) or unquoted tokens (group 2).
  let match;
  while ((match = regex.exec(userInput.trim())) !== null) {
    parts.push(match[1] !== undefined ? match[1] : match[2]); // If group 1 (quoted) is defined, use it; otherwise, use group 2 (unquoted).
  }

  const command = parts.at(0); // first part is the main command , course or trainee
  const subcommand = parts.at(1); // second part is the subcommand, e.g., getAll, add, update, delete, join, leave, fetchAll, fetch
  const args = parts.slice(2); // remaining parts are arguments, e.g., course ID, trainee ID, name, startDate, etc.

  return { command, subcommand, args };
}

/*

[
  {
    "id": 87421,
    "name": "Intro to JavaScript Course",
    "startDate": "2026-02-01",
    "participants": [
      12345,
      12346
    ]
  }
]

COURSE COMMANDS:
  course getAll                                → Get all courses
  course get <id>                              → Get a course by ID
  course add <name> <startDate>                → Add a new course (Format of startDate: YYYY-MM-DD)
  course update <id> <name> <startDate>        → Update a course (Format of startDate: YYYY-MM-DD)
  course delete <id>                           → Delete a course
  course join <courseId> <traineeId>           → Add trainee to course
  course leave <courseId> <traineeId>          → Remove trainee from course
*/

console.log(parseCommand('course add "test-python" "2026-01-01"'));
console.log(parseCommand('course getAll'));
console.log(parseCommand('course get 87421'));
console.log(parseCommand('course update 87421 "Intro to Python Course" "2026-01-15"'));
console.log(parseCommand('course delete 87421'));
console.log(parseCommand('course join 87421 12345'));
console.log(parseCommand('course leave 87421 12345'));


/*

[
  {
    "id": 12345,
    "firstName": "John",
    "lastName": "Doe"
  },
  {
    "id": 12346,
    "firstName": "Jane",
    "lastName": "Smith"
  },
  {
    "id": 12347,
    "firstName": "Yusup",
    "lastName": "Rozimemet"
  }
]
  
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

console.log(parseCommand('trainee add "Alice" "Johnson"'));
console.log(parseCommand('trainee fetchAll'));
console.log(parseCommand('trainee fetch 12345'));
console.log(parseCommand('trainee update 12345 "Joe" "Patrick"'));
console.log(parseCommand('trainee delete 12345'));