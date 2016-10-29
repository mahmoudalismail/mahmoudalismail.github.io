function show_navbar_links() {
    var x = document.getElementById("mytopnav");

    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className = "top-nav";
    }

}
