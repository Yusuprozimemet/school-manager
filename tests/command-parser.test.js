
import { describe, expect, test } from 'vitest';
import { parseCommand } from '../src/command-parser.js';

describe('parseCommand', () => {
  test('parses command with subcommand and arguments', () => {
    const result = parseCommand('course add "python" "2024-01-01"');
    expect(result).toEqual({
      command: 'course',
      subcommand: 'add',
      args: ['python', '2024-01-01'],
    });
  });

  test('parses command with only command and subcommand', () => {
    const result = parseCommand('course getAll');
    expect(result).toEqual({
      command: 'course',
      subcommand: 'getAll',
      args: [],
    });
  });

  test('parses command with quoted arguments containing spaces', () => {
    const result = parseCommand('course add "Advanced Python" "2024-01-01"');
    expect(result).toEqual({
      command: 'course',
      subcommand: 'add',
      args: ['Advanced Python', '2024-01-01'],
    });
  });

  test('parses update command with multi-word quoted name', () => {
    const result = parseCommand('course update 87421 "Intro to Python Course" "2026-01-15"');
    expect(result).toEqual({
      command: 'course',
      subcommand: 'update',
      args: ['87421', 'Intro to Python Course', '2026-01-15'],
    });
  });

  test('parses unquoted numeric arguments', () => {
    const result = parseCommand('course join 87421 12345');
    expect(result).toEqual({
      command: 'course',
      subcommand: 'join',
      args: ['87421', '12345'],
    });
  });
});