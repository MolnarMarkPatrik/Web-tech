const GH_ACCESS_TOKEN = '';

function loadNavigation() {
    fetch('./navbar.html')
        .then(res => res.text())
        .then(navbarHtml => {
            document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        })
        .catch(err => {
            console.error(err);
            alert('Hiba a menürendszer betöltésekor.');
        });
}

async function searchGithubUsers() {
    const input = document.getElementById('user-input');
    const resultsDiv = document.getElementById('user-results');
    const searchTerm = input.value.trim();

    if (searchTerm === "") {
        alert("Hiba: Nem adtál meg keresőkifejezést!");
        return;
    }

    resultsDiv.innerHTML = "<p>Keresés...</p>";

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
            headers: {
                'Authorization': `token ${GH_ACCESS_TOKEN}`
            }
        });

        const data = await response.json();

        renderUsers(data.items);
        
    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = "<p>Hiba történt a lekérdezés közben.</p>";
    }
}

function renderUsers(users) {
    const resultsDiv = document.getElementById('user-results');
    resultsDiv.innerHTML = "";

    if (users.length === 0) {
        resultsDiv.innerHTML = "<p>Nincs találat.</p>";
        return;
    }

    users.forEach(user => {
        const userCard = `
            <div class="user-card">
                <img src="${user.avatar_url}" alt="${user.login}" width="100">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">Profil megtekintése</a>
            </div>
        `;
        resultsDiv.insertAdjacentHTML('beforeend', userCard);
    });
}

loadNavigation();