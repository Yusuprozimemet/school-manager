import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

function getCourse(id) {
  // check existence
  if (!id) {
    console.log('ERROR: id is required. Usage: course get <id>');
    return null;
  }

  const courses = loadCourseData();
  const course = courses.find((course) => course.id === parseInt(id));

  // match exists
  if (!course) {
    console.log(`ERROR: Course with ID ${id} not found.`);
    return null;
  }

  return course;
}

function getAllCourses() {
  return loadCourseData();
}

function addCourse(name, startDate) {
  if (!name || !startDate) {
    console.log(
      'ERROR: name and startDate are required. Usage: course add <name> <startDate>'
    );
    return;
  }

  const courses = loadCourseData();
  let id;

  if (courses.length > 0) {
    // Add 1 to the last id in the array to get the new id
    id = courses.at(-1).id + 1;
  } else {
    id = 1;
  }

  // Create a new course object with the provided id, name, startDate, and empty participants
  // course add python-beginner 2026-03-09, remove - and capitalize first letter

  name = name.replace(/-/g, ' ');
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const newCourse = {
    id: parseInt(id),
    name,
    startDate,
    participants: [],
  };

  // Save the new course to the data store by adding it to the existing array of courses
  saveCourseData([...courses, newCourse]);
  console.log(`SUCCESS: Course "${name}" added with ID ${id}`);
}

function updateCourse(id, name, startDate) {
  if (!id || !name || !startDate) {
    console.log(
      'ERROR: id, name and startDate are required. Usage: course update <id> <name> <startDate>'
    );
    return;
  }

  const courses = loadCourseData();
  const exists = courses.find((course) => course.id === parseInt(id));

  if (!exists) {
    console.log(`ERROR: Course with ID ${id} not found.`);
    return;
  }

  const updatedCourses = courses.map((course) => {
    if (course.id === parseInt(id)) {
      name = name.replace(/-/g, ' ');
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return { ...course, name, startDate };
    }
    return course;
  });

  saveCourseData(updatedCourses);
  console.log(
    `SUCCESS: Course with ID ${id} updated to name "${name}" and startDate "${startDate}"`
  );
}

function deleteCourse(id) {
  if (!id) {
    console.log('ERROR: id is required. Usage: course delete <id>');
    return;
  }

  const courses = loadCourseData();
  const exists = courses.find((course) => course.id === parseInt(id));

  if (!exists) {
    console.log(`ERROR: Course with ID ${id} not found.`);
    return;
  }

  const updatedCourses = courses.filter((course) => course.id !== parseInt(id));
  saveCourseData(updatedCourses);
  console.log(`SUCCESS: Course with ID ${id} deleted.`);
}

function joinCourse(courseId, participantIds) {
  if (!courseId || !participantIds.length) {
    console.log(
      'ERROR: courseId and at least one traineeId are required. Usage: course join <courseId> <traineeId>'
    );
    return;
  }

  const courses = loadCourseData();
  const allTrainees = loadTraineeData();
  const course = courses.find((course) => course.id === parseInt(courseId));

  if (!course) {
    console.log(`ERROR: Course with ID ${courseId} not found.`);
    return;
  }

  const added = [];
  const skipped = [];

  for (const id of participantIds) {
    const traineeId = parseInt(id);

    // Only add if trainee EXISTS in trainees.json
    const traineeExists = allTrainees.some(
      (trainee) => trainee.id === traineeId
    );

    if (!traineeExists) {
      skipped.push(id);
      continue;
    }

    if (!course.participants.includes(traineeId)) {
      course.participants.push(traineeId);
      added.push(id);
    } else {
      skipped.push(id);
    }
  }

  saveCourseData(courses);

  if (added.length)
    console.log(
      `SUCCESS: Trainee(s) ${added.join(', ')} added to course ${courseId}.`
    );
  if (skipped.length)
    console.log(
      `WARNING: Trainee(s) ${skipped.join(', ')} do not exist or are already enrolled.`
    );
}

function leaveCourse(courseId, participants) {
  if (!courseId || !participants.length) {
    console.log(
      'ERROR: courseId and at least one traineeId are required. Usage: course leave <courseId> <traineeId>'
    );
    return;
  }

  const courses = loadCourseData();
  const course = courses.find((course) => course.id === parseInt(courseId));

  if (!course) {
    console.log(`ERROR: Course with ID ${courseId} not found.`);
    return;
  }

  const updatedCourses = courses.map((course) => {
    if (course.id === parseInt(courseId)) {
      const leaveIds = new Set(participants.map((p) => parseInt(p)));
      return {
        ...course,
        participants: course.participants.filter((p) => !leaveIds.has(p)),
      };
    }
    return course;
  });

  saveCourseData(updatedCourses);
  console.log(
    `SUCCESS: Trainee(s) ${participants.join(', ')} removed from course ${courseId}.`
  );
}

export function handleCourseCommand(subcommand, args) {
  switch (subcommand) {
    case 'add':
      addCourse(args[0], args[1]);
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
      console.log(
        'ERROR: Invalid subcommand for course. Use: add, update, delete, join, leave, get, getAll.'
      );
      return null;
  }
}

export {
  getCourse,
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  joinCourse,
  leaveCourse,
};


