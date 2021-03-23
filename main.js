window.fbAsyncInit = function() {
    FB.init({
      appId            : '1180525982364995',
      status: true,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v10.0'
    });    

    FB.getLoginStatus(function(response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
};

const loginFacebook = document.querySelector('#login-facebook');
loginFacebook.addEventListener('click', () => {
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
})

const logoutFacebook = document.querySelector('#logout-facebook');
logoutFacebook.addEventListener('click', () => {
    FB.logout(function(response) {
        console.log('bye bye');
     });
})


const statusChangeCallback = function (response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        console.log('connected');
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
        console.log('disconnected');
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
}


const testAPI = function() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log(' testAPI Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}

const login = document.querySelector('.login')
const logout = document.querySelector('.logout')

const buttonCheck = (data) => {
    console.log('data: ', data);
    if (!data.authResponse) login.style.display = 'block';
    else logout.style.display = 'block';
}

