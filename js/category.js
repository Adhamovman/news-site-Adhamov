const categoryId = localStorage.getItem("category");
const home = document.getElementById("home");
request.get(`category/${categoryId}`).then((res) => {
  home.innerHTML = getHome(res.data);
});
function getHome(category) {
  return `
  <div class="container">
  <h1 class="huge-h text-center">${category.name}</h1>
  <div class="d-flex justify-content-center text-center">
  <p class="home-desc main-p">
  ${category.description}
  </p>
      </div>
      <div class="navigation enter-p text-center">
      <a href="blog.html">Blog</a> > <a href="#"> ${category.name} </a>
      </div>
      </div>
      `;
}
const blogsRow = document.querySelector(".blogs-row");

request.get(`post?category=${categoryId}`).then((res) => {
  res.data.data.forEach((post) => {
    blogsRow.innerHTML += getBlog(post);
    console.log(post);
  });
});

function getBlog(post) {
  return `
  <a onclick="savePostId('${post._id}')" href="blog.html">
  <div class="card my-4">
  <div class="row g-0">
    <div class="col-sm-4">
      <img
        src= ${IMAGE_URL}${post.photo._id}.${post.photo.name.split(".")[1]}
        class="post-img w-100  object-fit-cover"
        alt="..."
      />
    </div>
    <div class="col-sm-8">
      <div class="card-body pt-0 ps-0 ps-sm-3 mt-3 mt-sm-0">
        <p class="huge-p">${post.category.name}</p>
        <h5 class="card-h">${post.title}</h5>
        <p class="main-p post-limit">
        ${post.description}
        </p>
      </div>
    </div>
  </div>
</div>
</a>
  `;
}

function savePostId(postId) {
  localStorage.setItem("postId", postId);
}

const noPost = document.querySelector(".no-post");
const search = document.querySelector(".search");
let notFound = document.getElementById("not-found");
search.addEventListener("input", (e) => {
  request.get(`post?search=${search.value}`).then((res) => {
    blogsRow.innerHTML = "";
    res.data.data.forEach((post) => {
      blogsRow.innerHTML += getBlog(post);
    });
    if (res.data.data.length) {
      notFound.classList.add("d-none");
      console.log("word");
    } else {
      notFound.classList.remove("d-none");
      console.log("asd");
    }
  });
});
