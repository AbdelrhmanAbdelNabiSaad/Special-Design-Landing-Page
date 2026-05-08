let backgroundOption = true;
let backgroundInterval;

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);
    
    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove('active');

        if (element.dataset.color === mainColors) {
            element.classList.add('active');
        }

    });

}

let backgroundItem = localStorage.getItem('background_option');
console.log(backgroundItem);
if (backgroundItem !== null) {
    document.querySelectorAll('.random-backgrounds span').forEach(span => span.classList.remove('active'));

    if (backgroundItem === 'true') {
        backgroundOption = true;
        document.querySelector('.random-backgrounds .yes').classList.add('active');
    } else {
        backgroundOption = false;
        document.querySelector('.random-backgrounds .no').classList.add('active');
    }

}

// Start Setting Box
// Click On Toggle Setting Gear

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class Fa-Spin For Rotation On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector('.settings-box').classList.toggle('open');
};

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    // console.log(li)
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty(
          "--main-color",
          e.target.dataset.color,
        );
        localStorage.setItem('color_option', e.target.dataset.color);
        handleActive(e);
    })
})

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem("bulletsOption");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove('active');

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }

}
bulletsSpan.forEach(span => {

    span.addEventListener('click', (e) => {

        if (span.dataset.display === 'show') {
            
            bulletsContainer.style.display = 'block';

            localStorage.setItem(`bulletsOption`, "block");

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("bulletsOption", "none");

        }

        handleActive(e);
    })
});

const randomBackELement = document.querySelectorAll(".random-backgrounds span");

randomBackELement.forEach((span) => {
    
    span.addEventListener('click', (e) => {
        handleActive(e)

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            radnomizImgs();
            localStorage.setItem('background_option', true);

        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);
        }

    })

})


document.querySelector('.reset-options').onclick = function () {
    localStorage.removeItem('color_option');
    localStorage.removeItem("bulletsOption");
    window.location.reload();
}

// End Setting Box
// Strart Gallery In Landing Page
let landingPage = document.querySelector('.landing-page');

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function radnomizImgs() {
    console.log('Radomize Image');
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length); 
            landingPage.style.backgroundImage = `url("img/${imgsArray[randomNumber]}")`;
        }, 10000);
    }
}

radnomizImgs();


// Our Skills

let ourSkills = document.querySelector(".skills");

let btnUp = document.querySelector('.up')

window.onscroll = function () {
    
    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        let allSkill = document.querySelectorAll('.skill-box .skill-progress span');

        allSkill.forEach(skill => {
            skill.style.width = skill.dataset.progress
        });

    }

    if (window.scrollY > 500) {
        btnUp.style.display = 'block';
    } else btnUp.style.display = 'none';

}

btnUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
});


// Create Popup With The Image

let ourGallery = document.querySelectorAll('.gallery img');

let currentImage = 0;

let btnNext;
let btnPrevious;

ourGallery.forEach((img, index ,arr) => {

    img.addEventListener('click', () => {

        currentImage = index;
        
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            let imgHeading = document.createElement('h3');

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement('img');

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        let closeButton = document.createElement("span");

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = "close-button";

        popupBox.appendChild(closeButton);

        // Button Next || Previous

        let divButton = document.createElement('div');
        divButton.className = 'buttons';

        btnNext = document.createElement('button');
        btnNext.className = 'next';

        let btnNextText = document.createTextNode('Next');
        btnNext.appendChild(btnNextText);

        btnNext.onclick = function () {
          currentImage++;

          if (currentImage >= arr.length) {
            currentImage = 0;
          }

          popupImage.src = arr[currentImage].src;
        };

        btnPrevious = document.createElement('button');
        btnPrevious.className = 'prev';

        let btnPreviousText = document.createTextNode('prev');

        btnPrevious.appendChild(btnPreviousText);

        btnPrevious.onclick = function () {
            currentImage--;
            
            if (currentImage < 0) {
                
                currentImage = arr.length - 1;

            }

            popupImage.src = arr[currentImage].src;

        }

        divButton.appendChild(btnNext);
        divButton.appendChild(btnPrevious);

        popupBox.appendChild(divButton);

        document.body.appendChild(popupBox);

    })

});


// Select All Bullet

const allBullets = document.querySelectorAll('.nav-bullets .bullet');

const allLinks = document.querySelectorAll('.links a');

function scrollToSomeWhere(element) {

    element.forEach(ele => {
       
        ele.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });

        })

    })
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Toggle Menu

let toggleBtn = document.querySelector('.toggle-menu');

let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle('menu-active');

    tLinks.classList.toggle('open');
}

// Handle First Remove Active Form All ELements Exist In ParentELement And ===>> And Active For Element Lisener Event
function handleActive(event) {

    event.target.parentElement.querySelectorAll('.active').forEach(element => {

        element.classList.remove('active')

    });
    event.target.classList.add('active');
}





document.addEventListener('click', (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        if (tLinks.classList.contains('open')) {

            toggleBtn.classList.toggle('menu-active');

            tLinks.classList.toggle('open')

        }
    }

    if (e.target.classList.contains('close-button')) {
       

        e.target.parentElement.remove();

        document.querySelector('.popup-overlay').remove();

    }

});

document.addEventListener('keydown', (e) => {
    
    if (e.key === 'ArrowRight') {
        btnNext.click();
    }

    if (e.key === 'ArrowLeft') {
        btnPrevious.click();
    }

})

tLinks.onclick = function (e) {
    e.stopPropagation();
}