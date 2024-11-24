import { textUtil } from '@/utils/text.util';

describe('Example Utility', () => {
  test('Upper case text utility', () => {
    const result = textUtil('m anas Latif');
    expect(result).toBe('M ANAS LATIF');
  });
});
