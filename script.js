const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const items = document.querySelectorAll('.items');

        let scrollAmount = 150;

        prevButton.addEventListener('click', () => {
            items.forEach(item => {
                item.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        });

        nextButton.addEventListener('click', () => {
            items.forEach(item => {
                item.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        });