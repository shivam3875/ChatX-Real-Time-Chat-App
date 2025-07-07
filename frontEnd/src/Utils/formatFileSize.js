export function formatFileSize(sizeBytes) {
  const sizeKB = sizeBytes / 1024;
  if (sizeKB < 1024) {

    return `${Math.round(sizeKB)} KB`;
  } else {

    const sizeMB = sizeKB / 1024;
    return `${sizeMB.toFixed(1)} MB`;
  }
}
