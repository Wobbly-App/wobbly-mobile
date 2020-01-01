/*
  Currently this is where I am keeping the more basic types that are composed
  into the reducers, actions, etc. Some of these may need to be contracted with the
  server in the future so that they don't diverge. 
*/

export interface IMessage {
  fromUser: string;
  toUser: string;
  message: string;
  meta: {
    timestamp: number;
  };
}

export interface ICreateGroup {
  description: string;
  name: string;
}

export interface IGroup {
  description: string;
  id: string;
  name: string;
}

export interface IGroupList {
  groups: IGroup[];
}
