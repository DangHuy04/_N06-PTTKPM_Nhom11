
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
