const startApp = () => {
  const playButton = document.querySelector('.js-play');
  const gameContainer = document.querySelector('.js-game');
  const heroContainer = document.querySelector('.js-hero');
  const reset = document.querySelector('.js-reset');
  const containers = [
    document.querySelector('.js-one'),
    document.querySelector('.js-two'),
    document.querySelector('.js-three'),
    document.querySelector('.js-four'),
  ];
  const setsOld = [
    ['do', 'did', 'done', 'делать'],
    ['go', 'went', 'gone', 'идти'],
    ['come', 'came', 'come', 'приходить'],
  ];

  const sets = [
["begin","began","begun","начинать"],
["drink","drank","drunk","пить"],
["ring","rang","rung","звонить"],
["sing","sang","sung","петь"],
["swim","swam","swum","плавать"],
["blow","blew","blown","дуть"],
["draw","drew","drawn","чертить"],
["grow","grew","grown","расти"],
["know","knew","known","знать"],
["throw","threw","thrown","бросать"],
["fly","flew","flown","летать"],
["drive","drove","driven","водить"],
["hide","hid","hidden","прятать"],
["bite","bit","bitten","кусать"],
["ride","rode","ridden","ехать"],
["rise","rose","risen","поднимать"],
["write","wrote","written","писать"],
["eat","ate","eaten","есть"],
["break","broke","broken","разбивать"],
["speak","spoke","spoken","говорить"],
["steal","stole","stolen","украсть"],
["freeze","froze","frozen","замораживать"],
["choose","chose","chosen","выбирать"],
["wake","woke","woken","будить"],
["fall","fell","fallen","падать"],
["shake","shook","shaken","трясти"],
["take","took","taken","брать"],
["forget","forgot","forgotten","забывать"],
["get","got","gotten","получать"],
["forgive","forgave","forgiven","прощать"],
["give","gave","given","давать"],
["bring","brought","brought","приносить"],
["buy","bought","bought","покупать"],
["catch","caught","caught","ловить"],
["fight","fought","fought","бороться"],
["teach","taught","taught","учить"],
["think","thought","thought","думать"],
["cost","cost","cost","стоить"],
["cut","cut","cut","резать"],
["fit","fit","fit","годиться"],
["hit","hit","hit","ударять"],
["hurt","hurt","hurt","ранить"],
["let","let","let","позволять"],
["put","put","put","класть"],
["quit","quit","quit","бросать"],
["set","set","set","установить"],
["shut","shut","shut","закрывать"],
["split","split","split","раскалывать"],
["upset","upset","upset","расстраивать"],
["knit","knit","knit","вязать"],
["spread","spread","spread","расстилать"],
["read","read","read","читать"],
["bleed","bled","bled","кровоточить"],
["feed","fed","fed","кормить"],
["lead","led","led","вести"],
["feel","felt","felt","чувствовать"],
["deal","dealt","dealt","иметь","дело"],
["build","built","built","строить"],
["hold","held","held","держать"],
["keep","kept","kept","хранить"],
["leave","left","left","покидать"],
["lend","lent","lent","одалживать"],
["mean","meant","meant","означать"],
["meet","met","met","встречать"],
["send","sent","sent","посылать"],
["sleep","slept","slept","спать"],
["spend","spent","spent","тратить"],
["sweep","swept","swept","подметать"],
["lay","laid","laid","положить"],
["pay","paid","paid","платить"],
["make","made","made","делать"],
["say","said","said","говорить"],
["become","became","become","становиться"],
["come","came","come","приходить"],
["hang","hung","hung","вешать"],
["dig","dug","dug","копать"],
["stick","stuck","stuck","приклеивать"],
["sting","stung","stung","жалить"],
["hear","heard","heard","слышать"],
["sell","sold","sold","продавать"],
["tell","told","told","сказать"],
["find","found","found","находить"],
["bind","bound","bound","связывать"],
["wind","wound","wound","наматывать"],
["sew","sewed","sewn","шить"],
["show","showed","shown","показывать"],
["swear","swore","sworn","клясться"],
["tear","tore","torn","рвать"],
["wear","wore","worn","носить"],
["stand","stood","stood","стоять"],
["understand","understood","understood","понимать"],
["be","was/were","been","быть"],
["see","saw","seen","видеть"],
["lose","lost","lost","терять"],
["shoot","shot","shot","стрелять"],
["win","won","won","выигрывать"],
["go","went","gone","идти"],
["do","did","done","делать"],
["run","ran","run","бежать"],
["have","had","had","иметь"],
["sit","sat","sat","сидеть"],
["lie","lay","lain","лежать"]
];

  const pathOptions = {
    '👶': ['🐶', '🐥', '🐱'],
    '🐶': ['🦊'],
    '🐥': ['🐤'],
    '🐱': ['🐯'],
    '🦊': ['🐺'],
    '🐤': ['🐔'],
    '🐯': ['🦁'],
    '🐺': ['🐴'],
    '🐔': ['🐴'],
    '🦁': ['🐴'],
    '🐴': ['🦄'],
    '🦄': ['🐬', '🐨', '🐍'],
    '🐬': ['🐳'],
    '🐨': ['🐻'],
    '🐍': ['🐲'],
    '🐻': ['🐼'],
    '🐼': [],
  };

  let heroPath = localStorage.getItem('heroPath');
  if (heroPath) {
    heroPath = JSON.parse(heroPath);
  } else {
    heroPath = ['👶'];
  }
  highlightHeroPath(heroPath);


  const levelUp = () => {
    const nextPathOptions = pathOptions[heroPath[heroPath.length - 1]];
    Array.from(document.querySelectorAll('td')).forEach(td => {
      if (nextPathOptions.includes(td.textContent)) {
        td.style.background = '#FDD835';
        td.style.cursor = 'pointer';
        td.onclick = () => {
          Array.from(document.querySelectorAll('td')).forEach(td => {
            if (nextPathOptions.includes(td.textContent)) {
              td.onclick = null;
            }
          })

          heroPath.push(td.textContent);

          highlightHeroPath(heroPath);
          localStorage.setItem('heroPath', JSON.stringify(heroPath))
          console.log(heroPath);
        }
      }
    });
  };

  const startGame = () => {
    heroContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    const toGo = (heroPath.length === 1) ? 3 : heroPath.length * 10;
    const nextSet = randomSetFactory(sets, toGo);
    const [knownIndex, unknownIndex1, unknownIndex2] = randomIndexes();
    // let verbSet = nextSet();

    const play = () => {
      containers.forEach(c => {
        if (c.children.length) {
          while (c.children.length) {
            c.removeChild(c.children[0])
          }
        } else {
          c.textContent = ''
        }
      });
      verbSet = nextSet();
      if (verbSet === null) {
        gameContainer.style.display = 'none';
        heroContainer.style.display = 'block';
        levelUp();
      } else {
        renderPazzle(
          verbSet[knownIndex], containers[knownIndex],
          verbSet[unknownIndex1], containers[unknownIndex1],
          verbSet[unknownIndex2], containers[unknownIndex2],
          verbSet[3], containers[3],
          play
        );
      }
    }
    play();
  };

  playButton.onclick = startGame;
  reset.onclick = () => {
    localStorage.removeItem('heroPath');
    window.location.reload()
  }
};

