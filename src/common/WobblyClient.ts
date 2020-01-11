import { client, xml, XmppClient, XmppStatus } from "@xmpp/client";

export default class {
  private client: XmppClient;

  public status: XmppStatus;
  public jid: string;

  public constructor(
    service: string,
    domain: string,
    resource: string,
    username: string,
    password: string,
    messageHandler?: (msg: any) => void
  ) {
    this.client = client({
      service,
      domain,
      resource,
      username,
      password
    });
    this.status = "disconnect";
    this.jid = `${username}@${domain}`;

    this.client.on("error", err => {
      console.error(err);
    });

    this.client.on("online", async address => {
      console.log("Online!");
      // Makes itself available
      await this.client.send(xml("presence"));
    });

    this.client.on("status", status => {
      this.status = status;
    });

    if (!!messageHandler) {
      this.client.on("stanza", stanza => {
        if (!stanza.is("message")) {
          return;
        }
        messageHandler(stanza);
      });
    }
  }

  public start = () => {
    this.client.start().catch(console.error);
  };

  public sendChat = async (recipientJid: string, text: string) => {
    const message = xml(
      "message",
      { type: "chat", to: recipientJid },
      xml("body", {}, text)
    );
    await this.client.send(message);
  };
}
