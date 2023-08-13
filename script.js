window.onGoogleLibraryLoad = () => {
  google.accounts.id.initialize({
    client_id:
      '1080936340356-o5qa88e8ba4bfal13lth15s55pk03oir.apps.googleusercontent.com',
    cancel_on_tap_outside: false,
    callback: handleCredentialResponse,
  });

  document
    .getElementById('sign-in-with-google')
    .addEventListener('click', () => {
      signInWithOneTap();
    });
};

function handleCredentialResponse(response) {
  if (response.credential) {
    const userInfoContainer = document.getElementById('user-info');
    const fullName = document.getElementById('user-info-name');
    const email = document.getElementById('user-info-email');
    const picture = document.getElementById('user-info-picture');

    console.log({ response });

    const user = parseJWT(response.credential); // parsing the credential

    // log to console things

    console.log('ID: ' + user.sub);
    console.log('Full Name: ' + user.name);
    console.log('E-mail: ' + user.email);
    if (user.picture) {
      console.log('Picture: ' + user.picture);
    }
    console.log(JSON.stringify(parseJWT(response.credential)));

    // prepare to display the user details

    fullName.textContent = user.name;
    email.textContent = user.email;
    if (user.picture) {
      picture.setAttribute('src', user.picture);
      picture.style.display = 'block';
    } else {
      picture.style.display = 'none';
    }

    userInfoContainer.style.display = 'flex';
  } else {
    console.log('Credential not found!');
  }
}

function parseJWT(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function signInWithOneTap() {
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log('try next provider if OneTap is not displayed or skipped');
    }
  });
}

console.log(
  'With love, Sony AK <sony@sony-ak.com> GitHub https://github.com/sonyarianto'
);
