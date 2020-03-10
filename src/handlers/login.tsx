import * as firebase from 'firebase/app';

export default (email: String, password: String): Promise<String | null> =>
  new Promise((res, rej) => firebase);
