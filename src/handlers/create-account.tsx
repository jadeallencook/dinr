import * as firebase from 'firebase/app';

export default (email: String, password: String): Promise<String> =>
  new Promise((res, rej) => firebase);
