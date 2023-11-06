$(document).ready(function () {
	//Prevent Page Reload on all # links
	$("body").on("click", "a[href='#']", function (e) {
		e.preventDefault();
	});

	//placeholder
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);
		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// On scroll Add Class
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 20) {
			$(".wrapper").addClass('page-scrolled');
		}
		else {
			$(".wrapper").removeClass('page-scrolled');
		}
	});

	// Footer margin set for stick to bottom
	function footerAdj() {
		var footerH = $(".footer").innerHeight();
		$(".footer").css({ "margin-top": -footerH });
		$(".main-content").css({ "padding-bottom": footerH });
	};
	footerAdj();
	$(window).resize(function () {
		footerAdj();
	});

	// Add remove class when window resize finished
	var $resizeTimer;
	$(window).on("resize", function (e) {
		if (!$("body").hasClass("window-resizing")) {
			$("body").addClass("window-resizing");
		}
		clearTimeout($resizeTimer);
		$resizeTimer = setTimeout(function () {
			$("body").removeClass("window-resizing");
		}, 250);
	});

	// Add new js functions here -----------------------------------------------------------------

	// masonry grid
	// var $grid = $('.grid').masonry({
	// 	// options
	// 	itemSelector: '.grid-item',
	// 	columnWidth: '.grid-item',
	// 	percentPosition: true,
	// 	gutter: 24,
	// });
	// layout Masonry after each image loads
	// $grid.imagesLoaded().progress(function () {
	// 	$grid.masonry();
	// });


	let sortBtn = document.querySelector('.filter-menu').children;
	let sortItem = document.querySelector('.filter-item').children;

	for (let i = 0; i < sortBtn.length; i++) {
		sortBtn[i].addEventListener('click', function () {
			for (let j = 0; j < sortBtn.length; j++) {
				sortBtn[j].classList.remove('current');
			}

			this.classList.add('current');

			let targetData = this.getAttribute('data-target');
			for (let k = 0; k < sortItem.length; k++) {
				sortItem[k].classList.remove('active');
				sortItem[k].classList.add('delete');
				// $grid.destroy();

				if (sortItem[k].getAttribute('data-item') == targetData || targetData == "all") {
					sortItem[k].classList.remove('delete');
					sortItem[k].classList.add('active');
					// $grid.masonry();
				}
			}
		});
	}


	// Slider Code
	$('.slider-content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		// infinite: false,
		// speed: 1000,
		asNavFor: '.slider-thumb',
		adaptiveHeight: true,
		arrows: false,
		fade: true
	});
	$('.slider-thumb').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-content',
		dots: false,
		arrows: false,
		centerMode: true,
		focusOnSelect: true,
		infinite: true,
		centerMode: true,
		infinite: true,
		variableWidth: true,
		// autoplay: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});


	AOS.init({
		once: true,
		duration: 1100,
		disble: "mobile"
	});



	function smoothScroll(target, duration) {
		var targetSection = document.querySelector(target);
		var offset = 50;
		var targetPosition = targetSection.offsetTop - offset;
		var startPosition = window.pageYOffset;
		var distance = targetPosition - startPosition;
		var startTime = null;

		function animation(currentTime) {
			if (startTime === null) startTime = currentTime;
			var timeElapsed = currentTime - startTime;
			var run = ease(timeElapsed, startPosition, distance, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		}

		function ease(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		}

		requestAnimationFrame(animation);
	}

	var myLink = document.querySelectorAll('.header .navbar-nav a[href^="#"]');
	myLink.forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			var target = this.getAttribute('href');
			var duration = 500; // Set the duration of the scroll animation (in milliseconds)
			smoothScroll(target, duration);
		});
	});



	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});