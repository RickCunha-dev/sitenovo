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
// Mascara CPF/CNPJ
document.getElementById('cpf').addEventListener('input', function (e) {
    var valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 11) { // CPF
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else { // CNPJ
        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }
    e.target.value = valor;
});
