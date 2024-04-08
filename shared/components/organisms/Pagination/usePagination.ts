import { useEffect, useState } from 'react'

export const usePagination = (
  totalPages: number,
  onIndexChange: (index: number) => void,
) => {
  const [activePage, setActivePage] = useState(0)
  const [activeChunk, setActiveChunk] = useState([0, 0])
  const [pageChunks, setPageChunks] = useState<number[][]>([])
  // number of pages per division
  const chunkSize = 3
  // convert total pages into an array for splitting
  const pages = Array.from(Array(totalPages).keys())
  // convertion of pages array for dropdown use
  const pagesDropdown = pages.map((i) => ({
    label: (i + 1).toString(),
    value: i.toString(),
  }))
  // divide pages array into equal part chunks
  const getPageDivisions = () => {
    let chunks: number[][] = []
    for (let i = 0; i < pages.length; i += chunkSize) {
      const chunk = pages.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    setPageChunks(chunks)
  }
  // Arrow button actions
  const handlePrevArrow = () => {
    if (activePage > 0) {
      setActivePage((oldActive) => oldActive - 1)
    }
  }
  const handleNextArrow = () => {
    if (activePage < pages.length - 1) {
      setActivePage((oldActive) => oldActive + 1)
    }
  }
  // get the location of the activePage every time it changes
  useEffect(() => {
    let rowIndex = -1
    let columnIndex = -1
    // Iterate over the outer array
    for (let i = 0; i < pageChunks.length; i++) {
      // Iterate over the inner array at index i
      for (let j = 0; j < pageChunks[i].length; j++) {
        // Check if the current element matches the number we're looking for
        if (pageChunks[i][j] === activePage) {
          rowIndex = i
          columnIndex = j
          break
        }
      }
      // Break the outer loop if the number is found
      if (rowIndex !== -1) {
        break
      }
    }
    setActiveChunk([rowIndex, columnIndex])
  }, [activePage, pageChunks])

  useEffect(() => {
    getPageDivisions()
  }, [totalPages])

  useEffect(() => {
    onIndexChange(activePage)
  }, [activePage])
  // get pages division before all

  return {
    pages,
    activePage,
    pageChunks,
    activeChunk,
    pagesDropdown,
    setActivePage,
    handleNextArrow,
    handlePrevArrow,
  }
}
