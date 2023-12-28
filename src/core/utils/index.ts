export const isDevelopmentEnvironment = (): boolean => {
  const ENVIRONMENT = process.env.NODE_ENV;
  return ENVIRONMENT === 'development';
};

export const isTestEnvironment = (): boolean => {
  const ENVIRONMENT = process.env.NODE_ENV;
  return ENVIRONMENT === 'test';
};
