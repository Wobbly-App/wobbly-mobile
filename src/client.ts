import { Strophe } from "strophe.js";
import React from "react";

export class WobblyClient {
  private readonly conn: Strophe.Connection;
  public status: Strophe.Status;

  public constructor(service: string) {
    this.conn = new Strophe.Connection(service);
    this.status = Strophe.Status.DISCONNECTED;
  }

  /**
   * Connect to the service.
   */
  public connect = (jid: string, password: string): Promise<Strophe.Status> => {
    return new Promise((resolve, reject) => {
      const handleConnect = (status: Strophe.Status): void => {
        this.status = status;
        console.warn(status);
        switch (status) {
          case Strophe.Status.CONNECTED:
            resolve(status);
            break;
          // Do nothing for intermediate states
          case Strophe.Status.AUTHENTICATING:
            break;
          case Strophe.Status.CONNECTING:
            break;
          case Strophe.Status.DISCONNECTING:
            break;
          // Other statuses: something went wrong
          default:
            reject(status);
        }
      };
      this.conn.connect(jid, password, handleConnect);
    });
  };
}

export const ClientContext = React.createContext(
  (undefined as any) as WobblyClient
);
