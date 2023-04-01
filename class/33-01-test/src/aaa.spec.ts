// 1개 테스트하기
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 여러개 테스트
describe('나의 테스트 그룹', () => {
  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });
});

// 상품구매 테스트
describe('상품구매테스트', () => {
  beforeEach(() => {
    // 로그인 로직
  });
  it('돈 검증', () => {
    const result = true; // enough money
    expect(result).toBe(true);
  });
  it('상품구매', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
