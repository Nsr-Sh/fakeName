// select elements
const container = document.querySelector(".container"),
  overlay = document.querySelector("#overlay"),
  modal = document.querySelector(".preview");

// events: click and select gender
container.addEventListener("click", main);

// Function main: call gatdata function based on selected gender
let gender;
function main(e) {
  if (e.target.parentElement.classList.contains("avator")) {
    const avator = e.target.parentElement;
    gender = avator.id;
    getData(gender);
  }
}

// Function getData: get data from API
// send XMLHttpRequest to API
// and get Data from nameFake (based on gender)
let data;
function getData(gender) {
  const req = new XMLHttpRequest();
  req.open(
    "Get",
    `https://api.namefake.com/english-united-states/${gender}/`,
    true
  );
  req.send();
  req.addEventListener("load", function () {
    data = JSON.parse(this.responseText);
    console.log(data);
    makeModal(data);
  });
}

// Function makeModal: create modal box and insert it to DOM
function makeModal(data) {
  const html = `   <div id="overlay" ></div>
<div class="preview">
  <i class="fa-solid fa-xmark" onclick=closeModal()></i>
  <div id="box-image"><img src="assets/images/${
    data.url.split("/")[4] === "male" ? "m.png" : "w.png"
  }" alt="" /></div>
  <div class="info">
    <div class="row">
      <span class="title">Name</span>
      <p class="data">${data.name}</p>
      <hr />
    </div>
    <div class="row">
      <span class="title">Phone</span>
      <p class="data">${data.phone_h}</p>
      <hr />
    </div>
    <div class="row">
      <span class="title">Email</span>
      <p class="data">${data.email_u}@${data.email_d}</p>
      <hr />
    </div>
    <div class="row">
      <span class="title">Age</span>
      <p class="data">${
        new Date().getFullYear() - data.birth_data.split("-")[0]
      }</p>
      <hr />
    </div>
  </div>
</div>`;
  container.insertAdjacentHTML("afterend", html);
}

// Function closeModal: close modal box
function closeModal() {
  document.querySelector(".preview").classList.add("hidden");
  document.querySelector("#overlay").classList.add("hidden");
}
