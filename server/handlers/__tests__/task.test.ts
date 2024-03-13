import * as task from '../task';

describe('task handler', () => {
  it('should create a new task', async () => {
    const req = { body: { title: 'hello', completed: false, belongsToId: '123' } };
    const res = {
      json({ task }) {
        expect(task).toBeTruthy();
        expect(task.title).toEqual('hello');
        expect(task.completed).toEqual(false);
        expect(task.belongsToId).toEqual('12');
      },
    };

    await task.createTask(req, res, () => {});
  });
});
