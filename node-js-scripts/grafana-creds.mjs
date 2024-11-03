import { SSMClient, PutParameterCommand } from "@aws-sdk/client-ssm";
import { creds } from "./creds.mjs";

// Initialize SSM client
const ssmClient = new SSMClient({ region: "us-east-1" }); // Change the region if needed

// Function to create a new SSM parameter for each user
const createSSMParameter = async (name, value) => {
  const params = {
    Name: name,
    Value: value,
    Type: "SecureString",
    Overwrite: true, // Allows overwriting existing parameters
  };

  try {
    const command = new PutParameterCommand(params);
    await ssmClient.send(command);
    console.log(`SSM Parameter for ${name} created successfully.`);
  } catch (error) {
    console.error(`Error creating SSM parameter for ${name}:`, error);
  }
};

// Array of users (map of username and password)
const users = [
  {
    name: "refayat",
    username: creds.username,
    password: creds.password,
  },
  // Add more users as needed
];

// Create SSM parameters for each user
const createSSMParametersForUsers = async (users) => {
  for (const user of users) {
    await createSSMParameter(`/grafana/username/${user.name}`, user.username);
    await createSSMParameter(`/grafana/password/${user.name}`, user.password);
  }
};

// Call the function to create SSM parameters for all users
(async () => {
  await createSSMParametersForUsers(users);
})();
