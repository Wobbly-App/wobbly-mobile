import React from "react";
import { client, xml, XmppClient } from "@xmpp/client";

export class WobblyClient {
  private client: XmppClient;

  public constructor(
    service: string,
    domain: string,
    resource: string,
    username: string,
    password: string
  ) {
    this.client = client({
      service,
      domain,
      resource,
      username,
      password
    });

    this.client.on("error", err => {
      console.error(err);
    });

    this.client.on("offline", () => {
      console.log("offline");
    });

    // this.client.on("stanza", async stanza => {
    //   if (stanza.is("message")) {
    //     await this.client.send(xml("presence", { type: "unavailable" }));
    //     await this.client.stop();
    //   }
    // });

    this.client.on("online", async address => {
      console.log("Online!");
      // Makes itself available
      await this.client.send(xml("presence"));

      // Sends a chat message to itself
      const message = xml(
        "message",
        { type: "chat", to: address },
        xml("body", {}, "hello world")
      );
      await this.client.send(message);
    });

    this.client.on("status", status => {
      console.debug(status);
    });
  }

  public start = () => {
    this.client.start().catch(console.error);
  };
}
