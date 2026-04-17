import app from './app';

describe('Index', () => {
  it('should start app when required', () => {
    app.start = jest.fn();
    require('./index');
    expect(app.start).toHaveBeenCalled();
  });
});
