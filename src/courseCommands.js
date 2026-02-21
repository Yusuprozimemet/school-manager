import { saveCourseData, loadCourseData , loadTraineeData, saveTraineeData} from './storage.js';
import { fetchAllTrainees } from './traineeCommands.js';

/*
[
  {
    "id": 87421,
    "name": "Intro to JavaScript Course",
    "startDate": "20226-02-01",
    "participants": [
      12345,
      12346
    ]
  }
]
*/

function getCourse(id) {
  const courses = loadCourseData();
  return courses.find(course => course.id === parseInt(id));
}

function getAllCourses() {
  return loadCourseData();
}

function addCourse( name, startDate) {
  const courses = loadCourseData();
  const currentTrainees = fetchAllTrainees().map(trainee => trainee.id);
  let id;
  if (courses.length > 0) {
    //add 1 to the last id in the array to get the new id
    id = courses[courses.length - 1].id + 1;
  } else {
    id = 1;
  }
  //create a new course object with the provided id, name, startDate, and empty participants
  const newCourse = { id: parseInt(id), name, startDate, participants: [] };
  //save the new course to the data store by adding it to the existing array of courses
  saveCourseData([...courses, newCourse]);
}

function updateCourse(id, name, startDate) {
  const courses = loadCourseData();
  const updatedCourses = courses.map(course => {
    if (course.id === parseInt(id)) {
      return { ...course, name, startDate };
    }
    return course;
  });
  saveCourseData(updatedCourses);
}

function deleteCourse(id) {
  const courses = loadCourseData();
  const updatedCourses = courses.filter(course => course.id !== parseInt(id));
  saveCourseData(updatedCourses);
}



function joinCourse(courseId, participantIds) {
  const courses = loadCourseData();
  const allTrainees = loadTraineeData();
  
  for (const id of participantIds) {
    const traineeId = parseInt(id);
    
    // ONLY add if trainee EXISTS in trainees.json
    let traineeExists = false;
    for (const trainee of allTrainees) {
      if (trainee.id === traineeId) {
        traineeExists = true;
        break;
      }
    }
    
    if (traineeExists) {
      const course = courses.find(course => course.id === parseInt(courseId));
      if (course && !course.participants.includes(traineeId)) {
        course.participants.push(traineeId);
      }
    }
  }
  
  saveCourseData(courses);
}




function leaveCourse(courseId, participants) {
  const courses = loadCourseData();
  const updatedCourses = courses.map(course => {
    if (course.id === parseInt(courseId)) {
      const leaveIds = new Set(participants.map(p => parseInt(p)));
      return { ...course, participants: course.participants.filter(p => !leaveIds.has(p)) };
    }
    return course;
  });
  saveCourseData(updatedCourses);
}



export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'add':
      addCourse(args[0], args[1], args[2]);
      break;
    case 'update':
      updateCourse(args[0], args[1], args[2]);
      break;
    case 'delete':
      deleteCourse(args[0]);
      break;
    case 'join':
      joinCourse(args[0], args.slice(1));
      break;
    case 'leave':
      leaveCourse(args[0], args.slice(1));
      break;
    case 'get':
      return getCourse(args[0]);
    case 'getAll':
      return getAllCourses();
    default:
      console.log('Invalid subcommand for course. Please use add, update, delete, join, leave, get, or getAll.');
      return null;
  }
}

/*
console.log(getAllCourses())
addCourse("Machine learning", "2024-02-01");
const newCourseId = getAllCourses()[getAllCourses().length - 1].id;  
console.log('Added:', getCourse(newCourseId));
console.log('After new course is added :',getAllCourses())

updateCourse(newCourseId, "Python Course", "2024-02-06");  //  Updates existing!
console.log('Updated:', getCourse(newCourseId));

deleteCourse(newCourseId);  // Deletes existing!
console.log('After Deletion:', getCourse(newCourseId));  // Should be undefined


// Test existing trainee (should work)
joinCourse(87421, [12345]);  
console.log('After joining existing trainee:', getCourse(87421));


// Test leave with existing participant
leaveCourse(87421, [12345]);  
console.log('After Leaving:', getCourse(87421));

*/

export { getCourse, getAllCourses, addCourse, updateCourse, deleteCourse, joinCourse, leaveCourse };