const missions =
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}

const elements = [
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 0],
    [1, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 1],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [1, 0, 0],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 0, 0],
    [1, 1, 1],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 1]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
]

// Térkép mérete
const gridSize = 11;

// Térkép inicializálása
const gridTable = document.getElementById("gridTable");
const tileSize = 45;

for (let i = 0; i < gridSize; i++) {
  const row = document.createElement("tr");

  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("td");
    const img = document.createElement("img");
    if ((i + 1) == 2 && (j + 1) == 2 || (i + 1) == 4 && (j + 1) == 9 || (i + 1) == 6 && (j + 1) == 4 || (i + 1) == 9 && (j + 1) == 10 || (i + 1) == 10 && (j + 1) == 6) {
      img.src = "mountain_tile.png";
      img.style.width = tileSize + "px";
      img.style.height = tileSize + "px";

    }
    else {
      img.src = "base_tile.png";
      img.style.width = tileSize + "px";
      img.style.height = tileSize + "px";
    }

    cell.appendChild(img);
    row.appendChild(cell);
  }

  gridTable.appendChild(row);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const basicMissons = missions.basic;
const extraMissons = missions.extra;
const kuld = basicMissons.concat(extraMissons);
const kuldik = getMultipleRandom(kuld, 4)

shuffleArray(kuldik);

let jatek2 = document.getElementById("jatek2");
let jatek3 = document.getElementById("jatek3");
let jatek4 = document.getElementById("jatek4");
let jatek5 = document.getElementById("jatek5");

const jatekok = [jatek2, jatek3, jatek4, jatek5];

for (let i = 0; i < kuldik.length; i++) {
  const img = document.createElement("img");
  if (kuldik[i].title == "Az erdő széle") {
    img.src = "erdoszele.png"
  }
  else if (kuldik[i].title == "Álmos-völgy") {
    img.src = "almosvolgy.png"
  }
  else if (kuldik[i].title == "Határvidék") {
    img.src = "hatarvidek.png"
  }
  else if (kuldik[i].title == "Krumpliöntözés") {
    img.src = "krumpliont.png"
  }
  else if (kuldik[i].title == "Sorház") {
    img.src = "sorhaz.png"
  }
  else if (kuldik[i].title == "Gazdag város") {
    img.src = "gazdagvaros.png"
  }
  else if (kuldik[i].title == "Páratlan silók") {
    img.src = "paratlansilok.png"
  }
  else if (kuldik[i].title == "Gazdag vidék") {
    img.src = "gazdagvidek.png"
  }
  else if (kuldik[i].title == "Mágusok völgye") {
    img.src = "magusokvolgye.png"
  }
  else if (kuldik[i].title == "Öntözőcsatorna") {
    img.src = "ontozocsatorna.png"
  }
  else if (kuldik[i].title == "Fasor") {
    img.src = "fasor.png"
  }
  else if (kuldik[i].title == "Üres telek") {
    img.src = "urestelek.png"
  }
  img.setAttribute("class", "kuldetesek");
  jatekok[i].appendChild(img);
}

shuffleArray(elements);

let leR = elements[Math.floor(Math.random() * elements.length)];
const leElem = document.getElementById("lerakandoMezo")

function remMezo(mezo, mezok) {
  for (let i = 0; i < mezo.shape.length; i++) {
    for (let j = 0; j < mezo.shape.length; j++) {
      if (mezo.shape[i][j] == 1) {
        mezok.rows[i].cells[j].innerHTML = ''
      }
    }
  }
}


function mezoLe(le) {

  for (let i = 0; i < le.shape.length; i++) {
    for (let j = 0; j < le.shape.length; j++) {
      if (le.shape[i][j] == 1) {
        const img = document.createElement('img');
        img.src = le.type + "_tile.png"
        img.setAttribute("class", "leElemek")
        leElem.rows[i].cells[j].appendChild(img)
      }
    }
  }
}

mezoLe(leR)

