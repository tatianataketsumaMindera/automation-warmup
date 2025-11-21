import { test } from '@playwright/test';
import { TasksPage } from './tasks.page';
import { TASK_CASES } from './data/tasks.data';

test.describe('TASKS - DESKTOP', () => {
  test.beforeEach(async ({ page }) => {
    const tasks = new TasksPage(page);
    await tasks.navigateToTasks();
  });

  test('add task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const todoTaskInput = TASK_CASES.ADD.text;

    //FIRST TASK
    await tasks.addTask(todoTaskInput);
    await tasks.expectTaskVisibleDesktop(1, todoTaskInput);
    await tasks.expectPriorityDesktop(1, 1);

    //SECOND TASK
    await tasks.addTask(todoTaskInput);
    await tasks.expectTaskVisibleDesktop(2, todoTaskInput);
    await tasks.expectPriorityDesktop(2, 2);
  });

  test('add empty task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { empty, spaces } = TASK_CASES.EMPTY;
    await tasks.clickSubmit();
    await tasks.fillTaskInput(spaces);
    await tasks.clickSubmit();
    await tasks.expectNoTasks();
  });

  test('edit task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { original, edited } = TASK_CASES.EDIT;
    await tasks.addTask(original);
    await tasks.editTaskDesktop(1, edited);
    await tasks.expectTaskVisibleDesktop(1, edited);
  });

  test('cancel edit', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { original, tempCancel } = TASK_CASES.EDIT;
    await tasks.addTask(original);
    await tasks.cancelEditDesktop(1, tempCancel);
    await tasks.expectTaskVisibleDesktop(1, original);
  });

  test('complete task', async ({ page }) => {
    const tasks = new TasksPage(page);
    const { text } = TASK_CASES.COMPLETE;
    await tasks.addTask(text);
    await tasks.completeTaskDesktop(1);
    await tasks.expectTaskNotVisible(1);  
    await tasks.expectTaskInCompleted(1, text);
  });

  test('sequence ids', async ({ page }) => {
    const tasks = new TasksPage(page);
    
  });

  test('reorder drag & drop', async ({ page }) => {
    const tasks = new TasksPage(page);
  });
});
