const repos = document.querySelector(".repos");
const id_repos = [362370228, 496756293, 494965091, 295046616, 395788708, 403221115];
console.log(repos);
async function usuario() {
    const respuesta = await fetch("https://api.github.com/users/DRUMPADD", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }, 
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })

    return respuesta.json();
}

async function getRepos(url) {
    const respuesta = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }, 
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })

    return respuesta.json();
}

usuario().then(dato => {
    document.getElementById("username").innerText = dato.login;
    document.getElementById("img-me").src = dato.avatar_url;
    document.getElementById("description").innerText = dato.bio;
    document.getElementById("location").innerText = dato.location;
    document.getElementById("name").innerText = dato.name;
    getRepos(dato.repos_url).then(result => {
        const arr = new Array(result)
        arr[0].forEach(el => {
            const div = document.createElement("div");
            const child_p = document.createElement("p");
            const child_a = document.createElement("a");
            id_repos.forEach(id_ => {
                if(id_ == el.id) {
                    div.className = "content-repo";
                    child_a.setAttribute("href", "https://github.com/" + el.full_name);
                    child_a.innerText = el.name;
                    child_p.innerText = el.description;
                    div.appendChild(child_a);
                    div.appendChild(child_p);
                }
            })

            repos.appendChild(div);
        });
    });
})

