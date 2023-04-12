function log_in_user(event)
{
    //Remove the error message if there is one
    if(document.querySelector(`#error_message`))
    {
        document.querySelector(`#error_message`).remove();
    }
    //Assign the values of the input field to variables
    let email = document.querySelector(`#email_input`)[`value`];
    let password = document.querySelector(`#password_input`)[`value`];
    //Make post request with the input fields values
    axios.request(
        {
            method: `POST`,
            url: `https://reqres.in/api/login`,
            data: {
                email: email,
                password: password
            }
        }
    ).then(login_success).catch(login_failure);
}
//Store the token in a cookie if the log in was succesful and redirect to the home page
function login_success(res)
{
    Cookies.set(`auth`, res[`data`][`token`]);
    window[`location`] = `/pages/home.html`;
}
// Insert an error message if the log in failed
function login_failure(err)
{
    login_button.insertAdjacentHTML(`afterend`, `<h4 id="error_message">Login failed</h4>`);
}

let login_button = document.querySelector(`#login_button`);
login_button.addEventListener(`click`, log_in_user);