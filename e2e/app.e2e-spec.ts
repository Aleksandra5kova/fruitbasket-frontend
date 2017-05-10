import { FruitbasketPage } from './app.po';

describe('fruitbasket App', () => {
  let page: FruitbasketPage;

  beforeEach(() => {
    page = new FruitbasketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
