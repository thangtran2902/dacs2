const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// data
const app = {
  dataCarousel: JSON.parse(localStorage.getItem("DATA_SLIDER_STORAGE") || "[]"),
  dataAdopt: JSON.parse(localStorage.getItem("DATA_ADOPT") || "[]"),
  dataRescue: JSON.parse(localStorage.getItem("DATA_RESCUE") || "[]"),
  adoptDetail: JSON.parse(localStorage.getItem("ADOPT_DETAIL") || "{}"),
};

//variable
const sectionSlider = $(".carousel__viewport");
const adoptCard = $(".adopt__content");
const rescue = $(".rescue__container");
const elementDetail = $(".detail");
const header = $(".header");
// menu bar
let menu = $("#menu-bar");
let navbar = $(".navbar");

//scroll header
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 99) {
    header.classList.add("mark");
  } else {
    header.classList.remove("mark");
  }
});

//menu bar
menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

const handleClickAdopt = (href) => {
  const adoptBtn = $$(".adopt__card-btn") || [];
  adoptBtn.forEach((element, idx) => {
    element.addEventListener("click", (e) => {
      localStorage.setItem("ADOPT_DETAIL", JSON.stringify(app.dataAdopt[idx]));
      element.href = href;
    });
  });
};

//slider home
if (sectionSlider) {
  sectionSlider.innerHTML = app.dataCarousel
    .map((item, idx) => {
      return `
    <li id="carousel__slide${
      idx + 1
    }" tabindex=${idx} class="carousel__slide" style="background-image: url(${
        item.image
      })">
      <div class="carousel__snapper">
        <a href="#carousel__slide${idx + 1}" class="carousel__prev">
          Go to last slide
        </a>
      <a href="#carousel__slide${idx + 2}" class="carousel__next">
        Go to next slide
      </a>
    </div>
  </li>`;
    })
    .join("");
}

//data adopt
if (adoptCard) {
  adoptCard.innerHTML = app.dataAdopt
    .map((item, idx) => {
      return `
          <div class="adopt__content-card">
            <div class="adopt__card-first">
              <img src=${item?.image || ""} alt="adopt animal" />
            </div>
            <div class="adopt__card-second">
              <h4 class="adopt__card-name">
                <i class="fas fa-dog"></i>
                <p>${item?.name || ""}</p>
              </h4>
              <div class="adopt__card-gender">
                <i class="fas fa-venus-mars"></i>
                <p>${item?.gender || ""}</p>
              </div>
              <div class="adopt__card-type">
                <i class="fas fa-syringe"></i>
                <p>${item?.type}</p>
              </div>
              <a href="javascript:handleClickAdopt('/adopt/id.html')" class="adopt__card-btn">Nhận nuôi</a>
            </div>
          </div>
    `;
    })
    .join("");
}

//data adopt detail
if (elementDetail) {
  elementDetail.innerHTML = `
      <div class="detail__left">
        <img src=${app?.adoptDetail?.image || ""} alt="" />
      </div>
      <div class="detail__right">
        <h3 class="detail__right-title">${app?.adoptDetail?.name || ""}</h3>
        <p class="detail__right-alike"><span>Giống:</span> ${
          app?.adoptDetail?.insemination || ""
        }</p>
        <p class="detail__right-color"><span>Màu sắc:</span> ${
          app?.adoptDetail?.color || ""
        }</p>
        <p class=""><span>Tiêm phòng:</span> Chưa</p>
        <p class=""><span>Triệt sản:</span> ${app?.adoptDetail?.type || ""}</p>
        <p class="detail__description">
          ${app?.adoptDetail?.description}
        </p>
        <button class="detail__right-btn">Liên hệ nhận nuôi</button>
      </div>
  `;
}
//data rescue
if (rescue) {
  rescue.innerHTML = app.dataRescue
    .map((item, idx) => {
      return `
          <div class="rescue__card">
            <div class="rescue__card-inner">
              <div class="rescue__card-front">
                <img src=${item?.image || ""} alt="" />
                <div class="date">
                  <p class="day">${item?.dateRescue || ""}</p>
                  <p class="month">${item?.monthRescue || ""}</p>
                </div>
              </div>
              <div class="rescue__card-back">
                <p class="description">
                  ${item?.description || ""}
                </p>
                <div style="text-align: end; margin-top: 20px">
                  <a href="" class="see__more">Chi tiết</a>
                </div>
              </div>
            </div>
          </div>
`;
    })
    .join("");
}
