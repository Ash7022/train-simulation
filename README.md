
# Train Workflow Simulation

This project is a NestJS application that simulates the workflow of a train, including engines, coaches, and pantry cars, with specific roles and actions. The application processes a dynamic JSON input representing train components, roles, actions, and status.

## Features

- Dynamically set train blocks via JSON input
- Manage train block statuses
- Handle actions such as "Run" and "Stop" for the engine
- Handle actions such as "ACTIVE" and "INACTIVE" for other blocks
- Supports role-based actions
## Installation

```bash
 git clone https://github.com/Ash7022/train-simulation.git
cd train-workflow
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## API's

```bash
# setting all blocks
curl -X POST http://localhost:3000/train -H "Content-Type: application/json" -d '{
  "1": {
    "start_role": ["None"],
    "present_role": "Engine",
    "next_role": ["AC-1"],
    "actions": ["Run", "Stop"],
    "status": "Stop"
  },
  "2": {
    "start_role": ["Engine"],
    "present_role": "AC-1",
    "next_role": ["AC-2"]
  },
  "3": {
    "start_role": ["AC-1"],
    "present_role": "AC-2",
    "next_role": ["S"]
  },
  "4": {
    "start_role": ["SA"],
    "present_role": "S",
    "next_role": ["STY", "BTY"]
  },
  "5": {
    "start_role": ["S", "SA"],
    "action_by": ["S", "SA"],
    "actions": ["ACTIVE", "INACTIVE"],
    "present_role": "STY",
    "status": "INACTIVE",
    "next_role": ["None"]
  },
  "6": {
    "start_role": ["S", "SA"],
    "action_by": ["B", "BA"],
    "actions": ["ACTIVE", "INACTIVE"],
    "present_role": "BTY",
    "status": "INACTIVE",
    "next_role": ["None"]
  }
}'

# getting all blocks
curl http://localhost:3000/train

# getting all active blocks
curl http://localhost:3000/train/active


# Getting a Block by ID
curl http://localhost:3000/train/1

## Performing Actions
# You can perform actions on a block by sending a POST request to /train/:id/action with a JSON body containing the role and action. Here are some examples:
# Perform "Run" action by role "None" on block 1 (Engine block)

curl -X POST http://localhost:3000/train/1/action -H "Content-Type: application/json" -d '{"role":"None", "action": "Run"}'

# Perform "Stop" action by role "None" on block 1 (Engine block)
curl -X POST http://localhost:3000/train/1/action -H "Content-Type: application/json" -d '{"role":"None", "action": "Stop"}'

# Perform "ACTIVE" action by role "S" on block 5 (STY block)
curl -X POST http://localhost:3000/train/5/action -H "Content-Type: application/json" -d '{"role":"S", "action": "ACTIVE"}'

# Perform "INACTIVE" action by role "B" on block 6 (BTY block)
curl -X POST http://localhost:3000/train/6/action -H "Content-Type: application/json" -d '{"role":"B", "action": "INACTIVE"}'




```

## Project Structure
- src/: Contains the source code of the application

  - train/: Contains the train-related logic

    - train.controller.ts: Handles HTTP requests

    - train.service.ts: Contains the business logic

    - train.model.ts: Defines the data model for train blocks

    - train.module.ts: Configures the train module


## License
This project is licensed under the [MIT License](https://github.com/Ash7022/train-simulation?tab=MIT-1-ov-file#readme).

