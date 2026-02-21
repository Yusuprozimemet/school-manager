import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get directory where THIS file (storage.js) lives
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute paths relative to src/ folder
const TRAINEE_DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'trainees.json');
const COURSE_DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'courses.json');

export function loadTraineeData() {
  // Use the fs module to read the trainees.json file and return the data as a JavaScript object  
  const data = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf-8').split('\n').filter(line => line.trim() !== '').join('');
  const parsedData = JSON.parse(data);
  return parsedData;
}

export function saveTraineeData(trainees) {
  // Use the fs module to write the updated trainee data back to the trainees.json file 
  const data = JSON.stringify(trainees, null, 2); 
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, data, 'utf-8');
  console.log('Trainee data saved successfully.');
}

export function loadCourseData() {
  // Use the fs module to read the courses.json file and return the data as a JavaScript object
  const data = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf-8').trim();
  const parsedData = data ? JSON.parse(data) : [];
  // console.log('Course data loaded successfully.',parsedData);
  return parsedData;
}

export function saveCourseData(courses) {
  // Use the fs module to write the updated course data back to the courses.json file
  const data = JSON.stringify(courses, null, 2);
  fs.writeFileSync(COURSE_DATA_FILE_PATH, data, 'utf-8');
  console.log('Course data saved successfully.');
}
