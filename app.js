const apiKey =
 '424bdc15571841c39c80537080407e9c';

const blockcontainer = document.getElementById("block-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl)
        const data= await response.json()
        return data.articles;
        
    }
    catch(error){
console.error("Error Fetching Random News",error)
return[]
    }
}

searchButton.addEventListener("click", async()=>{
    const query = searchField.value.trim();
    if(query!== ""){
        try{
            const articles =await fetchNewsQuery(query);
            displayBlocks(articles);
        }
        catch(error){
            console.log("Error fetching news by query",error)

        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl)
        const data= await response.json()
        return data.articles;
        
    }
    catch(error){
console.error("Error Fetching Random News",error)
return[]
    }
}

function displayBlocks(articles){
    blockcontainer.innerHTML=""
    articles.forEach((article)=>{
        const blockCard = document.createElement("div")
        blockCard.classList.add("block-card")
        const img= document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const TruncatedTitle = 
        article.title.length>30
        ? article.title.slice(0,30)+ "......."
        : article.title;
         title.textContent = TruncatedTitle;
        const description = document.createElement("p")
        const TruncatedDes = 
        article.description.length>120
        ? article.description.slice(0,120)+ "......."
        : article.title;
        description.textContent= TruncatedDes;


        blockCard.appendChild(img);
        blockCard.appendChild(title);
        blockCard.appendChild(description);
        blockCard.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })
        blockcontainer.appendChild(blockCard);
    })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlocks(articles);

    }
    catch(error){
        console.error("Error fetching random news",error)
    }
})();