// Játék logika
let times = 0;
let fullTime = 28;
let seasons = ["Tél (DA)", "Ősz (CD)", "Nyár (BC)", "Tavasz (AB)"]
let currentSeason = seasons.pop();
let score = 0;
let scrores = 0;
let taScore = 0;
let teScore = 0;
let oScore = 0;
let nScore = 0;
let hegyek = [[1, 1], [3, 8], [5, 3], [8, 9], [9, 5]]
let aktivKuld = []
let szabadMezok = 11 * 11



// Forgatás és tükrözés gombok
function rotateClockwise(a) {
  var n = a.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = i; j < n - i - 1; j++) {
      var tmp = a[i][j];
      a[i][j] = a[n - j - 1][i];
      a[n - j - 1][i] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[j][n - i - 1];
      a[j][n - i - 1] = tmp;
    }
  }
  return a;
}


document.getElementById('rotate-button').addEventListener('click', () => {
  remMezo(leR, leElem)
  rotateClockwise(leR.shape)
  mezoLe(leR)
  leR.rotation += 1;
});

document.getElementById('mirror-button').addEventListener('click', () => {
  remMezo(leR, leElem)
  /* leR.shape = rotateClockwise(leR.shape)
  leR.shape = rotateClockwise(leR.shape) */
  for (var i = 0; i < leR.shape.length; i++) {
    leR.shape[i].reverse();
  }

  mezoLe(leR)
  leR.mirrored = true;
});

document.getElementById('jatekBefejez').addEventListener('click', () => {
  if(window.confirm("Újrakezded a játékot?")){
    location.reload()
  }
  
});

function currentSeasonMissions(){
  let tavasz = document.getElementsByClassName('td2')
  let nyar = document.getElementsByClassName('td3')
  let osz = document.getElementsByClassName('td4')
  let tel = document.getElementsByClassName('td5')

  let kuldetes1 = document.getElementById("jatek2");
  let kuldetes2 = document.getElementById("jatek3");
  let kuldetes3 = document.getElementById("jatek4");
  let kuldetes4 = document.getElementById("jatek5");

  console.log(currentSeason)

  if (currentSeason == "Tavasz (AB)") {
    if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      taScore = hatarVidek()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
        taScore = almosVolgy()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      taScore = krumpliOnt()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      taScore = erdoSzele()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      taScore = faSor()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      taScore = ontozoCsatorna()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      taScore = uresTelek()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      taScore = paratlanTeli()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      taScore = gazdagVaros()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      taScore = magusVolgy()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      taScore = sorHaz()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      taScore = gazdagVidek()
    }
    
    if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      taScore += hatarVidek()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
        taScore += almosVolgy()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      taScore += krumpliOnt()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      taScore += erdoSzele()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      taScore += faSor()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      taScore += ontozoCsatorna()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      taScore += uresTelek()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      taScore += paratlanTeli()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      taScore += gazdagVaros()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      taScore += magusVolgy()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      taScore += sorHaz()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      taScore += gazdagVidek()
    }

  }
  else if (currentSeason == "Nyár (BC)") {
    if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      nScore = hatarVidek()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      nScore = almosVolgy()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      nScore = krumpliOnt()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      nScore = erdoSzele()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      nScore = faSor()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      nScore = ontozoCsatorna()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      nScore = uresTelek()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      nScore = paratlanTeli()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      nScore = gazdagVaros()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      nScore = magusVolgy()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      nScore = sorHaz()
    }
    else if(kuldetes2.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      nScore = gazdagVidek()
    }
    
    if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      nScore += hatarVidek()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      nScore += almosVolgy()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      nScore += krumpliOnt()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      nScore += erdoSzele()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      nScore += faSor()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      nScore += ontozoCsatorna()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      nScore += uresTelek()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      nScore += paratlanTeli()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      nScore += gazdagVaros()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      nScore += magusVolgy()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      nScore += sorHaz()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      nScore += gazdagVidek()
    }
    
  }
  else if (currentSeason == "Ősz (CD)") {
    if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      oScore = hatarVidek()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      oScore = almosVolgy()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      oScore = krumpliOnt()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      oScore = erdoSzele()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      oScore = faSor()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      oScore = ontozoCsatorna()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      oScore = uresTelek()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      oScore = paratlanTeli()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      oScore = gazdagVaros()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      oScore = magusVolgy()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      oScore = sorHaz()
    }
    else if(kuldetes3.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      oScore = gazdagVidek()
    }
    
    if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      oScore += hatarVidek()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      oScore += almosVolgy()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      oScore += krumpliOnt()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      oScore += erdoSzele()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      oScore += faSor()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      oScore += ontozoCsatorna()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      oScore += uresTelek()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      oScore += paratlanTeli()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      oScore += gazdagVaros()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      oScore += magusVolgy()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      oScore += sorHaz()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      oScore += gazdagVidek()
    }
    
  }
  else if (currentSeason == "Tél (DA)") {
    if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      teScore = hatarVidek()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      teScore = almosVolgy()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      teScore = krumpliOnt()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      teScore = erdoSzele()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      teScore = faSor()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      teScore = ontozoCsatorna()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      teScore = uresTelek()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      teScore = paratlanTeli()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      teScore = gazdagVaros()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      teScore = magusVolgy()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      teScore = sorHaz()
    }
    else if(kuldetes4.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      teScore = gazdagVidek()
    }
    
    if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'){
      teScore += hatarVidek()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'){
      teScore += almosVolgy()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'){
      teScore += krumpliOnt()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'){
      teScore += erdoSzele()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'){
      teScore += faSor()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'){
      teScore += ontozoCsatorna()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'){
      teScore += uresTelek()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'){
      teScore += paratlanTeli()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'){
      teScore += gazdagVaros()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'){
      teScore += magusVolgy()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'){
      teScore += sorHaz()
    }
    else if(kuldetes1.innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'){
      teScore += gazdagVidek()
    }
  }
  
  
  
  tavasz[0].innerText = "Tavasz: \n"+taScore+" pont"
  nyar[0].innerText = "Nyár: \n"+nScore+" pont"
  osz[0].innerText = "Ősz: \n"+oScore+" pont"
  tel[0].innerText = "Tél: \n"+teScore+" pont"
}

