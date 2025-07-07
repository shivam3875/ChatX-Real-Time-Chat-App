export function formatFileSize(sizeBytes) {
  const sizeKB = sizeBytes / 1024;
  if (sizeKB < 1024) {
    // 1 MB se chhota: KB mein, bina MB mein divide kiye
    return `${Math.round(sizeKB)} KB`;
  } else {
    // 1 MB ya usse zyada: MB mein
    const sizeMB = sizeKB / 1024;
    return `${sizeMB.toFixed(1)} MB`;
  }
}
