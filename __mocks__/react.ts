const react = require('react');

// Suppress requestAnimationFrame errors from React in jest environment
(global as any).window = global;
window.addEventListener = () => {};
window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};

module.exports = react;
