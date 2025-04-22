import { CompressionOptions } from 'compression';

export const compressionConfig: CompressionOptions = {
  level: 6,
  threshold: 100 * 1024, // 100kb
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return true;
  },
}; 