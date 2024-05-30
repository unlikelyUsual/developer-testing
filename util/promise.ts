export type AsyncRequest = Promise<unknown>;

export async function chunkedPromiseAll(
  promises: AsyncRequest[],
  size = 10
): Promise<void> {
  const chunk: AsyncRequest[] = [];
  let len = promises.length;
  size = Math.min(len, size);

  /* eslint-disable no-await-in-loop */
  for (const p of promises) {
    chunk.push(p);
    if (chunk.length === size) {
      await Promise.allSettled(chunk);
      await new Promise((r) => setTimeout(r, 500));
      console.log(`Chunk finished !`);
      chunk.length = 0;
      len -= size;
      if (len < size) size = len;
    }
  }
  /* eslint-disable no-await-in-loop */
}
