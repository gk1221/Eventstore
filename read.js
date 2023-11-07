import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";

const client = new EventStoreDBClient(
  {
    endpoint: "localhost:2113",
  },
  {
    insecure: true,
  }
);

const events = client.readStream("es_supported_clients", {
  direction: FORWARDS,
  fromRevision: START,
});

for await (const resolvedEvent of events) {
  console.log(resolvedEvent.event?.data);
}
