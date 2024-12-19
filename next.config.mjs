// next.config.mjs
export default {
    experimental: {
      serverActions: true,  // Enable Server Actions (if using them)
    },
    api: {
      bodyParser: {
        sizeLimit: '10mb',  // Set the size limit for API routes (adjust as needed)
      },
    },
  };
  