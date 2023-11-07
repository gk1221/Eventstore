import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { readFileSync } from "fs";

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2111,
      },
      {
        address: "localhost",
        port: 2112,
      },
      {
        address: "localhost",
        port: 2113,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync("../../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);

const events = client.readStream("es_supported_clients", {
  direction: FORWARDS,
  fromRevision: BigInt(10),
});
for await (const resolvedEvent of events) {
  console.log(1);
  console.log(resolvedEvent.event);
}
