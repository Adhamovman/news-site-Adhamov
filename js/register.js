const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const user_name = document.getElementById("user_name");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let check = this.checkValidity();
  if (check) {
    let data = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: user_name.value,
      password: password.value,
    };
    request
    .post("auth/register", data)
    .then((res) => {
        localStorage.setItem(TOKEN, res.data.token);
        localStorage.setItem("user_password", res.data.password);
        location.href = "login.html";
    })
    .catch((err) => {
        alert("This username is already taken");
    });
}
});

request.get("user").then((res) => {
    console.log(res.data);
});
