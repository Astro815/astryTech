function renderCursos(){
    let html = "";

    for(let key of Object.keys(app.data.curso)){
        let path = app.data.curso[key];

        html += `
        <div class="curso-item" onclick="openCurso('${key}')">
            <div name="cap" style="background-image: url(./data/cursos/${key}/banner.png);"></div>
            <div>
                <h2>${path.name}</h2>
                <p>${path.preDesc}</p>
            </div>
        </div>`;
    }

    $("div#barCursos").innerHTML = html;
}

app.event.onloadeddata = () => {
    renderCursos();
}

function openCurso(name){
    window.open(`./p/video/?curso=${name}&ep=${Object.keys(app.data.curso[name].video)[0]}`, "_top");
}