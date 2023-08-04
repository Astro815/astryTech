pathData = ".";

$(".btnJoin").onclick = () => {
    if(app.account == "load") return 0;
    app.account = "load";

    if(auth.currentUser == null){
        auth.signInAnonymously().then(()=>{
            console.log("Usuario Conectado.");
            app.account = "end";
        });
    }else{
        auth.signOut().then(()=>{
            console.log("Usuario Desconectado.");
            app.account = "end";
        });
    }
};

function upBtn(){
    if(app.account == "load"){
        $(".btnJoin").dataset.account = "load";
        return 0;
    }

    if(auth.currentUser != null){
        $(".btnJoin").dataset.account = "on";
    }else{
        $(".btnJoin").dataset.account = "off";
    }

}

setInterval(()=>{upBtn();},250);