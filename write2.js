import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { randomUUID } from "crypto";

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
async function simpleTest() {
  const streamName = "some-stream";

  const event = jsonEvent({
    type: "grpc-client",
    data: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
      set: 1,
    },
    metadata: {
      resource: "Node.js",
    },
  });

  await client.appendToStream(streamName, [event]);
  await client.appendToStream(streamName, [event]);

  const events = client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  for await (const event of events) {
    console.log(event);
  }
}

simpleTest();
