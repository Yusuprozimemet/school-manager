import { describe, expect, test } from 'vitest';
import * as StorageFunctions from '../src/storage.js';

describe('Load Trainee Data', () => {
  test('loads trainee data correctly', () => {
    const data = StorageFunctions.loadTraineeData();
    expect(data).toBeInstanceOf(Array);
  });
});

describe('Load Course Data', () => {
  test('loads course data correctly', () => {
    const data = StorageFunctions.loadCourseData();
    expect(data).toBeInstanceOf(Array);
  });
  
});

describe('Save Trainee Data', () => {
  test('saves trainee data correctly', () => {
    const data = StorageFunctions.loadTraineeData();
    expect(data).toBeInstanceOf(Array);
  });
});

describe('Save Course Data', () => {
  test('saves course data correctly', () => {
    const data = StorageFunctions.loadCourseData();
    expect(data).toBeInstanceOf(Array);
  });
});