export const TASK_CASES = {
  ADD: {
    scenario: 'Add single task',
    text: 'Buy dog food',
  },

  EMPTY: {
    scenario: 'Empty and whitespace',
    empty: '',
    spaces: '   ',
  },

  EDIT: {
    scenario: 'Edit existing task',
    original: 'Old text',
    edited: 'Edited text',
    tempCancel: 'Should not save',
  },

  COMPLETE: {
    scenario: 'Complete a task',
    text: 'Homework',
  },

  SEQUENCE: {
    scenario: 'Sequential ids after complete',
    first: 'A',
    second: 'B',
    third: 'C',
  },

  REORDER: {
    scenario: 'Reorder drag & drop',
    tasks: ['Task 1', 'Task 2', 'Task 3'],
    expectedFirst: 'Task 3',
  },
};
