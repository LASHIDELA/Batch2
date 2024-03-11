interface Config {
  apiBaseUrl: string;
  cliendId: string;
  secretId: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  cliendId: process.env.CLICEN_ID || "",
  secretId: process.env.SECRET_ID || "",
};
