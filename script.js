const api = "ca033623bc894b67835b702b00de5a06";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(queary) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${queary}&apiKey=ca033623bc894b67835b702b00de5a06`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data); 
}


function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-card");

    cardContainer.innerHTML= "";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardclone, article){
    const newsImg = cardclone.querySelector("#news-image");
    const newsTitle = cardclone.querySelector("#news-title");
    const newsSource = cardclone.querySelector("#news-source");
    const newsDesc = cardclone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "asia/jakarta",
    });

    newsSource.innerHTML = `${article.source.name}.${date}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
   });
   
}

function onNavItemClick(id){
    fetchNews(id);
}

const searchButton = document.getElementById("search-button")
const searchBox = document.getElementById("search-box");

searchButton.addEventListener("click",()=>{
    const query = searchBox.value;
    if(!query) return;
    fetchNews(query);
});



