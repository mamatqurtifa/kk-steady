function scroll_to(id) {
    const element = document.getElementById(id);
    if (element) {
        const startY = window.pageYOffset;
        const targetY = element.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetY - startY;
        const duration = 500;
        let start_time = null;

        function step(current_time) {
            if (start_time === null) start_time = current_time;
            const elapsed_time = current_time - start_time;
            const progress = Math.min(elapsed_time / duration, 1);
            window.scrollTo(0, startY + distance * progress);
            if (elapsed_time < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
}

function toggleMenu() {
  var menu = document.getElementById("menu-list");
  menu.classList.toggle("hidden");
}

//Script Testing Navbar ----------------------------------------------------------------------------------------------------------------
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const menuItems = {
    Home: "home",
    Sukiyaki: "sukiyaki",
    Shoba: "shoba",
    Sushi: "sushi"
};

searchInput.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    let matches = Object.keys(menuItems).filter(item =>
        item.toLowerCase().includes(inputValue)
    );

    if (inputValue === "") {
        matches = [];
    }

    displayMatches(matches);
});

function displayMatches(matches) {
    const html = matches.map(match => `<li>${match}</li>`).join("");
    searchResults.innerHTML = html;

    const listItems = searchResults.querySelectorAll("li");
    listItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedItem = this.textContent;
            const targetDivId = menuItems[selectedItem];
            const targetDiv = document.getElementById(targetDivId);
            if (targetDiv) {
                targetDiv.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });
}


