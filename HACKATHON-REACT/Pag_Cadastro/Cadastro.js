
// Abrir e fechar olho
document.querySelectorAll('.olhinho').forEach(olho => {
    olho.addEventListener('click', () => {

    const input = olho.previousElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        olho.src = '../Icones/olhoaberto.png'; // ícone aberto
    } else {
        input.type = 'password';
        olho.src = '../Icones/olhofechado.png'; // ícone fechado
    }

    })
})

// abrir/fechar dentro da própria div filtro
document.getElementById('filtro').addEventListener('click', () => {
    document.getElementById('filtro').classList.toggle('active');
});

const botoesFiltro = document.querySelectorAll('.filtro .opcoes button');
const perfis = document.querySelectorAll('.perfil-card');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
        e.stopPropagation();
        const categoria = botao.id;

        perfis.forEach(perfil => {
            if (categoria === 'todos' || perfil.dataset.categoria === categoria) {
                perfil.style.display = 'block';
            } else {
                perfil.style.display = 'none';  
            }
        });
    });
});
