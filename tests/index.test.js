import { describe, expect, test, vi } from 'vitest';
import { showHelp, prompt } from '../src/index.js';

describe('Help Command', () => {
  test('should display the help menu when "help" command is entered', () => {
    // Arrange
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Act
    showHelp();
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(`
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
    consoleSpy.mockRestore();
  });
});

describe('prompt function', () => {
  test('should prompt user for input and handle "exit" command', () => {
    // Arrange
    const rl = { question: vi.fn((question, callback) => {
        callback('exit');
      }),
      close: vi.fn()
    };
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Act
    prompt(rl);
    // Assert
    expect(rl.question).toHaveBeenCalledWith('Enter command: ', expect.any(Function));
    expect(consoleSpy).toHaveBeenCalledWith('Goodbye!');
    expect(rl.close).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});