/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/goldies.jpg',
    'images/pitbulls.jpg',
    'images/shiba.jpg',
    'images/corgi.jpg',
    'images/greatdane.jpg',
    'images/aussie.jpg',
    'images/german.jpg',
    'images/jindo.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();

let currentIndex = 0;

const showImage = (ev) => {
    const elem = ev.currentTarget;
    // the active element is : elem
    console.log(elem.style.backgroundImage);

    //from hint2//
    currentIndex = parseInt(elem.dataset.index);
    console.log("currentIndex:", currentIndex);
    // your job: set the .featured_image's backgroundImage to the
    // element that was just clicked.

    document.querySelector('.featured_image').style.backgroundImage = elem.style.backgroundImage;
};



// Next Event Handler //
const showNext = (ev) => {
    if (currentIndex < 7) {
        currentIndex += 1;
        const goNext = images[currentIndex]
        console.log("currentIndex:", currentIndex);
        document.querySelector('.featured_image').style.cssText = `background-image:url(${goNext})`;
    }
    else {
        currentIndex = 0;
        const goNext = images[currentIndex];
        document.querySelector('.featured_image').style.cssText = `background-image:url(${goNext})`;
    } 
};


// Prev Event Handler //
const showPrev = (ev) => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        const goBack = images[currentIndex]
        console.log("currentIndex:", currentIndex);
        document.querySelector('.featured_image').style.cssText = `background-image:url(${goBack})`;
    }
    else {
        currentIndex = 7;
        const goBack = images[currentIndex];
        document.querySelector('.featured_image').style.cssText = `background-image:url(${goBack})`;
    }
};


// Loop image //
const imageElements = document.querySelectorAll('.image');
// then loop through each one and attach an event handler
// to each element's click event:
for (const elem of imageElements) {
    elem.onclick = showImage;

}

// Attach Event Handlers //
document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;
document.querySelector('.featured_image').onclick = showNext;