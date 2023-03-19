const user_name = document.getElementById("user_name");
const password = document.getElementById("password");

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let check = this.checkValidity();
  if (check) {
    let data = {
      username: user_name.value,
      password: password.value,
    };
    request.post("auth/login", data).then((res) => {
      console.log(res.data);
      location.href = "index.html";
    });
  }
});
