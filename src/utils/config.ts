interface Config {
  apiBaseUrl: string;
  cliendId: string;
  secretId: string;
  spaceEndpoint: string;
  spaceAccessKeyId: string;
  spaceSecreatAccessKeyId: string;
  orderAppUrl: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  cliendId: process.env.CLICEN_ID || "",
  secretId: process.env.SECRET_ID || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecreatAccessKeyId: process.env.SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.ORDER_APP_URL || "",
};
