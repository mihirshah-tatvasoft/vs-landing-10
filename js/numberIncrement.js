// // Function base view
function countUp(el) {
    let loaded = false;

    function setVars() {
        this.number = el.querySelectorAll("[data-countup-number]");
        this.observerOptions = { root: null, rootMargin: "0px 0px", threshold: 0 };
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const end = parseFloat(entry.target.dataset.countupNumber.replace(/,/g, ""));
                const decimals = countDecimals(end);
                if (entry.isIntersecting) {
                    iterateValue(entry.target, end, decimals);
                    unobserve(entry.target);
                }
            });
        }, this.observerOptions);
    }

    function unobserve(element) {
        this.observer.unobserve(element);
    }

    function init() {
        if (this.number.length > 0) {
            this.number.forEach((el) => {
                this.observer.observe(el);
            });
        }
    }

    function iterateValue(el, end, decimals) {
        const start = 0;
        const duration = 2500;
        let startTimestamp = null;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsedPercent = (timestamp - startTimestamp) / duration;
            const easedProgress = Math.min(easeOutQuint(elapsedPercent), 1);
            let interimNumber = Math.abs(easedProgress * (end - start) + start);
            el.innerHTML = formatNumber(interimNumber, decimals);
            if (easedProgress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    function easeOutQuad(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    function easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }

    function countDecimals(val) {
        if (Math.floor(val) === val) return 0;
        return val.toString().split(".")[1].length || 0;
    }

    function formatNumber(val, decimals) {
        return val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    setVars();
    init();
}

const dataModules = [...document.querySelectorAll('[data-module="countup"]')];

dataModules.forEach((element) => {
    element.dataset.module.split(" ").forEach(function () {
        countUp(element);
    });
});
