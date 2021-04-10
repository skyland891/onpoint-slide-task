import scrollAnimate from "./scrollAnimate.js";

window.onload = init;



function init () {
    let paginationItems = document.querySelectorAll(".navigation__pagination-item");
    let inputRange = document.querySelector(".circuit__input");
    let track = document.querySelector(".circuit__slider-track");

    // addEventListener for pafinationItem click
    [...paginationItems].forEach((item, index) => {
        item.addEventListener("click", (e) => {
            
            let amount = [...item.parentElement.children].findIndex(element => element === e.target) - [...item.parentElement.children].findIndex(element => element.classList.contains("navigation__pagination-item--current"));
            
            for(let child of e.target.parentElement.children) {
                if(child === e.target) {
                    child.classList.add("navigation__pagination-item--current");
                }
                else if (child.classList.contains("navigation__pagination-item--current")) {
                    child.classList.remove("navigation__pagination-item--current");
                }
            };

            let endPos = window.pageYOffset + amount*1024;

            scrollAnimate({
                duration: 800,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    window.scrollBy(0, progress*(endPos - window.pageYOffset));
                }
            });
        })
        
    })

    //addEventListener for wheel action

    function scrollListener (e) {
        let prevYOffset = window.pageYOffset;

        window.removeEventListener("wheel", scrollListener);
        setTimeout(() => {
            scrollAnimate({
                duration: 1000,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    if(e.deltaY > 0) {
                        window.scrollBy(0, progress*(prevYOffset + 1024 - window.pageYOffset));
                    }
                    else {
                        window.scrollBy(0, progress*(prevYOffset - 1024 - window.pageYOffset));
                    }
                }
        });
        },200)
        setTimeout(() => {
            let currentPaginationItem = document.querySelector(".navigation__pagination-item--current");
            currentPaginationItem.classList.remove("navigation__pagination-item--current");
            //change current pagination-item
            if(e.deltaY > 0) {
                [...paginationItems][Math.ceil(pageYOffset/1024)].classList.add("navigation__pagination-item--current");
            }
            else {
                [...paginationItems][Math.floor(pageYOffset/1024)].classList.add("navigation__pagination-item--current");
            }
            window.addEventListener("wheel", scrollListener);
        }, 400)
    }
    window.addEventListener("wheel", scrollListener);

    //addEventListeners for input range
    inputRange.addEventListener("input", (e) => {
        if(inputRange.value < 25) {
            track.style.transform = `translateX(0px)`;
        }
        else if (inputRange.value >= 25 && inputRange.value < 75) {
            track.style.transform = `translateX(-768px)`;
        }
        else if (inputRange.value >= 75) {
            track.style.transform = `translateX(-1536px)`;
        }
    })
}