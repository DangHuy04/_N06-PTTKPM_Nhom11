//Ham tao breadcrumb tu dong
function generateBreadcrumb() {
    let pathArray = location.pathname.split("/").filter(x => x);
    let breadcrumb = `<a class="breadcrumb-link" href="/">Trang chủ</a>`;

    let path = "";
    pathArray.forEach((part, index) => {
        path += `/${part}`;
        breadcrumb += `<a class="breadcrumb-link" href="${path}">&nbsp;&nbsp›&nbsp;&nbsp${decodeURIComponent(part)}</a>`;
    })

    document.getElementById("breadcrumb").innerHTML = breadcrumb.trim();
}
generateBreadcrumb();