const highlightHeroPath = heroPath => {
  Array.from(document.querySelectorAll('td')).forEach(td => {
    if (heroPath.includes(td.textContent)) {
      td.style.background = '#81C784';
    } else {
      td.style.background = 'none';
    }
  });
  document.querySelector('.js-avatar').textContent = heroPath[heroPath.length - 1];
}

const randomIndexes = () => {
  const knownIndex = Math.floor(Math.random() * 3);
  const unknownIndexes = [0, 1, 2];
  unknownIndexes.splice(knownIndex, 1);
  const [unknownIndex1, unknownIndex2] = unknownIndexes;

  return [knownIndex, unknownIndex1, unknownIndex2];
};

const randomSetFactory = (allSets, subSetLength) => {
  const subSet = shuffle(allSets).slice(0, subSetLength);

  return () => {
    if (subSet.length === 0) return null;
    const index =  Math.floor(Math.random() * subSet.length);
    return subSet.splice(index)[0];
  }
};


const renderPazzle = (
  knownWord, knownContainer,
  unknownWord1, unknownContainer1,
  unknownWord2, unknownContainer2,
  translationWord, translationContainer,
  callback
) => {
  insertWord(knownWord, knownContainer);
  const unknownInput1 = insertInput(unknownWord1, unknownContainer1);
  const unknownInput2 = insertInput(unknownWord2, unknownContainer2);
  insertWord(translationWord, translationContainer);

  unknownInput2.setAttribute('readonly', 'readonly');
  unknownInput1.focus();
  unknownInput1.onSuccess = () => {
    unknownInput1.setAttribute('readonly', 'readonly');
    unknownInput2.removeAttribute('readonly');
    unknownInput2.focus();
    unknownInput2.onSuccess = () => {
      unknownInput2.setAttribute('readonly', 'readonly');
      callback && callback();
    }
  };
}

const insertWord = (word, element) => {
  element.textContent = word;
};
const insertInput = (word, element) => {
  const input = document.createElement('input');
  input.title = word;
  input.onkeydown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      return false;
    }
    if (e.key === 'Enter') {
      if (input.value === word) {
        input.style.background = '#81C784';
        input.onkeydown = null;
        input.onSuccess && input.onSuccess();
      } else {
        input.style.background = '#FFD54F';
        input.onError && input.onError();
      }
    } else {
      input.style.background = '';
    }
  };
  element.appendChild(input);
  return input;
}

const shuffle = (inputArr) => {
    const a = inputArr.slice()
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

window.onload = startApp;