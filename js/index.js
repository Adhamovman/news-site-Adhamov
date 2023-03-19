const home = document.getElementById("home");

const carouselContainer = document.getElementById("carousel-container");

request.get("post/lastones").then((allpost) => {
  const posts = allpost.data;
  const carousel = document.createElement("div");
  carousel.classList.add("owl-carousel");
  carouselContainer.appendChild(carousel);

  posts.forEach((post) => {
    const item = createPostElement(post);
    carousel.appendChild(item);
  });

  function createPostElement(post) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    itemDiv.appendChild(cardDiv);

    const img = document.createElement("img");
    img.src = `${IMAGE_URL}${post.photo._id}.${post.photo.name.split(".")[1]}`;
    img.alt = post.alt;
    img.classList.add("card-img-top");
    cardDiv.appendChild(img);

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body", "p-0", "mt-4");
    cardDiv.appendChild(cardBodyDiv);

    const postDate = document.createElement("p");
    postDate.classList.add("post-date", "main-p");
    postDate.innerHTML = `By <span>${post.user.first_name} ${
      post.user.last_name
    }</span> | ${post.createdAt.split("T")[0]}`;
    cardBodyDiv.appendChild(postDate);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-h");
    cardTitle.innerHTML = `${post.title}`;
    cardBodyDiv.appendChild(cardTitle);

    const postContent = document.createElement("p");
    postContent.classList.add("main-p");
    postContent.classList.add("post-limit");
    postContent.innerHTML = `${post.description}`;
    cardBodyDiv.appendChild(postContent);

    return itemDiv;
  }

  carouselContainer.appendChild(carousel);
  $(carousel).owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
const categoryRow = document.getElementById("category-row");

request.get("category").then((allcategory) => {
  const categories = allcategory.data.data;
  console.log(categories);
  const carousel = document.createElement("div");
  carousel.classList.add("owl-carousel");

  categories.forEach((category) => {
    const item = appendCardToCarousel(category);
    carousel.appendChild(item);
  });

  function appendCardToCarousel(category) {
    let link = document.createElement("a");
    link.setAttribute("href", "category.html");
    link.onclick = () => {
        localStorage.setItem("category", category._id);
    }
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card category-card mb-3");

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "card-body");

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `${IMAGE_URL}${category.photo._id}.${category.photo.name.split(".")[1]}`
    );
    img.setAttribute("alt", `${category.name}`);

    let h5 = document.createElement("h5");
    h5.setAttribute("class", "card-h mt-3");
    h5.textContent = `${category.name}`;

    let p = document.createElement("p");
    p.setAttribute("class", "main-p");
    p.textContent = `${category.description}`;

    cardBodyDiv.appendChild(img);
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);

    cardDiv.appendChild(cardBodyDiv);

    link.appendChild(cardDiv);

    let item = document.createElement("div");
    item.setAttribute("class", "item");
    item.appendChild(link);

    return item;
  }

  categoryRow.appendChild(carousel);
  $(carousel).owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

request.get("post/lastone").then((res) => {
    home.innerHTML = getHome(res.data);
    // home.style.backgroundImage = `url(${res.data.photo._id}.${res.data.photo.name.split(".")[1]})`;

  });
  
function getHome({ user, category }) {
  return `
          <div class="container">
          <p class="enter-p">Posted on <span> ${category.name} </span></p>
          <div class="home-wrap my-3">
            <h1 class="huge-h color-white">
              Step-by-step guide to choosing great font pairs
            </h1>
          </div>
          <p class="last-post-date main-p">
            By <span> ${user.first_name} ${user.last_name}</span> | ${
    category.createdAt.split("T")[0]
  }
          </p>
          <div class="main-text-wrap">
            <p class="main-p color-white">
             ${category.description}
            </p>
          </div>
          <a href="blog.html" class="btn btn-main mt-4">Read More ></a>
        </div>
        `;
}
