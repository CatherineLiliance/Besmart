window.addEventListener('scroll', function() {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) { // If scrolled more than 50px
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

function handleClick(message) {
    alert(message);
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
  
    const options = {
      threshold: 0.5 // 50% của section phải xuất hiện trong viewport
    };
  
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        const homeSci = entry.target.querySelector('.home-sci');
        if (entry.isIntersecting) {
          homeSci.classList.add('show');
        } else {
          homeSci.classList.remove('show');
        }
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });

// Lấy tất cả các nút
const buttons = document.querySelectorAll('.nav-btn');

// Xử lý sự kiện nhấn nút
buttons.forEach(button => {
    button.addEventListener('click', function () {
        // Xóa class "active" khỏi tất cả các nút
        buttons.forEach(btn => btn.classList.remove('active'));

        // Thêm class "active" vào nút hiện tại
        this.classList.add('active');

        // Cuộn đến section tương ứng
        const target = document.querySelector(this.getAttribute('data-target'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// Highlight tự động khi cuộn đến section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            // Xóa active khỏi tất cả các nút
            buttons.forEach(btn => btn.classList.remove('active'));
            buttons[index].classList.add('active');
        }
    });
});

buttons.forEach(button => {
    button.addEventListener('click', function () {
      // Xóa lớp "active" khỏi tất cả nút
      buttons.forEach(btn => btn.classList.remove('active'));
  
      // Thêm lớp "active" vào nút hiện tại
      this.classList.add('active');
  
      // Cuộn đến section tương ứng
      const target = document.querySelector(this.getAttribute('data-target'));
      if (target) {
        const offset = target.offsetTop - document.getElementById('main-header').offsetHeight; // Trừ chiều cao header
        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    });
  });
  