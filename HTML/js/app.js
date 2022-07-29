const API_KEY = 'ff6d0eb243694f47b11d77039cfeea39';

function exibirNoticias() {
    let newTela = document.getElementById('tela');

    let texto = '';

    // Montar o texto HTML com as notícias 
    let dados = JSON.parse(this.responseText);

    for(let i = 0; i<dados.articles.length; i++) {
        let noticia = dados.articles[i];

        let data = new Date(noticia.publishedAt);

        texto += `
        <article class="boxNoticias">
        <img src="${noticia.urlToImage}" alt="Imagem da notícia">
        <span class="titulo">${noticia.title}</span><br>
        <span class="creditos">${data.toLocaleDateString()} - ${noticia.source.name} - ${noticia.author}</span><br>
        <span class="text">${noticia.content}
        <a href="${noticia.url}" target="_blank">Leia mais ...</a>
        </span>
        <p>===============================</p>
        </article>
        `;
    };
    // Preencher a div com o texto HTML
    newTela.innerHTML = texto;
    let loading = document.querySelector('.loader')
    loading.style.display = 'none'
}

function pesquisar(evento) {
    evento.preventDefault();
    let query = document.getElementById('campoDePesquisa').value;

    document.getElementById('tela').innerHTML = '';
    let loading = document.querySelector('.loader')
    loading.style.display = 'flex'

    let xhr = new XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open ('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`); 
    xhr.send();
}

document.getElementById('btn').addEventListener('click', pesquisar);
