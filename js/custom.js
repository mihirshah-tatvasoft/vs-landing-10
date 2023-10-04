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
	var $grid = $('.grid').masonry({
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
		percentPosition: true,
		// gutter: 24,
	});
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress(function () {
		$grid.masonry();
	});


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
				console.log($grid);
				// $grid.destroy();

				$grid.masonry('destroy');
				$('.grid').masonry({
					// options
					itemSelector: '.grid-item',
					columnWidth: '.grid-item',
					percentPosition: true,
					// gutter: 24,
				});

				if (sortItem[k].getAttribute('data-item') == targetData || targetData == "all") {
					sortItem[k].classList.remove('delete');
					sortItem[k].classList.add('active');
				}
			}
		});
	}




	// Progressbar code
	var barOne = new ProgressBar.Circle(".progress-circle.one", {
		color: '#fff',
		// This has to be the same size as the maximum width to
		// prevent clipping
		strokeWidth: 10,
		trailWidth: 5,
		easing: 'easeInOut',
		trailColor: '#E9E9E9',
		duration: 1400,
		text: {
			autoStyleContainer: false
		},
		from: { color: '#5046B9' },
		to: { color: '#5046B9' },
		// Set default step function for all animate calls
		step: function (state, circle) {
			circle.path.setAttribute('stroke', state.color);
			circle.path.setAttribute('stroke-width', state.width);

			var value = Math.round(circle.value() * 100);
			if (value === 0) {
				circle.setText('');
			} else {
				circle.setText(value + "%");
			}
		}
	});

	var barTwo = new ProgressBar.Circle(".progress-circle.two", {
		color: '#fff',
		// This has to be the same size as the maximum width to
		// prevent clipping
		strokeWidth: 10,
		trailWidth: 5,
		easing: 'easeInOut',
		trailColor: '#E9E9E9',
		duration: 1400,
		text: {
			autoStyleContainer: false
		},
		from: { color: '#5046B9' },
		to: { color: '#5046B9' },
		// Set default step function for all animate calls
		step: function (state, circle) {
			circle.path.setAttribute('stroke', state.color);
			circle.path.setAttribute('stroke-width', state.width);

			var value = Math.round(circle.value() * 100);
			if (value === 0) {
				circle.setText('');
			} else {
				circle.setText(value + "%");
			}
		}
	});
	var barThree = new ProgressBar.Circle(".progress-circle.three", {
		color: '#fff',
		// This has to be the same size as the maximum width to
		// prevent clipping
		strokeWidth: 10,
		trailWidth: 5,
		easing: 'easeInOut',
		trailColor: '#E9E9E9',
		duration: 1400,
		text: {
			autoStyleContainer: false
		},
		from: { color: '#5046B9' },
		to: { color: '#5046B9' },
		// Set default step function for all animate calls
		step: function (state, circle) {
			circle.path.setAttribute('stroke', state.color);
			circle.path.setAttribute('stroke-width', state.width);

			var value = Math.round(circle.value() * 100);
			if (value === 0) {
				circle.setText('');
			} else {
				circle.setText(value + "%");
			}
		}
	});
	var barFour = new ProgressBar.Circle(".progress-circle.four", {
		color: '#fff',
		// This has to be the same size as the maximum width to
		// prevent clipping
		strokeWidth: 10,
		trailWidth: 5,
		easing: 'easeInOut',
		trailColor: '#E9E9E9',
		duration: 1400,
		text: {
			autoStyleContainer: false
		},
		from: { color: '#5046B9' },
		to: { color: '#5046B9' },
		// Set default step function for all animate calls
		step: function (state, circle) {
			circle.path.setAttribute('stroke', state.color);
			circle.path.setAttribute('stroke-width', state.width);

			var value = Math.round(circle.value() * 100);
			if (value === 0) {
				circle.setText('');
			} else {
				circle.setText(value + "%");
			}
		}
	});

	barOne.animate(0.8);
	barTwo.animate(0.7);
	barThree.animate(0.5);
	barFour.animate(0.9);


	// Slider Code
	$('.slider-content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		infinite: false,
		speed: 1000,
		// asNavFor: '.slider-thumb',
		arrows: true,
	});




	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});