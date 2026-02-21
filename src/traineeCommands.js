import { saveTraineeData, loadTraineeData } from './storage.js';

export function addTrainee(name, email) {
  const trainees = loadTraineeData();
  let id;
  
  if (trainees.length > 0) {
    //add 1 to the last id in the array to get the new id
    id = trainees[trainees.length - 1].id + 1;
  } else {
    id = 1;
  }
  
  //create a new trainee object with the generated id, name, and email
  const newTrainee = { id: id, name: name, email: email };
  //save the new trainee to the data store by adding it to the existing array of trainees
  saveTraineeData([...trainees, newTrainee]);
}

export function updateTrainee(id, name, email) {
  const trainees = loadTraineeData();
  //map() = "Transform each item in the array and return a new array"
  const updatedTrainees = trainees.map(trainee => {
    // If the trainee's id matches the provided id, update its name and email
    if (trainee.id === parseInt(id)) {
      return { id: trainee.id, name, email };
    }
    return trainee;
  });
  saveTraineeData(updatedTrainees);
}

export function deleteTrainee(id) {
  const trainees = loadTraineeData();
  //filter() = "Keep items where condition is TRUE"
  const updatedTrainees = trainees.filter(trainee => trainee.id !== parseInt(id));
  saveTraineeData(updatedTrainees);
}

export function fetchTrainee(id) {
  const trainees = loadTraineeData();
  return trainees.find(trainee => trainee.id === parseInt(id));
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
      console.log('Invalid subcommand for trainee. Please use add, update, delete, fetch, or fetchAll.');
      return null;
  }
}

/*

addTrainee('test', 'test@example.com');
console.log('After add:', fetchAllTrainees());  

const idToUpdate = 12347;  
updateTrainee(idToUpdate, 'updated', 'updated@example.com');
console.log('After update:', fetchTrainee(idToUpdate));  

deleteTrainee(idToUpdate);
console.log('After delete:', fetchTrainee(idToUpdate));  
console.log('Full list after delete:', fetchAllTrainees());  

fetchTrainee(12345);
fetchAllTrainees();

*/