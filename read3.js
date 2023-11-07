import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  BACKWARDS,
  END,
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

const events = client.readAll({
  direction: BACKWARDS,
  fromPosition: END,
  resolveLinkTos: true,
  maxCount: 10,
});
for await (const resolvedEvent of events) {
  if (resolvedEvent.event?.type.startsWith("$")) {
    continue;
  } //略過系統stream

  console.log(resolvedEvent.event?.type);
}
