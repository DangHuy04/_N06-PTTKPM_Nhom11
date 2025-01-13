// Init Swiper
$(document).ready(function () {
    var btn = $(".button");
    btn.click(function () {
        btn.toggleClass("paused");
        // Kiểm tra trạng thái của autoplay và thực hiện hành động tương ứng
        if (swiper.autoplay.running) {
            swiper.autoplay.stop(); // Dừng autoplay nếu đang chạy
        } else {
            swiper.autoplay.start(); // Bắt đầu autoplay nếu không chạy
        }
        return false;
    });
});

const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 1,
    slideToClickedSlide: true,
    loopAdditionalSlides: 1,
    loopFillGroupWithBlank: true,
    autoHeight: true,
    slideShadows: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: false,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1.268,
        spaceBetween: 20,
      },
    },
  });
  // Lấy ra nút dừng và gán sự kiện click
  const stopButton = document.querySelector(".stop-button");
  if (stopButton) {
    stopButton.addEventListener("click", function () {
      swiper.autoplay.stop(); // Dừng autoplay
    });
  }
  
  // Lấy ra nút bắt đầu và gán sự kiện click
  const startButton = document.querySelector(".start-button");
  if (startButton) {
    startButton.addEventListener("click", function () {
      swiper.autoplay.start(); // Bắt đầu autoplay
    });
  }
  
  window.onload = function () {
    const video = document.querySelector(".video-apple");
    if (video) {
      video.play();
    }
  };
  
  let header = document.querySelector(".header");
  
  let hoverChung = document.getElementsByClassName("chung");
  
  let subNav = document.getElementsByClassName("subnav1");
  let linkZ = document.getElementsByClassName("linkz");
  let phuWeb = document.querySelector(".phuWeb");
  let firstHoverDone = false;
  
  for (let i = 0; i < hoverChung.length; i++) {
    hoverChung[i].addEventListener("mouseover", function () {
      if (!firstHoverDone) {
        firstHoverDone = true; // Đánh dấu đã hover lần đầu
      } else {
        // Nếu đã hover lần đầu, đặt animation của tất cả các phần tử 'subnav1' thành 'none'
        for (let j = 0; j < subNav.length; j++) {
          subNav[j].style.animation = "none";
        }
      }
    });
    hoverChung[i].addEventListener("mouseout", function () {
      for (let j = 0; j < subNav.length; j++) {
        subNav[j].style.animation = "growDown 0.5s ease-in-out forwards";
      }
    });
  }
  
  // Duyệt qua tất cả các phần tử có class 'chung' để thêm sự kiện 'mouseover' cho chúng
  for (let i = 0; i < hoverChung.length; i++) {
    hoverChung[i].addEventListener("mouseover", function () {
      
      if (phuWeb) {
        phuWeb.style.display = "block";
      }
    });
    hoverChung[i].addEventListener("mouseout", function () {
      if (phuWeb) {
        phuWeb.style.display = "none";
      }
    });
  }
  let timKiem = document.getElementById("timkiem");
  
  timKiem.addEventListener("click", function (event) {
    let input = document.querySelector(".subnav1z");
    event.preventDefault(); 
    
    if (input.style.display === "block") {
      input.style.display = "none";
      phuWeb.style.display = "none";
    } else {
      input.style.display = "block";
      input.style.animation = "growDown 0.5s ease-in-out forwards";
      input.style.backgroundColor = "rgba(18, 18, 19, 1)";
      phuWeb.style.display = "block";
    }
  });
  
  let gioHang = document.getElementById("giohang");
  
  gioHang.addEventListener("click", function (event) {
    let input1 = document.querySelector(".subnav2z");
    event.preventDefault(); 
    
    if (input1.style.display === "block") {
      input1.style.display = "none";
      phuWeb.style.display = "none";
    } else {
      input1.style.display = "block";
      input1.style.animation = "growDown 0.5s ease-in-out forwards";
      input1.style.backgroundColor = "rgba(18, 18, 19, 1)";
      phuWeb.style.display = "block";
    }
  });
  timKiem.addEventListener("mouseover", function (event) {
      let input1z = document.querySelector(".subnav2z");
      event.preventDefault(); 
      input1z.style.display = "none";
      phuWeb.style.display = "none";
  });
  
  
  gioHang.addEventListener("mouseover", function (event) {
      let input1 = document.querySelector(".subnav1z");
      event.preventDefault(); 
      input1.style.display = "none";
      phuWeb.style.display = "none";
  });
  
  timKiem.addEventListener("click", function (event) {
      let input1 = document.querySelector(".subnav1z");
      var focus = document.querySelector("#focus");
      if(input1.style.display === 'block') {
         focus.focus();
      }
    });
  
    let congCu = document.querySelectorAll(".congcu");
  

    
  
  