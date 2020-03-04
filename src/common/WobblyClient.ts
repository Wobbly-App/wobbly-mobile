import { XmppClient, XmppStatus, client, xml } from '@xmpp/client';
import debug from '@xmpp/debug';
import jid from '@xmpp/jid';

import { Message } from '../redux/modules/messages';

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
    messageHandler?: (msg: Message) => void,
  ) {
    this.client = client({
      service,
      domain,
      resource,
      username,
      password,
    });
    debug(this.client, true);
    this.status = 'disconnect';
    this.jid = `${username}@${domain}`;

    this.client.on('error', err => {
      console.error(err);
    });

    this.client.on('online', async () => {
      // Makes itself available
      await this.client.send(xml('presence'));

      // Send msg to self
      // await this.sendChat('dev@xmpp.wobbly.app', 'hello from wobbly');
    });

    this.client.on('status', status => {
      this.status = status;
    });

    if (messageHandler) {
      this.client.on('stanza', stanza => {
        if (stanza.is('message') && stanza.getChild('stanza-id')) {
          const message: Message = {
            id: stanza.getChild('stanza-id').attrs.id,
            fromJid: jid(stanza.attrs.from)
              .bare()
              .toString(),
            toJid: jid(stanza.attrs.to)
              .bare()
              .toString(),
            text: stanza.getChildText('body'),
            timestamp: Date.now(),
            sent: true,
            error: false,
          };
          messageHandler(message);
        }
      });
    }
  }

  public start = () => {
    this.client.start().catch(e => {
      console.error(e);
    });
  };

  public stop = () => {
    this.client.stop();
  };

  public sendChat = async (recipientJid: string, text: string) => {
    const message = xml(
      'message',
      {
        type: 'chat',
        to: jid(recipientJid)
          .bare()
          .toString(),
      },
      xml('body', {}, text),
    );
    await this.client.send(message);
  };
}
