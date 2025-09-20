document.querySelectorAll('.input-olho').forEach(function(div) {
    const input = div.querySelector('input');
    const olho = div.querySelector('.olhinho');
    olho.addEventListener('click', function() {
        if (input.type === 'password') {
            input.type = 'text';
            olho.src = '../public/icons/olhoaberto.png';
        } else {
            input.type = 'password';
            olho.src = '../public/icons/olhofechado.png';
        }
    });
});