function korbevettHegy(){
  let db = 0;
  let ossz = 0


  for (let i = 0; i < hegyek.length; i++) {
    if (gridTable.rows[hegyek[i][0] - 1].cells[hegyek[i][1]].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db += 1
    }
    else if (gridTable.rows[hegyek[i][0]].cells[hegyek[i][1] + 1].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db += 1
    }
    else if (gridTable.rows[hegyek[i][0]].cells[hegyek[i][1] - 1].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db += 1
    }
    else if (gridTable.rows[hegyek[i][0] + 1].cells[hegyek[i][1]].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db += 1
    }

    if(db == 4){
      ossz += 1
    }

    db = 0
  }

  

  return ossz
}


function updateDisplay() {
  const jatek1 = document.getElementById("jatek1");
  getActivMissions()
  currentSeasonMissions()

  jatek1.innerText = "Jelenlegi évszak: " + currentSeason;
  if(fullTime <=0){
    jatek1.innerText = "Jelenlegi évszak: VÉGE";
  }

  const hatralevoido = document.getElementById("hatralevo")

  hatralevoido.innerText = "Évszakból hátralevő idő: " + times + "/7";


  const idoerteke = document.getElementById("idoerteke")
  idoerteke.innerText = "Időértéke: " + leR.time

  const kuldPont = document.getElementsByClassName('kuldPont')
  const betuk = ['A', 'B', 'C', 'D']
  let misson1 = document.getElementById("jatek2");
  let misson2 = document.getElementById("jatek3");
  let misson3 = document.getElementById("jatek4");
  let misson4 = document.getElementById("jatek5");

  let mission = [misson1, misson2, misson3, misson4]
  
  
  for (let i = 0; i < 4; i++) {
    if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesekaktiv">'
       || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="hatarvidek.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + hatarVidek() + " pont"
     
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="erdoszele.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + erdoSzele() + " pont"
      
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="almosvolgy.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + almosVolgy() + " pont"
     
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="krumpliont.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + krumpliOnt() + " pont"
     
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="fasor.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + faSor() + " pont"
     
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="ontozocsatorna.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + ontozoCsatorna() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="urestelek.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + uresTelek() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="paratlansilok.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + paratlanTeli() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvaros.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + gazdagVaros() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="magusokvolgye.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + magusVolgy() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="sorhaz.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + sorHaz() + " pont"
    }
    else if (mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesekaktiv">'
          || mission[i].innerHTML.replaceAll(" ","").replaceAll("\n","") == '<imgsrc="gazdagvidek.png"class="kuldetesek">') {
      kuldPont[i].innerText = betuk[i] + " | " + gazdagVidek() + " pont"
    }
  }
  scrores = (korbevettHegy()) + taScore + teScore + nScore + oScore
  const osszpont = document.getElementById("osszpont")
  osszpont.innerText = "Összesen : " +scrores 
  console.log(fullTime)
 
}

