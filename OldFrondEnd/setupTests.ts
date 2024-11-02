const mockEnv = {
  VITE_API_URL: 'http://localhost:3000/'  // Replace with your mock URL
};

Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: mockEnv
    }
  },
  writable: true,
});