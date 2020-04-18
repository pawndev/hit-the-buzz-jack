export enum ENVIRONMENT {
  PRODUCTION = 'production',
  LOCAL = 'local',
  PREPROD = 'preprod',
  DEV = 'development',
  TEST = 'test',
}

const config = {
  logger: {
    devMode: env('NODE_ENV', ENVIRONMENT.DEV) === ENVIRONMENT.LOCAL,
  },
  server: {
    address: env('HOST', '0.0.0.0'),
    port: int(env('PORT', '3000')),
    env: env('NODE_ENV', ENVIRONMENT.DEV),
  },
  application: {
    title: env('APPLICATION_TITLE', 'Buzz Buzz'),
  },
};

export default config;
export type IApplication = typeof config.application;

export function env(name: string): string | undefined;
export function env(name: string, defaultValue: string): string;
export function env(name: string, defaultValue?: string): string | undefined {
  return (process.env[name] as string) || defaultValue;
}

export function int(value: string): number;
export function int(value?: string): number | undefined;
export function int(value?: string): number | undefined {
  return value ? parseInt(value, 10) : undefined;
}

export function array(value: string): string[];
export function array(value?: string): string[] | undefined {
  return value ? value.split(/, ?/) : undefined;
}

export function boolean(value: string): boolean;
export function boolean(value?: string): boolean | undefined {
  return value === 'true';
}
