import * as firebase from 'firebase/app';
import 'firebase/auth';
import validateZipcode from '../validators/validate-zipcode';
import validateEmail from '../validators/validate-email';
import updateProfileHandler from '../handlers/update-profile';

export default ({
  email,
  password,
  reenter,
  zipcode
}: {
  email: string;
  password: string;
  reenter: string;
  zipcode: string;
}): Promise<string> =>
  new Promise((res, rej) => {
    if (!validateEmail(email)) {
      rej('Email is badly formatted.');
    } else if (!validateZipcode(zipcode)) {
      rej('ZIP code is badly formatted.');
    } else if (!password) {
      rej('You forgot to enter a password');
    } else if (!reenter) {
      rej('You forgot to reenter a password');
    } else if (password !== reenter) {
      rej('Passwords do not match.');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const uid = response?.user?.uid ? response.user.uid : null;
          if (!uid) {
            rej('Could not update profile with zipcode.');
          }
          updateProfileHandler({ zipcode, uid, name: '', street: '' })
            .then(() => res())
            .catch(error => rej(error));
        })
        .catch(error => rej(error.message));
    }
  });
