// src/middleware/logger.ts

export const logger = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
  const timestamp = new Date().toISOString();
  const formatted = `[${level.toUpperCase()} - ${timestamp}] ${message}`;

  if (!window._APP_LOGS_) {
    window._APP_LOGS_ = [];
  }

  window._APP_LOGS_.push(formatted);
};

declare global {
  interface Window {
    _APP_LOGS_?: string[];
  }
}

export {};
