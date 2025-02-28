declare namespace NodeJS {
  interface ProcessEnv {
    SALT_ROUND: string;
    PORT: string;
    SECRET_KEY: string;
  }
}