updateDisplay()

function getShapeSeged(shape){
  let helyek = []
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape.length; j++) {
      if (shape[j][i] == 1) {
        helyek.push([j, i]);
        
      }
    }
  
  }
  return helyek
  
}

function getShape(shape) {
  let johelyek = getShapeSeged(shape)
  let johelyek2 = getShapeSeged(shape)

  
  let first = johelyek[0]

  for (let i = 0; i < johelyek2.length; i++) {
      johelyek2[i][0] = johelyek2[i][0]-first[0]
      johelyek2[i][1] = johelyek2[i][1]-first[1]
    
  }

  /* console.log("------------------------")
  console.log(johelyek2)
  console.log("----------------------------------") */
  return johelyek2
}

function isValid(row, col, locs) {
  let lokaciok = locs
  /* console.log(lokaciok)  */
  
  if (gridTable.rows[row].cells[col].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
    
    return false
    
  }

  for (let i = 0; i < lokaciok.length; i++) {
    if((((lokaciok[i][0]+row) < 0) || ((lokaciok[i][1] + col)) < 0) || (((lokaciok[i][0]) +row) > 10 || ((lokaciok[i][1]) + col)  > 10)){
      return false
      
    }
    
    if((((lokaciok[i][0]+row) >= 0) && ((lokaciok[i][1] + col) >= 0)) && (((lokaciok[i][0] +row) <= 10) && ((lokaciok[i][1] + col)  <= 10))){
    if (gridTable.rows[lokaciok[i][0] + row].cells[lokaciok[i][1] + col].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      return false;
    }
    }
  }

  return true;
}

function placeMezo(row, col, leC) {
    let shape = leC.shape
    let locations = getShape(shape)
    if (isValid(row,col,locations) == true) {
      for (let i = 0; i < locations.length; i++) {
        const img = document.createElement('img');
        img.src = leC.type + "_tile.png";
        img.style.height = "45px";
        img.style.width = "45px";
  
          gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].innerHTML = '';
          gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].appendChild(img)
          gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].classList.remove("aktiv2");
  
      }
  
      return true;
      
    }
  

  return false;
}

function oszlopHatar(row) {
  let db = 0;
  for (let i = 0; i < gridSize; i++) {
    if (gridTable.rows[row].cells[i].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db++;
    }
  }
  if (db == 11) {
    return 1
  }

  return 0
}

function sorHatar(col) {
  let db = 0;
  for (let i = 0; i < gridSize; i++) {
    if (gridTable.rows[i].cells[col].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
      db++;
    }
  }
  if (db == 11) {
    return 1
  }

  return 0
}

function hatarVidek() {
  let ossz = 0
  let oszlop = 0
  let sor = 0
  for (let i = 0; i < gridSize; i++) {
    oszlop = oszlopHatar(i)
    sor = sorHatar(i)

    ossz += oszlop + sor
  }
  return (ossz * 6)
}

function erdoSzele() {
  let fadb = 0;

  for (let i = 0; i < gridSize; i++) {
    if (gridTable.rows[i].cells[0].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">') {
      fadb++;
    }
    if(gridTable.rows[0].cells[i].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
      fadb++;
    }
    
    if(gridTable.rows[10].cells[i].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
      fadb++;
    }

    if(gridTable.rows[i].cells[10].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
      fadb++;
    }


  }

  return fadb;

}

