import { client, xml, XmppClient, XmppStatus } from "@xmpp/client";
import debug from "@xmpp/debug";
import { IMessage } from "../redux/modules/messages";

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
    messageHandler?: (msg: IMessage) => void
  ) {
    this.client = client({
      service,
      domain,
      resource,
      username,
      password
    });
    debug(this.client, true);
    this.status = "disconnect";
    this.jid = `${username}@${domain}`;

    this.client.on("error", err => {
      console.error(err);
    });

    this.client.on("online", async address => {
      // Makes itself available
      await this.client.send(xml("presence"));

      // Send msg to self
      await this.sendChat("dev@xmpp.wobbly.app", "hello from wobbly");
    });

    this.client.on("status", status => {
      this.status = status;
    });

    if (!!messageHandler) {
      this.client.on("stanza", stanza => {
        if (stanza.is("message")) {
          console.log(stanza);
          const message: IMessage = {
            id: stanza.getChild("stanza-id").attrs.id,
            fromJid: stanza.attrs.from,
            toJid: stanza.attrs.to,
            text: stanza.getChildText("body"),
            timestamp: Date.now(),
            sent: true,
            error: false
          };
          messageHandler(message);
        }
      });
    }
  }

  public start = () => {
    this.client.start().catch(console.error);
  };

  public stop = () => {
    this.client.stop();
  };

  public sendChat = async (recipientJid: string, text: string) => {
    const message = xml(
      "message",
      { type: "chat", to: recipientJid },
      xml("body", {}, text)
    );
    console.log("sending...");
    await this.client.send(message);
  };
}
