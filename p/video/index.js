pathData = "../../.";
importFireBase();

let curso = null;
let ep = null;

app.event.onloadeddata = () => { 
    loadCurso();

    if (app.data.curso[curso].video[ep].type == "text" && !app.client.cursoViews[curso][ep]) {
        app.client.cursoViews[curso][ep] = true;
        new CLIENT().save();
        generateLIep();
    }
};

function generateLIep(){
    let cd = app.data.curso[curso];
    html = "";

    let icon = (v)=>{
        if(cd.video[v].type == "video"){
            return 'smart_display';
        }else{
         return 'description';   
        }
    };

    for (let vid of Object.keys(cd.video)) {
        let path = cd.video[vid];
        html += `
        <li watched="${app.client.cursoViews[curso][vid]}" data-ep="${vid}" isthis="${ep == vid}">
            <span class="material-icons">${icon(vid)}</span>
            ${path.name}
        </li>
        `;
    }

    $("ul#listVideos").innerHTML = html;

    for (let elem of $$("ul#listVideos > li")) {
        elem.onclick = (e) => {
            window.open(`./?curso=${curso}&ep=${e.target.dataset.ep}`, "_top");
        };
    }
}

function loadCurso() {

    const urlParams = new URLSearchParams(window.location.search);
    curso = urlParams.get('curso');

    if (curso == null) {
        window.open("../../index.html", "_top");
    }

    let cd = app.data.curso[curso];
    ep = urlParams.get('ep');

    if (ep == null) {
        ep = Object.keys(cd.video)[0];
    }

    // Set Texts
    $("title").innerText = `${cd.video[ep].name} - ${cd.name} - AstryTech`;
    $("[data-curso=title]").innerText = cd.name;

    // Create a list of links to class videos
    generateLIep();

    if (cd.video[ep].type == "video") {
        $("video#videoAula").src = `../../data/cursos/${curso}/${ep}.mp4`;
    } else {
        $("video#videoAula").remove();
        $("hr[divComment] + br").remove();
        $("hr[divComment] + div").remove();
        $("hr[divComment]").remove();
    }


    $("[data-curso='titleEp']").innerText = cd.video[ep].name;
    $("[data-curso='desc']").innerHTML = cd.video[ep].desc;

    updateComments();
}

$("button#backBtn").onclick = () => {
    window.open("../../index.html", "_top");
}

function updateComments() {
    /* Comments */

    let comments = [];
    let html = "";

    function generateMsg(list) {

        function generateSubMsg(msgs) {
            let subhtml = "";

            if (msgs == undefined) return "<li><p>Não possui respostas =[</p></li>";

            for (let msg of msgs) {
                subhtml += `
                <li>
                    <p>Usuario</p>
                    <p>${msg.m.replaceAll("\n", "<br>")}</p>
                </li>
                `;
            }

            return subhtml;
        }

        for (let imsg in list) {
            let msg = list[imsg];
            html += `
            <li data-ssid="${imsg}">
                <p>Usuario</p>
                <p>${msg.m.replaceAll("\n", "<br>")}</p>
                <details>
                    <summary>Respostas</summary>
                    <ul>
                        ${generateSubMsg(msg.r)}
                    </ul>
                </details>
                <span subSend="false" onclick="subMsg.open(${imsg})">
                    <p><span class="material-icons">forum</span>responder</p>
                    <textarea type="text" data-subsend="btn_text" placeholder="Olá!" data-ssin='${imsg}'></textarea>
                    <div>
                        <button data-subsend="btn_send" onclick="subMsg.send(${imsg})">enviar</button>
                        <button data-subsend="btn_cancel" onclick="subMsg.close(${imsg})">cancelar</button>
                    </div>
                </span>
            </li>`;
        }
    }

    db.ref(`comments/${curso}`).child(ep).get().then((e) => {
        comments = e.val();
        generateMsg(comments);
        $('[data-comments="list"]').innerHTML = html;
    });
}

async function sendMessage() {
    $("#messageAlert").setAttribute("active", "false");
    if (auth.currentUser == null) {
        alert("Ops! Você não possui uma conta ainda para comentar, apenas toque no botão a cima escrito \"Entrar\" para conectar em uma conta.")
        return 0
    };

    let text = $('[data-message="inputText"] > textarea').value;
    if (text.replaceAll(" ", "").length == 0) return 0;

    if(new FILTERMSG(text).clear()){
        $("#messageAlert").setAttribute("active", "true");
        return 0;
    }

    db.ref(`comments/${curso}`).child(ep).get().then((e) => {
        let history = e.val();

        let message = {
            m: text,
            r: []
        };

        history[history.length] = message;

        history = history.reverse();

        db.ref(`comments/${curso}`).child(ep).set(history).then(() => { updateComments(); });
        $('[data-message="inputText"] > textarea').value = "";
    })
}

/* SUB MESSAGES */

let subMsg = {
    open: (id) => {
        console.log("open")
        let elem = $(`li[data-ssid='${id}'] > span`).attributes.subsend.value;
        if (!elem) return 0;
        $(`li[data-ssid='${id}'] > span`).attributes.subsend.value = "true";
    },
    send: (id) => {
        $("#messageAlert").setAttribute("active", "false");

        if(new FILTERMSG($(`textarea[data-ssin='${id}']`).value).clear()){
            $("#messageAlert").setAttribute("active", "true");
            return 0;
        }

        db.ref(`comments/${curso}`).child(ep).get().then((e) => {

            let history = e.val();

            if (history[id].r == undefined) {
                history[id].r = [];
            }

            history[id].r.push({
                m: $(`textarea[data-ssin='${id}']`).value
            });

            db.ref(`comments/${curso}`).child(ep).set(history).then(() => { updateComments(); });
            $(`textarea[data-ssin='${id}']`).value = "";

            subMsg.close(id);

        });

    },
    close: (id) => {
        setTimeout(() => {
            $(`li[data-ssid='${id}'] > span`).attributes.subsend.value = "false";
        })
    },
}

/* ORTHER FUNCTINOS */

$("video").onplay = () => {
    if (!app.client.cursoViews[curso][ep]) {
        app.client.cursoViews[curso][ep] = true;
        new CLIENT().save();
        generateLIep();
    }
};