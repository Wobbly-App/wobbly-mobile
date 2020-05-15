export default class {
  private domain: string;
  private accessToken: string;
  private refreshToken: string;

  public constructor(
    domain: string,
    accessToken: string,
    refreshToken: string,
  ) {
    this.domain = domain;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  // Note: instantiating this class is handled in `ClientProvider.ts`, not here.
  // It can either be instantiated when logging in initially, or when starting the app
  // at a later time. This static function is used in the former case.
  public static async login(domain: string, email: string, password: string) {
    const user = {
      user: {
        email,
        password,
      },
    };
    return fetch(`https://${domain}/api/v1/session/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
  }

  public static async signup(domain: string, email: string, password: string) {
    const user = {
      user: {
        email,
        password,
        passwordConfirmation: password,
      },
    };
    return fetch(`https://${domain}/api/v1/registration/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
  }

  public getMessages() {
    return this.get('messages/');
  }

  public sendMessage(recipient: string, body: string) {
    return this.post('messages/', { recipient, body });
  }

  public getGroups() {
    return this.get('groups/');
  }

  public createGroup(name: string) {
    return this.post('groups/', { name });
  }

  // Private helper functions
  private post(endpoint: string, body: any, domainOverride?: string) {
    const domain = domainOverride || this.domain;
    return fetch(`https://${domain}/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.accessToken,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  private get(endpoint: string) {
    fetch(`https://${this.domain}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.accessToken,
      },
    }).then((response) => response.json());
  }
}
