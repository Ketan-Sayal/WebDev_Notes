
export type Todo = {
  _id: string;
  title: string;
  task: string;
  completed: boolean;
};

export type CreateTodoInput = {
  title: string;
  task: string;
};