function sorVolgy(row) {
  let db = 0;
  for (let i = 0; i < gridSize; i++) {
    if (gridTable.rows[row].cells[i].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">') {
      db++;
    }
  }
  if (db == 3) {
    return 1
  }

  return 0
}

function almosVolgy() {
  let ossz = 0
  for (let i = 0; i < gridSize; i++) {
    ossz += sorVolgy(i)
  }

  return (ossz * 4)

}


function krumpliOnt() {
  let ossz = 0;
  let farmTiles = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (gridTable.rows[i].cells[j].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">')
        farmTiles.push([i, j])
    }

  }

  for (let i = 0; i < farmTiles.length; i++) {
    
      if (farmTiles[i][0] - 1 > -1 && gridTable.rows[farmTiles[i][0] - 1].cells[farmTiles[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
      
      if (farmTiles[i][1] + 1 < 11 && gridTable.rows[farmTiles[i][0]].cells[farmTiles[i][1] + 1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
      if (farmTiles[i][1] - 1 > -1 && gridTable.rows[farmTiles[i][0]].cells[farmTiles[i][1] - 1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }

      if (farmTiles[i][0] + 1 < 11 && gridTable.rows[farmTiles[i][0] + 1].cells[farmTiles[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
    

  }
  
  return ossz*2

}

function faSor(){
  let max = 0;
  let hossz = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(gridTable.rows[j].cells[i].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
        hossz +=1;
      }
      if(j + 1 < 11 && gridTable.rows[j+1].cells[i].innerHTML != '<img src="forest_tile.png" style="height: 45px; width: 45px;">'
        && hossz > 0){
        break;
      }
    }
    if(max < hossz){
      max = hossz
    }
    hossz = 0
    
  }
  return max*2
}

function ontozoCsatorna(){
let ossz = 0;
let vizDb = 0;
let farmDb = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(gridTable.rows[j].cells[i].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
        vizDb+=1;
      }

      if(gridTable.rows[j].cells[i].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
        farmDb+=1;
      }
 
    }
    if(farmDb === vizDb && farmDb > 0 && vizDb > 0){
      ossz+=1;
    }
    farmDb = 0
    vizDb = 0
  }

  return ossz*4;

}

function paratlanTeli(){
  let db = 0
  let ossz = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(((i+1) % 2 == 1) && gridTable.rows[j].cells[i].innerHTML != '<img src="base_tile.png" style="width: 45px; height: 45px;">'){
        db++;
      }
  }
  if(db == 11){
    ossz++;
  }
  db = 0;
}
 return ossz*10
}

function sorHaz(){
  let max = 0;
  let hossz = 0;
  let ossz = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(gridTable.rows[i].cells[j].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
        hossz ++;
      }
 
    }
    if(max < hossz){
      max = hossz
    }
    hossz = 0
    
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(gridTable.rows[i].cells[j].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
        hossz ++;
      }
 
    }
    if(hossz == max){
      ossz++;
    }
    hossz = 0
    
  }
return ossz*2*max;
}

