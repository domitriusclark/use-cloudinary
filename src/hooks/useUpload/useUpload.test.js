import { renderHook } from '@testing-library/react-hooks';

import { useUpload } from '../../index';

describe('useUpload', () => {
  it('throws an error with no endpoint', () => {
    const { result } = renderHook(() => useUpload());
    expect(result.error).toBeInstanceOf(Error);
  })
}) 