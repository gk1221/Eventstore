import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";

import { randomUUID } from "crypto";

const client = new EventStoreDBClient(
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
  {
    insecure: true,
  }
);

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

  const appendResult = await client.appendToStream(streamName, event);

  if (appendResult.success) console.log("Message sent!");
}
setInterval(() => {
  simpleTest();
}, 3000);
