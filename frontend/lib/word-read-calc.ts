export const countReadMinutes = (content = '') => {
    const wordCount = content.split(' ').length;
    const readingRateInSeconds = (wordCount * 60) / 200;
    const inMinutes = Math.round(readingRateInSeconds / 60);
    return inMinutes;
  };
