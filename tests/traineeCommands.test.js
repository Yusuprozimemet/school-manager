import { describe, expect, test } from 'vitest';
import { addTrainee, updateTrainee, deleteTrainee, fetchTrainee, fetchAllTrainees } from '../src/traineeCommands.js';



describe('Fetch Specific Trainee', () => {
  test('fetches a trainee by ID correctly', () => {
    // Arrange
    const traineeId = 12345;
    
    // Act
    const trainee = fetchTrainee(traineeId);
    
    // Assert
    expect(trainee).toBeDefined();
    expect(trainee.id).toBe(12345);
    expect(trainee.firstName).toBe('John');
  });
});

describe('Fetch All Trainees', () => {
  test('fetches all trainees correctly', () => {
    // Arrange - no setup needed for read-only operation
    
    // Act
    const allTrainees = fetchAllTrainees();
    
    // Assert
    expect(Array.isArray(allTrainees)).toBe(true);
    expect(allTrainees.length).toBeGreaterThan(0);
    expect(allTrainees[0].id).toBe(12345);
  });
});


describe('Add Trainee', () => {
  test('adds a trainee correctly', () => {
    // Arrange
    const traineesBefore = fetchAllTrainees();
    
    // Act
    addTrainee('tester', 'tester@example.com');
    const traineesAfter = fetchAllTrainees();
    
    // Assert
    expect(traineesAfter.length).toBe(traineesBefore.length + 1);
    const newTrainee = traineesAfter.find(trainee => trainee.name === 'tester');
    expect(newTrainee).toBeDefined();
    expect(newTrainee.email).toBe('tester@example.com');
  });
});

describe('Update Trainee', () => {
  test('updates a trainee correctly', () => {
    // Arrange
    const idToUpdate = 12347; 
    const traineeBefore = fetchTrainee(idToUpdate);
    
    // Act
    updateTrainee(idToUpdate, 'tester', 'tester@example.com');
    const traineeAfter = fetchTrainee(idToUpdate);
    
    // Assert
    expect(traineeBefore).toBeDefined(); 
    expect(traineeAfter.name).toBe('tester');
    expect(traineeAfter.email).toBe('tester@example.com');
  });
});

describe('Delete Trainee', () => {
  test('deletes a trainee correctly', () => {
    // Arrange
    const traineesBefore = fetchAllTrainees();
    const idToDelete = traineesBefore[traineesBefore.length - 1].id;
    const traineeBefore = fetchTrainee(idToDelete);
    
    // Act
    deleteTrainee(idToDelete);
    const traineesAfter = fetchAllTrainees();
    const traineeAfter = fetchTrainee(idToDelete);
    
    // Assert
    expect(traineeBefore).toBeDefined();
    expect(traineesAfter.length).toBe(traineesBefore.length - 1);
    expect(traineeAfter).toBeUndefined();
  });
});