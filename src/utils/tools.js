import { zipObject, snakeCase } from 'lodash';

const validate = condition => new Promise((resolve, reject) => (condition ? resolve() : reject()));

const execute = commands => (commandName, options) =>
  new Promise((resolve, reject) => {
    const command = commands[commandName];
    if (command) {
      resolve(command(options));
    } else {
      reject(commandName, options);
    }
  });

const Enum = (...args) => zipObject(args.map(value => snakeCase(value)), args);

export { validate, execute, Enum };
export default { validate, execute, Enum };
