declare module "@xmpp/client" {
  import { EventEmitter } from "react-native";
  export function client(options: {
    service?: string;
    domain?: string;
    resource?: string;
    username?: string;
    password?: string;
    credentials?: (
      auth: (params: { username: string; password: string }) => any,
      mechanism: string
    ) => any;
  }): XmppClient;

  type XmppStatus =
    | "online"
    | "offline"
    | "connecting"
    | "connect"
    | "opening"
    | "open"
    | "closing"
    | "close"
    | "disconnecting"
    | "disconnect";

  type XmppEvent = "status" | "error" | "stanza" | "online" | "offline";

  type XmppClient = EventEmitter & {
    start: () => Promise<any>;
    stop: () => void;
    send: (...args: any[]) => Promise<any>;
    on: (event: XmppEvent, callback?: (p?: any) => void) => void;
  };
  export function jid(): any;

  export function xml(tag: string, attributes?: Object, ...children: any): any;

  export namespace jid {
    class JID {
      constructor(...args: any[]);

      bare(...args: any[]): void;

      equals(...args: any[]): void;

      getDomain(...args: any[]): void;

      getLocal(...args: any[]): void;

      getResource(...args: any[]): void;

      setDomain(...args: any[]): void;

      setLocal(...args: any[]): void;

      setResource(...args: any[]): void;

      toString(...args: any[]): void;
    }

    function detectEscape(local: any): any;

    function equal(a: any, b: any): any;

    function escapeLocal(local: any): any;

    function jid(args: any): any;

    function parse(s: any): any;

    function unescapeLocal(local: any): any;
  }

  export namespace xml {
    class Element {
      constructor(...args: any[]);

      append(...args: any[]): void;

      prepend(...args: any[]): void;

      setAttrs(...args: any[]): void;
    }

    class Parser {
      constructor(...args: any[]);

      end(...args: any[]): void;

      onEndElement(...args: any[]): void;

      onStartElement(...args: any[]): void;

      onText(...args: any[]): void;

      write(...args: any[]): void;

      static XMLError(...args: any[]): void;

      static defaultMaxListeners: number;

      static init(): void;

      static listenerCount(emitter: any, type: any): any;

      static once(emitter: any, name: any): any;

      static usingDomains: boolean;
    }

    function XMLError(...args: any[]): void;

    function escapeXML(s: any): any;

    function escapeXMLText(s: any): any;

    function unescapeXML(s: any): any;

    function unescapeXMLText(s: any): any;

    function x(name: any, attrs: any, children: any): any;

    namespace Parser {
      class EventEmitter {
        constructor();

        addListener(type: any, listener: any): any;

        emit(type: any, args: any): any;

        eventNames(): any;

        getMaxListeners(): any;

        listenerCount(type: any): any;

        listeners(type: any): any;

        off(type: any, listener: any): any;

        on(type: any, listener: any): any;

        once(type: any, listener: any): any;

        prependListener(type: any, listener: any): any;

        prependOnceListener(type: any, listener: any): any;

        rawListeners(type: any): any;

        removeAllListeners(type: any, ...args: any[]): any;

        removeListener(type: any, listener: any): any;

        setMaxListeners(n: any): any;

        static EventEmitter: any;

        static defaultMaxListeners: number;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static usingDomains: boolean;
      }

      namespace XMLError {
        const stackTraceLimit: number;

        function captureStackTrace(p0: any, p1: any): any;
      }
    }

    namespace XMLError {
      const stackTraceLimit: number;

      function captureStackTrace(p0: any, p1: any): any;
    }
  }
}
