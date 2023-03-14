let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //resultItemEl -- DivEl 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //AnchorTitle -- anchorTitile 
    let anchorTitle = document.createElement("a");
    anchorTitle.classList.add("result-title");
    anchorTitle.href = link;
    anchorTitle.target = "_blank";
    anchorTitle.textContent = title;
    resultItemEl.appendChild(anchorTitle);

    //TitelBreaker -- lineBreaker 
    let titleBreakerEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakerEl);
    //AnchorUrl -- anchorurl
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    //linebreaker -- lineBreaker 
    let lineBreakerEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakerEl);
    //discriptionEl -- discriptionEl
    let discriptionEl = document.createElement("P");
    discriptionEl.classList.add("link-description");
    discriptionEl.textContent = description;
    resultItemEl.appendChild(discriptionEl);
}



function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendResult(result);
    }
}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;

        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}




searchInputEl.addEventListener("keydown", searchWikipedia);