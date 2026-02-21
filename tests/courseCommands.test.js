import { describe, expect, test } from 'vitest';
import * as courseCommands from '../src/courseCommands.js'; 

describe('get all courses', () => {
  test('should return an array of courses', () => {
    // Act
    const courses = courseCommands.getAllCourses();
    
    // Assert
    expect(Array.isArray(courses)).toBe(true);
  });

  test('should return courses with correct properties', () => {
    // Act
    const courses = courseCommands.getAllCourses();
    
    // Assert
    courses.forEach(course => {
      expect(course).toHaveProperty('id');
      expect(course).toHaveProperty('name');
      expect(course).toHaveProperty('startDate');
      expect(course).toHaveProperty('participants');
    });
  });
});

describe('add course', () => {
  test('should add a new course', () => {
    // Arrange
    const beforeCourses = courseCommands.getAllCourses();
    
    // Act
    courseCommands.addCourse('Test Course', '2024-01-01');
    const newCourse = courseCommands.getAllCourses().slice(-1)[0];
    
    // Assert
    expect(newCourse.name).toBe('Test Course');
    expect(newCourse.startDate).toBe('2024-01-01');
    
    // Cleanup
    courseCommands.deleteCourse(newCourse.id);
  });
});

describe('get course', () => {
  test('should return correct course by id', () => {
    // Arrange
    const courses = courseCommands.getAllCourses();
    const course = courses[0];
    
    // Act
    const foundCourse = courseCommands.getCourse(course.id);
    
    // Assert
    expect(foundCourse).toEqual(course);
  });
});

describe('update course', () => {
  test('should update existing course', () => {
    // Arrange
    const courses = courseCommands.getAllCourses();
    const course = courses[0];
    
    // Act
    courseCommands.updateCourse(course.id, 'New Name', '2024-03-01');
    const updatedCourse = courseCommands.getCourse(course.id);
    
    // Assert
    expect(updatedCourse.name).toBe('New Name');
    expect(updatedCourse.startDate).toBe('2024-03-01');
    
    // Cleanup - restore original
    courseCommands.updateCourse(course.id, course.name, course.startDate);
  });
});

describe('delete course', () => {
  test('should delete existing course', () => {
    // Arrange - create test course
    courseCommands.addCourse('Delete Test', '2024-01-01');
    const newCourse = courseCommands.getAllCourses().slice(-1)[0];
    
    // Act
    courseCommands.deleteCourse(newCourse.id);
    
    // Assert
    const courses = courseCommands.getAllCourses();
    const deleted = courses.find(c => c.id === newCourse.id);
    expect(deleted).toBeUndefined();
  });
});

describe('join course', () => {
  test('should add trainee to course', () => {
    // Arrange - create test course
    courseCommands.addCourse('Join Test', '2024-01-01');
    const course = courseCommands.getAllCourses().slice(-1)[0];
    const traineeId = 12345;
    
    // Act
    courseCommands.joinCourse(course.id, [traineeId]);
    const updatedCourse = courseCommands.getCourse(course.id);
    
    // Assert
    expect(updatedCourse.participants).toContain(traineeId);
    
    // Cleanup
    courseCommands.deleteCourse(course.id);
  });
});

describe('leave course', () => {
  test('should remove trainee from course', () => {
    // Arrange - create course with trainee
    courseCommands.addCourse('Leave Test', '2024-01-01');
    const course = courseCommands.getAllCourses().slice(-1)[0];
    const traineeId = 12345;
    courseCommands.joinCourse(course.id, [traineeId]);
    
    // Act
    courseCommands.leaveCourse(course.id, [traineeId]);
    const updatedCourse = courseCommands.getCourse(course.id);
    
    // Assert
    expect(updatedCourse.participants).not.toContain(traineeId);
    
    // Cleanup
    courseCommands.deleteCourse(course.id);
  });
});
