import Boom from "@hapi/boom";
import { clientsMock } from "./data.mock";
import { Client } from "./client.types";

export const findAllClients = (): Client[] => clientsMock;

export const findClientById = (id: string): Client => {
  const client = clientsMock.find((item) => item.id === id);
  if (!client) {
    throw Boom.notFound("Client not found");
  }
  return client;
};
