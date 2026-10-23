import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6ad8db47002185c172d1");

const tablesDB = new TablesDB(client);

export { client, tablesDB };

