import { describe, expect, test, vi } from 'vitest';
import { prompt } from '../src/index.js';
import chalk from 'chalk';


describe ('print banner', () => {
  test('should print welcome banner', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Act
    console.log(chalk.cyan.bold('\n  Welcome to School CLI! Type "help" to see available commands.\n'));
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(chalk.cyan.bold('\n  Welcome to School CLI! Type "help" to see available commands.\n'));
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
    expect(rl.question).toHaveBeenCalledWith(chalk.bold.cyan('  › '), expect.any(Function));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.cyan('\n  Thank you for using School CLI.\n'));
    expect(rl.close).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});