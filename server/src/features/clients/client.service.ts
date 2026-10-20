import { findAllClients, findClientById } from "./client.repository";
import { Client } from "./client.types";

const hidePassword = (client: Client): Omit<Client, "password"> => {
  const { password, ...safeClient } = client;
  void password;
  return safeClient;
};

export const getClientsService = (): Omit<Client, "password">[] =>
  findAllClients().map(hidePassword);

export const getClientByIdService = (id: string): Omit<Client, "password"> =>
  hidePassword(findClientById(id));
