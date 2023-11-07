import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { randomUUID } from "crypto";

import { readFileSync } from "fs";

const client = EventStoreDBClient.connectionString`esdb://localhost:2111,localhost:2112,localhost:2113?tls=true&tlsVerifyCert=false`;
async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    type: "grpc-client",
    data: {
      ID: randomUUID(),
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  const appendResult = await client.appendToStream(streamName, [event]);

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
