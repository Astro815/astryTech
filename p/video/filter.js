class FILTERMSG{
    constructor(msg){
        this.msg = msg;

        this.badWords = [
            "porra",
            "puta",
            "caralho",
            "corno",
            "krl",
            "vai toma no cu",
            "cu",
            "merda",
            "vtnc",
            "fdp",
            "merda",
            "m3rda",
            "merd@",
            "m3rd@",
            "m3rd4",
            "m3rd#",
            "m3rd*",
            "m3r!@",
            "m@rd@",
            "m4rd@",
            "m@rd*",
            "m3rd.",
            "m3rda!",
            "m3rd@123",
            "puta",
            "pvta",
            "p@ta",
            "p*ta",
            "p#ta",
            "p!ta",
            "p0ta",
            "put@",
            "put4",
            "putá",
            "pu+a",
            "pu7a",
            "pu1a",
            "c@ralho",
            "car@lho",
            "cara!ho",
            "caralh0",
            "c@r@lh0",
            "c@ralh0",
            "c@ralh!",
            "caralh@",
            "car@lh@",
            "c@r@lh@",
            "c@ralh@",
            "c@r@lho"
        ];
    }
    clear(){
        let possui = false;
        for(let word of this.badWords){
            if(this.msg.includes(word)){
            possui = true;
            }
        }
        return possui;
    }
}