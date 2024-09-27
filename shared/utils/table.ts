import { ReactNode } from 'react'

// divide pages array into equal part chunks
export const chunkDivider = (
  // itemType: Type<any>,
  items: ReactNode[],
  chunkSize: number,
) => {
  let chunks: ReactNode[][] = []
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}
