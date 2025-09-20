document.querySelectorAll('.input-olho').forEach(function(div) {
    const input = div.querySelector('input');
    const olho = div.querySelector('.olhinho');
    olho.addEventListener('click', function() {
        if (input.type === 'password') {
            input.type = 'text';
            olho.src = '../Icones/olhoaberto.png';
        } else {
            input.type = 'password';
            olho.src = '../Icones/olhofechado.png';
        }
    });
});