// - egy már korábban megadott betű újra beírható és elküldhető majd elhelyezi a megadott helyre ******************
// -- egy új tömbbe helyeznénk azokat a karaktereket amit elküldünk input mezőn keresztül és az alapján ellenőrizze hogy ami még nincs benne csak azt engedje beírni illetve üzenjen hogy ez a karakter már volt (bár jobb lenne ha nem is tudná használni pl gomb esetén disabled lenne)

// - nyeremény kiírásának mikéntje
// - bevitelnél csak egy karaktert engedjen meg vagy gombokkal megoldva?
// - passz? csőd bevezetése
// - kódsor szebbé/átláthatóbbá/jobb teljesítményűvé tétele
// - console.log()-ok törlése, ha már nem szükséges ellenőrzéshez

const megfejtendo = ['alma', 'barack', 'körte', 'dió', 'cseresznye'];
// szamok tömbbe lehetnének a különleges karakterek is ****************
const szamok = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const elhasznaltKarakterek = [];
let kiirtertek = 0;
let penz = 0;
let szo = '';
let papir = document.getElementById('megfejtendo');
let start = document.getElementById('start');
let tippelo = document.getElementById('tippelo');
let spin = document.getElementById('spin');
let kiporgetettErtek = document.getElementById('kiirtertek');
let ujra = document.getElementById('ujra');
let penzosszeg = document.getElementById('penz');

function megfejtes(megfejtendo) {
    let index = Math.round(Math.random() * (megfejtendo.length - 1));
    return megfejtendo[index];
}

function nyerheto() {
    // passz, csőd? érték random? feltétellel **********************
    let randomertek = Math.round(Math.random() * (10 - 1) + 1) * 100;
    return randomertek;
}

function prevent() {
    document.getElementById('porog').addEventListener('submit', (e) => {
        e.preventDefault();
    })
    document.getElementById('tipp').addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

// elindítja a játékot, kiválasztódik a kitalálni való szó és létrejön a helye a kiíratni kívánt helyes betűk
document.getElementById('start').addEventListener('click', (e) => {
    szo = megfejtes(megfejtendo);
    if (szo !== '') {
        console.log(szo);
    }
    start.style.display = "none";
    tippelo.style.display = "block";
    spin.style.display = "block";
    // megjelenítésnél létrehozza a helyét ahova kerülnek az eltalált karakterek
    for (i = 0; i < szo.length; i++) {
        papir.innerHTML += `<span class="border p-3" id="${i}"></span>`;
    }
})

// a beírt tipp után lenyomva kiír egy nyerhető értéket, ellenőrzi hogy a megadott betű létezik-e a megfejtendő szóban
document.getElementById('spin').addEventListener('click', (e) => {
    kiirtertek = nyerheto();
    kiporgetettErtek.innerHTML = 'A nyerhető érték: ' + kiirtertek;
    // inputba írt szöveg kisbetűssé alakítása
    let tipp = document.getElementById('tippszo').value.toLowerCase();
    // elhasznált karakterek/betűk tömbje ******************
    elhasznaltKarakterek.push(tipp);
    let szoIndex = '';

    // hibaüzenetek
    const errors = [];

    if (tipp.length !== 1) {
        errors.push('<article class="col p-2">Pontosan egy karaktert írjon be a mezőbe!</article>');
    }

    // számok? különleges karakterek?*************
    szamok.forEach(szam => {
        if (tipp === szam) {
            errors.push('<article class="col p-2">Egy betűt írjon be a mezőbe!</article>');
        }
    })

    // egy elhasznált betű/karakter hibaüzenete ***************
    /*
    elhasznaltKarakterek.forEach( item => {
        if(tipp === item) {
            errors.push('<article class="col p-2">Ezt a betűt már egyszer elhasználta!</article>');
        }
        else {
            szo.split('').forEach((item, index) => {
                if (tipp === item) {
                    szoIndex = index;
                    // feltétel hogy a jó indexre tegye az eltalált betűt
                    let spans = papir.getElementsByTagName("span");
                    // találat számára létrehozott változó
                    let szorzo = 0;
                    for (i = 0; i < spans.length; i++) {
                        if (i === szoIndex) {
                            spans[i].innerText += item;
                            // a találatok száma alapján kiszámolja a szorzó számát
                            szorzo += 1;
                            console.log(item, i);
                        }
                    }
                    // annyit ad hozzá értéknek amennyit kipörget azt megszorozva a talált betűk szorzójával
                    penz += szorzo * kiirtertek;
                }
            })
        }
    })
    */

    if (errors.length > 0) {
        // bootstrap alertbe**************
        errors.forEach(error => {
            document.getElementById('hiba').innerHTML = error;
        })
    }
    else {
        document.getElementById('hiba').innerHTML = "";
    }

    szo.split('').forEach((item, index) => {
        if (tipp === item) {
            szoIndex = index;
            // feltétel hogy a jó indexre tegye az eltalált betűt
            let spans = papir.getElementsByTagName("span");
            // találat számára létrehozott változó
            let szorzo = 0;
            for (i = 0; i < spans.length; i++) {
                if (i === szoIndex) {
                    spans[i].innerText += item;
                    // a találatok száma alapján kiszámolja a szorzó számát
                    szorzo += 1;
                    console.log(item, i);
                }
            }
            // annyit ad hozzá értéknek amennyit kipörget azt megszorozva a talált betűk szorzójával
            penz += szorzo * kiirtertek;
        }
    })

    // kiürüljön az input mező pörgetésenként
    document.getElementById('tippszo').value = '';

    // kiírja hogy mennyit nyerhet a játékos ha eltalálja a megfejtendő szót
    penzosszeg.innerHTML = 'A játékos várható nyereménye: ' + penz;

    // ha az egész szó jó - ÁTDOLGOZÁS ALATT 'tipp' ***************************
    if (papir.innerText === szo) {
        // kiírhatja hogy "ön nyert" és a várható nyeremény szöveg átírása *******
        ujra.style.display = "block";
    }
})

// újrakezdés gomb megnyomására történjen
document.getElementById('ujra').addEventListener('click', (e) => {
    start.style.display = "block";
    tippelo.style.display = "none";
    spin.style.display = "none";
    ujra.style.display = "none";
})

prevent();