function magusVolgy(){
  let ossz = 0;

  for (let i = 0; i < hegyek.length; i++) {
    
      if (hegyek[i][0] - 1 > -1 && gridTable.rows[hegyek[i][0] - 1].cells[hegyek[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
      
      if (hegyek[i][1] + 1 < 11 && gridTable.rows[hegyek[i][0]].cells[hegyek[i][1] + 1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
      if (hegyek[i][1] - 1 > -1 && gridTable.rows[hegyek[i][0]].cells[hegyek[i][1] - 1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }

      if (hegyek[i][0] + 1 < 11 && gridTable.rows[hegyek[i][0] + 1].cells[hegyek[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">') {
        ossz += 1
      }
    

  }
  
  return ossz*3
}

function uresTelek(){
  let ossz = 0;
  let townTiles = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (gridTable.rows[i].cells[j].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">')
      townTiles.push([i, j])
    }

  }

  for (let i = 0; i < townTiles.length; i++) {
    
      if (townTiles[i][0] - 1 > -1 && gridTable.rows[townTiles[i][0] - 1].cells[townTiles[i][1]].innerHTML == '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
        ossz += 1
      }
      
      if (townTiles[i][1] + 1 < 11 && gridTable.rows[townTiles[i][0]].cells[townTiles[i][1] + 1].innerHTML == '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
        ossz += 1
      }
      if (townTiles[i][1] - 1 > -1 && gridTable.rows[townTiles[i][0]].cells[townTiles[i][1] - 1].innerHTML == '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
        ossz += 1
      }

      if (townTiles[i][0] + 1 < 11 && gridTable.rows[townTiles[i][0] + 1].cells[townTiles[i][1]].innerHTML == '<img src="base_tile.png" style="width: 45px; height: 45px;">') {
        ossz += 1
      }
    

  }
  
  return ossz*2

}

function gazdagVidek(){
  let ossz = 0;
  
  for (let i = 0; i < gridSize; i++) {
    let mountain = false;
    let town = false;
    let farm = false;
    let forest = false;
    let water = false;
    for (let j = 0; j < gridSize; j++) {
      if(gridTable.rows[i].cells[j].innerHTML ==  '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
        water = true;
      }
      else if(gridTable.rows[i].cells[j].innerHTML ==  '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
        forest = true;
      }
      else if(gridTable.rows[i].cells[j].innerHTML ==  '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
        farm = true;
      }
      else if(gridTable.rows[i].cells[j].innerHTML ==  '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
        town = true;
      }
      else if(gridTable.rows[i].cells[j].innerHTML ==  '<img src="mountain_tile.png" style="width: 45px; height: 45px;">'){
        mountain = true;
      }
      
    }
    if(mountain ===true && town ===true && farm ===true && forest ===true && water ===true){
      ossz++
    }
    
  }


   return ossz*4;
}

function gazdagVaros(){
  let ossz = 0;
  let towns = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (gridTable.rows[i].cells[j].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">')
        towns.push([i, j])
    }

  }

  let current = ""
  for (let i = 0; i < towns.length; i++) {
    let szomszedok = ["water", "forest","farm","town","mountain"]
      if (towns[i][0] - 1 > -1 && gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML != '<img src="base_tile.png" style="height: 45px; width: 45px;">') {
        if(gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
          current = "water"
        }
        if(gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
          current = "forest"
        }
        if(gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
          current = "farm"
        }
        if(gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
          current = "town"
        }
        if(gridTable.rows[towns[i][0] - 1].cells[towns[i][1]].innerHTML == '<img src="mountain_tile.png" style="height: 45px; width: 45px;">'){
          current = "mountain"
        }

        szomszedok = szomszedok.filter(function(item) {
          return item !== current;
      });
      }
      
      if (towns[i][1] + 1 < 11 && gridTable.rows[towns[i][0]].cells[towns[i][1] + 1].innerHTML != '<img src="base_tile.png" style="height: 45px; width: 45px;">') {
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]+1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
          current = "water"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]+1].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
          current = "forest"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]+1].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
          current = "farm"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]+1].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
          current = "town"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]+1].innerHTML == '<img src="mountain_tile.png" style="height: 45px; width: 45px;">'){
          current = "mountain"
        }

        szomszedok = szomszedok.filter(function(item) {
          return item !== current;
      });
        
      }
      if (towns[i][1] - 1 > -1 && gridTable.rows[towns[i][0]].cells[towns[i][1] - 1].innerHTML != '<img src="base_tile.png" style="height: 45px; width: 45px;">') {
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]-1].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
          current = "water"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]-1].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
          current = "forest"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]-1].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
          current = "farm"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]-1].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
          current = "town"
        }
        if(gridTable.rows[towns[i][0]].cells[towns[i][1]-1].innerHTML == '<img src="mountain_tile.png" style="height: 45px; width: 45px;">'){
          current = "mountain"
        }

        szomszedok = szomszedok.filter(function(item) {
          return item !== current;
      });
      }

      if (towns[i][0] + 1 < 11 && gridTable.rows[towns[i][0] + 1].cells[towns[i][1]].innerHTML != '<img src="base_tile.png" style="height: 45px; width: 45px;">') {
        if(gridTable.rows[towns[i][0]+1].cells[towns[i][1]].innerHTML == '<img src="water_tile.png" style="height: 45px; width: 45px;">'){
          current = "water"
        }
        if(gridTable.rows[towns[i][0]+1].cells[towns[i][1]].innerHTML == '<img src="forest_tile.png" style="height: 45px; width: 45px;">'){
          current = "forest"
        }
        if(gridTable.rows[towns[i][0]+1].cells[towns[i][1]].innerHTML == '<img src="farm_tile.png" style="height: 45px; width: 45px;">'){
          current = "farm"
        }
        if(gridTable.rows[towns[i][0]+1].cells[towns[i][1]].innerHTML == '<img src="town_tile.png" style="height: 45px; width: 45px;">'){
          current = "town"
        }
        if(gridTable.rows[towns[i][0]+1].cells[towns[i][1]].innerHTML == '<img src="mountain_tile.png" style="height: 45px; width: 45px;">'){
          current = "mountain"
        }

        szomszedok = szomszedok.filter(function(item) {
          return item !== current;
      });
      }
      
      if(szomszedok.length <= 2){
        ossz+=1
      }
     
  }
  
  return ossz*3;
}




