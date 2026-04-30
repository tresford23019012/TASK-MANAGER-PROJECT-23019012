export const tasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    description: "Build the Tresify task manager app for INFS 202 midterm project.",
    category: "School",
    priority: "High",
    dueDate: "2026-04-25",
    completed: true 
  },
  {
    id: 2,
    title: "Study for Operating Systems Test",
    description: "Review linked lists, stacks, queues and binary trees.",
    category: "School",
    priority: "High",
    dueDate: "2026-04-22",
    completed: false
  },
  {
    id: 3,
    title: "Chest and Triceps Workout",
    description: "Bench press, incline dumbbell, tricep dips, cable pushdowns.",
    category: "Gym",
    priority: "Medium",
    dueDate: "2026-04-18",
    completed: false
  },
  {
    id: 4,
    title: "Buy Groceries",
    description: "Milk, eggs, chicken, rice, vegetables and protein shakes.",
    category: "Personal",
    priority: "Low",
    dueDate: "2026-04-18",
    completed: true
  },
  {
    id: 5,
    title: "Read Chapter 4 - Networks",
    description: "Read and summarize chapter 4 of the data mining textbook.",
    category: "School",
    priority: "Medium",
    dueDate: "2026-04-20",
    completed: false
  }
];

export const getTaskById = (id) => {
  return tasks.find(task => task.id === parseInt(id));
};

export const addTask = (newTask) => {
  const task = {
    ...newTask,
    id: tasks.length + 1,
    completed: false
  };
  tasks.push(task);
  return task;
};

export const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) tasks.splice(index, 1);
};

export const toggleComplete = (id) => {
  const task = tasks.find(task => task.id === parseInt(id));
  if (task) task.completed = !task.completed;
};