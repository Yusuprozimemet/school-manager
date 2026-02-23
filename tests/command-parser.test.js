
import { describe, expect, test } from 'vitest';
import { parseCommand } from '../src/command-parser.js';

/*
//course.json
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

// trainees.json

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

describe ('getAll courses command', () => {
  test('should parse "course getAll" command correctly', () => {
    // Arrange
    const input = 'course getAll';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'getAll', args: [] });
  });
});

describe ('get course by ID command', () => {
  test('should parse "course get <id>" command correctly', () => {
    // Arrange
    const input = 'course get 87421';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'get', args: ['87421'] });
  });
});

describe ('add course command', () => {
  test('should parse "course add <name> <startDate>" command correctly', () => {
    // Arrange
    const input = 'course add "Presentation Skills" "2026-02-01"';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'add', args: ['Presentation Skills', '2026-02-01'] });
  });
});

describe ('update course command', () => {
  test('should parse "course update <id> <name> <startDate>" command correctly', () => {
    // Arrange
    const input = 'course update 87421 "Advanced JavaScript" "2026-03-01"';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'update', args: ['87421', 'Advanced JavaScript', '2026-03-01'] });
  });
});

describe ('delete course command', () => {
  test('should parse "course delete <id>" command correctly', () => {
    // Arrange
    const input = 'course delete 87421';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'delete', args: ['87421'] });
  });
});

describe ('join course command', () => {
  test('should parse "course join <courseId> <traineeId>" command correctly', () => {
    // Arrange
    const input = 'course join 87421 12345';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'join', args: ['87421', '12345'] });
  });
});

describe ('leave course command', () => {
  test('should parse "course leave <courseId> <traineeId>" command correctly', () => {
    // Arrange
    const input = 'course leave 87421 12345';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'course', action: 'leave', args: ['87421', '12345'] });
  });
});

describe ('fetch all trainees command', () => {
  test('should parse "trainee fetchAll" command correctly', () => {
    // Arrange
    const input = 'trainee fetchAll';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'trainee', action: 'fetchAll', args: [] });
  });
});

describe ('fetch trainee by ID command', () => {
  test('should parse "trainee fetch <id>" command correctly', () => {
    // Arrange
    const input = 'trainee fetch 12345';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'trainee', action: 'fetch', args: ['12345'] });
  });
});

describe ('add trainee command', () => {
  test('should parse "trainee add <firstName> <lastName>" command correctly', () => {
    // Arrange
    const input = 'trainee add "Alice" "Johnson"';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'trainee', action: 'add', args: ['Alice', 'Johnson'] });
  });
});

describe ('update trainee command', () => {
  test('should parse "trainee update <id> <firstName> <lastName>" command correctly', () => {
    // Arrange
    const input = 'trainee update 12345 "Alice" "Johnson"';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'trainee', action: 'update', args: ['12345', 'Alice', 'Johnson'] });
  });
});

describe ('delete trainee command', () => {
  test('should parse "trainee delete <id>" command correctly', () => {
    // Arrange
    const input = 'trainee delete 12345';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'trainee', action: 'delete', args: ['12345'] });
  });
});

describe ('help command', () => {
  test('should parse "help" command correctly', () => {
    // Arrange
    const input = 'help';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'help', action: null, args: [] });
  });
});

describe ('exit command', () => {
  test('should parse "exit" command correctly', () => {
    // Arrange
    const input = 'exit';
    // Act
    const result = parseCommand(input);
    // Assert
    expect(result).toEqual({ entity: 'exit', action: null, args: [] });
  });
});