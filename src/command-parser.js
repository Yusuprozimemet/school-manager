export function parseCommand(userInput) {
  const parts = userInput.trim().split(/\s+/);
  const command = parts.at(0);
  const subcommand = parts.at(1) || null; // subcommand is optional, so default to null if not provided
  const args = parts.slice(2); // everything after the first two parts is considered arguments
 
  return {
    entity: command,
    action: subcommand,
    args: args,
  };
}