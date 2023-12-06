// makeController.mjs
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Extract controller name from command line arguments
const controllerName = process.argv[2];

// Function to create the controller file
function createControllerFile(controllerName) {
  if (!controllerName) {
    console.error("Please provide a controller name.");
    process.exit(1);
  }

  // Ensure the controllers directory exists
  const controllersDir = join("backend/", "controllers");
  if (!existsSync(controllersDir)) {
    mkdirSync(controllersDir);
  }

  const controllerFilePath = join(controllersDir, `${controllerName}.js`);

  // Check if the controller file already exists
  if (existsSync(controllerFilePath)) {
    console.error(
      `Controller ${controllerName} already exists at ${controllerFilePath}.`
    );
    process.exit(1);
  }

  // Generate controller content
  const controllerContent = `
    import asyncHandler from "../middelware/asyncHandler.js";
    import ${controllerName} from "../models/${controllerName}Model.js";
    // Your controller logic here

    export default {  };
`;

  // Write the content to the controller file
  writeFileSync(controllerFilePath, controllerContent);

  console.log(
    `Controller ${controllerName} created successfully at ${controllerFilePath}`
  );
}

createControllerFile(controllerName);
