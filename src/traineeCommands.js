import { saveTraineeData, loadTraineeData } from './storage.js';

export function addTrainee(firstName, lastName) {
  if (!firstName || !lastName) {
    console.log(
      'ERROR: firstName and lastName are required. Usage: trainee add <firstName> <lastName>'
    );
    return;
  }

  const trainees = loadTraineeData();
  let id;

  if (trainees.length > 0) {
    // Add 1 to the last id in the array to get the new id
    id = trainees.at(-1).id + 1;
  } else {
    id = 1;
  }

  // Create a new trainee object with the generated id, firstName, and lastName
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  const newTrainee = { id, firstName, lastName };
  // Save the new trainee to the data store by adding it to the existing array of trainees
  saveTraineeData([...trainees, newTrainee]);
  console.log(
    `SUCCESS: Trainee "${firstName} ${lastName}" added with ID ${id}`
  );
}

export function updateTrainee(id, firstName, lastName) {
  if (!id || !firstName || !lastName) {
    console.log(
      'ERROR: id, firstName and lastName are required. Usage: trainee update <id> <firstName> <lastName>'
    );
    return;
  }

  const trainees = loadTraineeData();
  const exists = trainees.find((trainee) => trainee.id === parseInt(id));

  if (!exists) {
    console.log(`ERROR: Trainee with ID ${id} not found.`);
    return;
  }

  // map() = "Transform each item in the array and return a new array"
  const updatedTrainees = trainees.map((trainee) => {
    // If the trainee's id matches the provided id, update its firstName and lastName
    if (trainee.id === parseInt(id)) {
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      return { ...trainee, firstName, lastName };
    }
    return trainee;
  });

  saveTraineeData(updatedTrainees);
  console.log(
    `SUCCESS: Trainee with ID ${id} updated to "${firstName} ${lastName}"`
  );
}

export function deleteTrainee(id) {
  if (!id) {
    console.log('ERROR: id is required. Usage: trainee delete <id>');
    return;
  }

  const trainees = loadTraineeData();
  const exists = trainees.find((trainee) => trainee.id === parseInt(id));

  if (!exists) {
    console.log(`ERROR: Trainee with ID ${id} not found.`);
    return;
  }

  // filter() = "Keep items where condition is TRUE"
  const updatedTrainees = trainees.filter(
    (trainee) => trainee.id !== parseInt(id)
  );
  saveTraineeData(updatedTrainees);
  console.log(`SUCCESS: Trainee with ID ${id} deleted.`);
}

export function fetchTrainee(id) {
  if (!id) {
    console.log('ERROR: id is required. Usage: trainee fetch <id>');
    return null;
  }

  const trainees = loadTraineeData();
  const trainee = trainees.find((trainee) => trainee.id === parseInt(id));

  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${id} not found.`);
    return null;
  }

  return trainee;
}

export function fetchAllTrainees() {
  return loadTraineeData();
}

export function handleTraineeCommand(subcommand, args) {
  switch (subcommand) {
    case 'add':
      addTrainee(args[0], args[1]);
      break;
    case 'update':
      updateTrainee(args[0], args[1], args[2]);
      break;
    case 'delete':
      deleteTrainee(args[0]);
      break;
    case 'fetch':
      return fetchTrainee(args[0]);
    case 'fetchAll':
      return fetchAllTrainees();
    default:
      console.log(
        'ERROR: Invalid subcommand for trainee. Use: add, update, delete, fetch, fetchAll.'
      );
      return null;
  }
}
