/* 判断是否为浏览器环境 */
export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * 判断响应是否为 blob 类型
 */
export const isBlobResponse = (contentType: string): boolean => {
  return (
    contentType.includes('application/octet-stream') ||
    contentType.includes('application/vnd') ||
    contentType.includes('application/pdf') ||
    contentType.includes('image/') ||
    contentType.includes('audio/') ||
    contentType.includes('video/') ||
    contentType.includes('application/zip') ||
    contentType.includes('application/x-') ||
    (contentType.startsWith('application/') && !contentType.includes('json'))
  );
};

/**
 * 从响应头中解析文件名
 */
export const parseFilenameFromHeaders = (headers: Headers, defaultFilename?: string): string => {
  const contentDisposition = headers.get('content-disposition');
  if (contentDisposition) {
    // 处理 filename*=UTF-8''xxx 格式
    const utf8FilenameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
    if (utf8FilenameMatch) {
      return decodeURIComponent(utf8FilenameMatch[1]);
    }
    // 处理 filename="xxx" 或 filename=xxx 格式
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i);
    if (filenameMatch && filenameMatch[1]) {
      return filenameMatch[1].replace(/['"]/g, '');
    }
  }
  return defaultFilename || 'download';
};
