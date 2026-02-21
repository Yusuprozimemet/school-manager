import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import * as courseCommands from '../src/courseCommands.js';

describe('Course Commands', () => {
  /** GET ALL COURSES */
  describe('getAllCourses', () => {
    test('should return an array of courses', () => {
      // Arrange (no setup needed)

      // Act
      const courses = courseCommands.getAllCourses();

      // Assert
      expect(Array.isArray(courses)).toBe(true);
    });

    test('should return courses with correct properties', () => {
      // Arrange (no setup needed)

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

  /** ADD COURSE */
  describe('addCourse', () => {
    let initialLength;

    beforeEach(() => {
      // Arrange
      const initialCourses = courseCommands.getAllCourses();
      initialLength = initialCourses.length;
    });

    afterEach(() => {
      // Cleanup (optional - tests are isolated)
    });

    test('should add a new course', () => {
      // Act
      courseCommands.addCourse('Test Course', '2024-01-01');
      const updatedCourses = courseCommands.getAllCourses();

      // Assert
      expect(updatedCourses.length).toBe(initialLength + 1);
      const newCourse = updatedCourses[updatedCourses.length - 1];
      expect(newCourse.name).toBe('Test Course');
      expect(newCourse.startDate).toBe('2024-01-01');
      expect(Array.isArray(newCourse.participants)).toBe(true);
    });
  });

  /** GET COURSE */
  describe('getCourse', () => {
    test('should return the correct course by id', () => {
      // Arrange
      const courses = courseCommands.getAllCourses();
      const course = courses[0];

      // Act
      const fetchedCourse = courseCommands.getCourse(course.id);

      // Assert
      expect(fetchedCourse).toEqual(course);
    });
  });

  /** UPDATE COURSE */
  describe('updateCourse', () => {
    test('should update an existing course', () => {
      // Arrange
      const courses = courseCommands.getAllCourses();
      const courseToUpdate = courses[0];

      // Act
      courseCommands.updateCourse(courseToUpdate.id, 'Updated Course Name', '2024-03-01');
      const updatedCourse = courseCommands.getCourse(courseToUpdate.id);

      // Assert
      expect(updatedCourse.name).toBe('Updated Course Name');
      expect(updatedCourse.startDate).toBe('2024-03-01');
    });
  });

  /** DELETE COURSE */
  describe('deleteCourse', () => {
    test('should delete an existing course', () => {
      // Arrange
      const courses = courseCommands.getAllCourses();
      const courseToDelete = courses[0];

      // Act
      courseCommands.deleteCourse(courseToDelete.id);
      const updatedCourses = courseCommands.getAllCourses();

      // Assert
      const deletedCourse = updatedCourses.find(course => course.id === courseToDelete.id);
      expect(deletedCourse).toBeUndefined();
    });
  });

  /** JOIN COURSE */
  describe('joinCourse', () => {
    let testCourseId;

    beforeEach(() => {
      // Arrange: Create test course
      courseCommands.addCourse('Join Test Course', '2024-01-01');
      const courses = courseCommands.getAllCourses();
      testCourseId = courses[courses.length - 1].id;
    });

    test('should add a trainee to course participants', () => {
      const traineeId = 12345;

      // Act
      const courseBefore = courseCommands.getCourse(testCourseId);
      const initialCount = courseBefore.participants.length;
      courseCommands.joinCourse(testCourseId, [traineeId]);
      const courseAfter = courseCommands.getCourse(testCourseId);

      // Assert
      expect(courseAfter.participants.length).toBe(initialCount + 1);
      expect(courseAfter.participants).toContain(traineeId);
    });
  });

  /** LEAVE COURSE */
  describe('leaveCourse', () => {
    let testCourseId;

    beforeEach(() => {
      // Arrange: Create course + add trainee
      courseCommands.addCourse('Leave Test Course', '2024-01-01');
      const courses = courseCommands.getAllCourses();
      testCourseId = courses[courses.length - 1].id;
      courseCommands.joinCourse(testCourseId, [12345]);
    });

    test('should remove a trainee from course participants', () => {
      const traineeId = 12345;

      // Act
      const courseBefore = courseCommands.getCourse(testCourseId);
      const initialCount = courseBefore.participants.length;
      courseCommands.leaveCourse(testCourseId, [traineeId]);
      const courseAfter = courseCommands.getCourse(testCourseId);

      // Assert
      expect(courseAfter.participants.length).toBe(initialCount - 1);
      expect(courseAfter.participants).not.toContain(traineeId);
    });
  });
});
