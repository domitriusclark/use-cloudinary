import {
  useImage,
} from '../../index';

import { renderHook, act } from "@testing-library/react-hooks";

describe('useImage', () => {
  const { result, waitForNextUpdate } = renderHook(() => useImage({ cloud_name: "" }))
  const [getImage, data, status, error] = result.current;

  it('throws an error when no cloud name is given as an argument', () => {
    act(() => {
      getImage({
        public_id: "image name"
      })
    })

    expect(data).toBe(undefined);

    waitForNextUpdate();

    expect(status).toBe("error")
  })
})