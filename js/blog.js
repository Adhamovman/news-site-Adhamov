const postId = localStorage.getItem("postId");
const blog = document.getElementById("blog");
console.log(postId);
request.get(`post/${postId}`).then((res) => {
  console.log(res.data);
  blog.innerHTML = getBlog(res.data);
});
function getBlog(post) {
  const obj = post.tags;
  const hashtags = "#" + obj.join(", #");

  return `
    <div class="container">
    <img class="w-100 blog-image" src=${IMAGE_URL}${post.photo._id}.${post.photo.name.split(".")[1]}  alt="" />
    <div class="blog-post">
      <div class="post-detail d-flex align-items-center mb-3">
        <div class="poster-img">
          <img src=${IMAGE_URL}${post.user.photo} alt="" />
        </div>
        <div class="poster-detail ms-3">
          <p class="card-h poster-name m-0">${post.user.first_name} ${
    post.user.last_name
  }</p>
          <p class="main-p post-date m-0">Posted on ${
            post.updatedAt.split("T")[0]
          }</p>
        </div>
      </div>
      <div class="post-sec">
        <h2 class="main-h post-heading mb-4">
         ${post.title}
        </h2>
        <h4 class="pagination-text mb-5 text-start">
          ${post.category.name} (${hashtags})
        </h4>
        <p class="main-p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam
          sem. At risus viverra adipiscing at in tellus. Sociis natoque
          penatibus et magnis dis parturient montes. Ridiculus mus mauris
          vitae ultricies leo. Neque egestas congue quisque egestas diam.
          Risus in hendrerit gravida rutrum quisque non.
        </p>
      </div>
    </div>
  </div>
    `;
}
