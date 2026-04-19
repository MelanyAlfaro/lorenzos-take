export function shuffleArray(array) {
  const shuffledArray = [...array]; // copy of the original array
  // Move through the array from the last element to the first
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at index i and randomIndex
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}
