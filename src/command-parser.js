export function parseCommand(userInput) {
  const parts = userInput.trim().split(/\s+/); // split by whitespace
  const command = parts[0]; // first part is the main command
  const subcommand = parts[1]; // second part is the subcommand
  const args = parts.slice(2); // remaining parts are arguments

  return { command, subcommand, args };
}
