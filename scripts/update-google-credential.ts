import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Function to encode file contents to Base64
function encodeFileToBase64(filePath: string): string {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return Buffer.from(fileData).toString('base64');
}

// Function to update environment variable in .env file
function updateEnvVariable(envVarName: string, base64Value: string): void {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  envConfig[envVarName] = base64Value;

  const newEnvConfig = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync('.env', newEnvConfig);
}

// Main function to read arguments and execute the script
function main(): void {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('This script expects exactly 2 arguments: the name of the env var and the path to the credentials JSON file.');
    process.exit(1);
  }

  const [envVarName, jsonFilePath] = args;
  const absoluteJsonFilePath = path.resolve(jsonFilePath);

  if (!fs.existsSync(absoluteJsonFilePath)) {
    console.error(`File at path ${absoluteJsonFilePath} does not exist.`);
    process.exit(1);
  }

  const base64Value = encodeFileToBase64(absoluteJsonFilePath);
  updateEnvVariable(envVarName, base64Value);

  console.log(`Successfully updated ${envVarName} in .env file.`);
}

// Execute the main function
main();
