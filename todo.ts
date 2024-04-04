#! /usr/bin/env node
import { log } from "console";
import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];

async function createTodo() {
  do {
    let ans = await inquirer.prompt({
      type: "list",
      name: "select",
      message: "Select an Operation?",
      choices: ["Add Todo", "Delete Todo", "View Todo", "Update Todo", "Exit"],
    });
    if (ans.select === "Add Todo") {
      let addTodo = await inquirer.prompt({
        type: "input",
        name: "todo",
        message: "Add Items to the List",
      });
      todos.push(addTodo.todo);
      log(chalk.green("Todo Added Successfully!"));
    }
    if (ans.select === "Update Todo") {
      let updateTodo = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "Select Todo to Update",
        choices: todos,
      });
      let index = todos.indexOf(updateTodo.todo);
      let newTodo = await inquirer.prompt({
        type: "input",
        name: "todo",
        message: "Enter Updated Todo",
        default: todos[index],
      });
      todos[index] = newTodo.todo;
      log(chalk.green("Todo Updated Successfully!"));
    }
    if (ans.select === "View Todo") {
      log(chalk.blue("*** TO DO LIST ***"));
      todos.forEach((todo, index) => {
        log(chalk.yellow(`${index + 1}. ${todo}`));
      });
      log(chalk.blue("********************"));
    }
    if (ans.select === "Delete Todo") {
      let deleteTodo = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "Select Todo to Delete",
        choices: todos,
      });
      todos = todos.filter((todo) => todo !== deleteTodo.todo);
      log(chalk.red("Todo Deleted Successfully!"));
    }
    if (ans.select === "Exit") {
      log(chalk.magenta("Exiting Todo Application."));
      break;
    }
  } while (true);
}

createTodo();
