exports.secondsToTimeString = seconds => {
  if (!seconds) return '0 seconds';
  let message = '';
  const s = seconds % 60;
  const m = ((seconds - s) % 3600) / 60;
  const h = ((seconds - m * 60 - s) % 86400) / 3600;
  const d = ((seconds - h * 3600 - m * 60 - s) % 31536000) / 86400;
  const y = Math.floor(seconds / 31536000);
  if (y) {
    message += `${y} year`;
    if (y > 1) message += `s`;
    return message;
  }
  if (d) {
    message += `${d} day`;
    if (d > 1) message += `s`;
    return message;
  }
  if (h) {
    message += `${h} hour`;
    if (h > 1) message += `s`;
    return message;
  }
  if (m) {
    message += `${m} minute`;
    if (m > 1) message += `s`;
    return message;
  }
  if (s) {
    message += `${s} second`;
    if (s > 1) message += `s`;
    return message;
  }
};
exports.shortenNumbers = num => {
  const arr = String(num).split('');

  if (arr.length > 6) {
    return `${arr.slice(0, -6).join('')}M`;
  }
  if (arr.length > 3) {
    return `${arr.slice(0, -3).join('')}K`;
  }
  return String(num);
};
