//Remove the auth token in cookie and redirect to the log in page when the user clicks the logout button
function log_out_user(event)
{
    Cookies.remove(`auth`);
    window[`location`] = `/index.html`;
}
// Display the contents of the API request onto the page automatically if the user is logged in since this function is called within a conditional below.
function get_colors_success(res)
{
    let data = res[`data`][`data`];
    for(let i = 0; i < data.length; i++)
    {
        document.querySelector(`#color_container`).insertAdjacentHTML(`beforeend`, 
        `<article class="color_card">
            <h3>${data[i][`name`]}</h3>
            <p>${data[i][`year`]}</p>
            <div id="color_box" style="width: 30px; height: 12px; background-color: ${data[i][`color`]};"></div>
        </article>`);
    }
}
//If the content request fails, first remove the error message if there is one, and then add another error message.
function get_colors_error(err)
{
    if(document.querySelector(`#title_message`))
    {
        document.querySelector(`#title_message`).remove();
    }
    let body = document.querySelector(`body`);
    body.insertAdjacentHTML(`afterbegin`, `<div id="title_message"><h1>An error occured</h1><div>`);
}

let token = Cookies.get(`auth`);
if(token === undefined)
{
    //if the user is not logged in, remove the error message if it exists and add an error message and a button for the using to return to the log in page.
    if(document.querySelector(`#title_message`))
    {
        document.querySelector(`#title_message`).remove();
    }

    let body = document.querySelector(`body`);
    body.insertAdjacentHTML(`afterbegin`, `<div id="title_message"><h1>No user logged in</h1><br><a style="text-decoration: none; color: black;" href="/index.html" target="_blank"><button id="return_button">Return</button></a><div>`);
}
else
{
    //If the cookie exists and the user is logged in, remove the error message if it exists and add a welcome message to the user
    if(document.querySelector(`#title_message`)){
        document.querySelector(`#title_message`).remove();
    }
    //Add a logout button only if the user is logged in.
    let body = document.querySelector(`body`);
    body.insertAdjacentHTML(`afterbegin`, `<div id="title_message"><h1>Welcome, user!</h1><br><button id="logout_button">Log out</button><div>`);
    document.querySelector(`#logout_button`).addEventListener(`click`, log_out_user);
    //Make the content request to the API.
    axios.request(
        {
            url: `https://reqres.in/api/unknown`
        }
    ).then(get_colors_success).catch(get_colors_error);
}