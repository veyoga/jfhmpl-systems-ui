import { PurchaseDatePipe } from './purchase-date.pipe';

describe('PurchaseDatePipe', () => {
  it('create an instance', () => {
    const pipe = new PurchaseDatePipe();
    expect(pipe).toBeTruthy();
  });
});
