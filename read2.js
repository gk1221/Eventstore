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
        port: 2112,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync("../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);

const events = client.readStream("some-stream", {
  direction: FORWARDS,
  fromRevision: START,
});
for await (const resolvedEvent of events) {
  console.log(1);
  console.log(resolvedEvent.event);
}
