const $ = (e) => { return document.querySelector(e) };
const $$ = (e) => { return document.querySelectorAll(e) };

let pathData = "";

let app = {
    client: {},
    firebase: false,
    account: "",
    data: {},
    event:{
        onloadeddata: () => {}
    },
    funcs:{
        loadData(){
            fetch(pathData + "./data/data.json").then( arquive =>{
                arquive.json().then(result=>{
                    app.data = result;
                    app.event.onloadeddata();
                }).catch(console.error);
            }).catch(console.error);
        }
    }
}


/* FUNCTIONS */

function importFireBase() {
    if(!app.firebase) return 0;
    import(pathData + "./js/firebase.js");
}

/* CLIENT */

class CLIENT{
    constructor(){}
    save(){
        localStorage.setItem("atUser", JSON.stringify(app.client));
    }
    load(){
        let key = localStorage.getItem("atUser");

        if(key == null){
            localStorage.setItem("atUser", JSON.stringify({
                'cursoViews':{
                    'curso001':{
                        'ep1':false,
                        'ep2':false,
                    },
                    'curso002':{
                        'ep1':false,
                        'ep2':false,
                    }
                }
            }))
        }else{
            app.client = JSON.parse(key);
        }
    }
    delete(){
        localStorage.removeItem("atUser");
        this.load();
    }
}

window.onload = () => { new CLIENT().load(); app.funcs.loadData(); };