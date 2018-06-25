const scrollBtn = document.getElementById('scroll-btn');

// window.onscroll = function() { scrollFunction() };

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.scrollBtn.scrollTop) {
//         scrollBtn.style.display = 'block';
//     } else {
//         scrollBtn.style.display = 'none';
//     }
// }

function topFunction() {
    document.body.scrollTop(0);
    // document.scrollBtn.scrollTop = 0;
}
scrollBtn.addEventListener('click', topFunction);