function getActivMissions() {
  if (currentSeason == "Tavasz (AB)") {
    aktivKuld = [jatek2, jatek3]
  }
  else if (currentSeason == "Nyár (BC)") {
    aktivKuld = [jatek3, jatek4]
  }
  else if (currentSeason == "Ősz (CD)") {
    aktivKuld = [jatek4, jatek5]
  }
  else if (currentSeason == "Tél (DA)") {
    aktivKuld = [jatek5, jatek2]
  }

  for (let i = 0; i < 2; i++) {
    aktivKuld[i].firstElementChild.classList.add('aktiv', 'kuldetesek')

  }


}

function jatekVege(){
    updateDisplay()
    alert("Játék vége! \nÖsszpont: "+scrores)
    gridTable.removeEventListener("click", clickTile)
}
gridTable.addEventListener("mouseover", function(e){
  let row = e.target.closest("tr").rowIndex
    let col = e.target.closest("td").cellIndex
    let shape = leR.shape
    let locations = getShape(shape)
    if (isValid(row,col,locations) == true) {
      for (let i = 0; i < locations.length; i++) {
      
    gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].setAttribute("class", "aktiv2");  
      }
  
      return true;
      
    }
    else{
      for (let i = 0; i < locations.length; i++) {
      
        gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].setAttribute("class", "badPlace");  
          }
    }
  

  return false;
})

gridTable.addEventListener("mouseout", function(e){
  let row = e.target.closest("tr").rowIndex
  let col = e.target.closest("td").cellIndex
  let shape = leR.shape
  let locations = getShape(shape)
  if (isValid(row,col,locations) == true) {
    for (let i = 0; i < locations.length; i++) {

        gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].classList.remove("aktiv2");  
    }

    return true;
    
  }
  else{
    for (let i = 0; i < locations.length; i++) {

      gridTable.rows[locations[i][0] + row].cells[locations[i][1] + col].classList.remove("badPlace");  
  }
  }


return false;
})
gridTable.addEventListener("click", clickTile)

function clickTile(e) {
  if (e.target.matches("img")) {
    let clickRow = e.target.closest("tr").rowIndex
    let clickCol = e.target.closest("td").cellIndex

    if (isValid(clickRow,clickCol,getShape(leR.shape)) == true) {
      placeMezo(clickRow,clickCol,leR)
      szabadMezok -= getShape(leR).length
      times += leR.time;
      fullTime -= leR.time;
      if (fullTime <= 0) {
        jatekVege()
      }
      if (times >= 7) {
        currentSeason = seasons.pop()
        fullTime += (times-7)
        times = 0;
        
        for (let i = 0; i < 2; i++) {
          aktivKuld[i].firstElementChild.classList.remove('aktiv')

        }

        getActivMissions()
      }
      remMezo(leR, leElem)
      shuffleArray(elements)
      leR = elements[Math.floor(Math.random() * elements.length)];
      mezoLe(leR)
    }


  }


  updateDisplay()

}


