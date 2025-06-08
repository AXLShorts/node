/**
 * Simple logging utility to replace console statements
 */
interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, error?: unknown) => void;
}

export const logger: Logger = {
  info: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
  },

  warn: (message: string): void => {
    // eslint-disable-next-line no-console
    console.warn(message);
  },

  error: (message: string, error?: unknown): void => {
    // eslint-disable-next-line no-console
    console.error(message, error);
  },
};
