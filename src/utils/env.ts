/**
 * Environment node is running on. Only available on server
 */
export const NODE_ENV = process.env.NODE_ENV;

/**
 * Whether current code is being executed on client or not
 */
export const isClient = typeof window !== 'undefined';

/**
 * Whether current code is being executed on server (in node.js) or not
 */
export const isServer = !isClient;
