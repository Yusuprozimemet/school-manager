import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get directory where THIS file (storage.js) lives
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute paths relative to src/ folder
const TRAINEE_DATA_FILE_PATH = path.join(
  __dirname,
  '..',
  'data',
  'trainees.json'
);
const COURSE_DATA_FILE_PATH = path.join(
  __dirname,
  '..',
  'data',
  'courses.json'
);

export function loadTraineeData() {
  const data = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf-8').trim();
  const parsedData = data ? JSON.parse(data) : [];
  return parsedData;
}

export function saveTraineeData(trainees) {
  const data = JSON.stringify(trainees, null, 2);
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, data, 'utf-8');
}

export function loadCourseData() {
  const data = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf-8').trim();
  const parsedData = data ? JSON.parse(data) : [];
  return parsedData;
}

export function saveCourseData(courses) {
  const data = JSON.stringify(courses, null, 2);
  fs.writeFileSync(COURSE_DATA_FILE_PATH, data, 'utf-8');
}
