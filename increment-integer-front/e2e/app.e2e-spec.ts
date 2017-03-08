import { IncrementIntegerPage } from './app.po';

describe('increment-integer App', () => {
  let page: IncrementIntegerPage;

  beforeEach(() => {
    page = new IncrementIntegerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
