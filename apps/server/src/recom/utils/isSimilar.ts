export function isSimilar(str1: string, str2: string) {
  const len1 = str1.length;
  const len2 = str2.length;

  // Create a matrix to store the edit distances
  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill in the matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  // The similarity score is calculated as 1 - (Levenshtein distance / max length)
  const maxLen = Math.max(len1, len2);
  const similarity = 1 - matrix[len1][len2] / maxLen;

  return similarity > 0.33 ? true : false;
}
