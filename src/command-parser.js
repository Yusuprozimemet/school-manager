export function parseCommand(userInput) {
  const parts = [];
  const regex = /"([^"]*?)"|(\S+)/g; 

  let regexMatch;
  while ((regexMatch = regex.exec(userInput.trim())) !== null) {
  parts.push(regexMatch.at(1) !== undefined ? regexMatch.at(1) : regexMatch.at(2));
}

  const command = parts.at(0); // first part is the main command , course or trainee
  const subcommand = parts.at(1); // second part is the subcommand, e.g., getAll, add, update, delete, join, leave, fetchAll, fetch
  const args = parts.slice(2); // remaining parts are arguments, e.g., course ID, trainee ID, name, startDate, etc.

  // Ensure `action` is explicit `null` when not provided (tests expect null, not undefined).
  return { 
    entity: command, 
    action: subcommand ?? null,
    args };
}


