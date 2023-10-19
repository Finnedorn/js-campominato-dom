/*
Bonus
Solo se l'esercizio base funziona perfettamente: create una nuova cartella chiamata bonus e copiateci dentro tutti i files e cartelle dell'esercizio base tranne la cartella .git.
Poi procedete ad implementare il bonus come segue.
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

Minefield();

function Minefield() {
    //richiamo il bottone dall'html
    const btn = document.querySelector('button');
    //mi creo una costante per le bombe sparse, in tutto 16
    let gameOver = false;

    btn.addEventListener('click', () => {
        
        //creo un'array in cui andranno i numeri rng a cui attribuirò le bombe
        let mines = [];

        //richiamo il select dall'html
        let level = document.getElementById('level').value;
        console.log(level);
        
        //creo una costante per il numero delle caselle
        let boxNum;
        boxNum= levelCreator(level);
        console.log(boxNum);

        let box;

        //associo all'array il return della funzione minegenerator
        mines = mineGenerator(mines, boxNum);

        //richiamo il div dove inserirò le box
        const field = document.getElementById('field');
        console.log(field);

        //faccio in modo che prima di elaborare le boxes mi si svuoti il field
        field.innerHTML = '';
        //creo un ciclo per stampare le box
        for(let i = 1; i <= boxNum; i++) {
            let box = addBox(i,boxNum);
            field.append(box);
        };
    });

    //creo una funzione che mi generi div e aggiunga la classe alla box 
    function addBox(index, howmanyboxes) {
        //creo il div della box
        box = document.createElement('div');
        //aggiungo la classe al div
        box.classList.add('box');
        const boxWidth = Math.sqrt(howmanyboxes);
        box.style.borderRadius = `10px`;
        box.style.width = `calc(100% / ${boxWidth})`;
        box.style.height = `calc(100% / ${boxWidth})`;
        //voglio inserire dei numeri dentro alle box quindi:
        box.innerHTML = index;

        //creo una funzione che al click della box mi permetta di cambiarle colore
        box.addEventListener('click', function() {
            //ora metto la condizione che se la casella cliccata corrisponderà ad una delle caselle rng estratte dentro l'array mines allora esploderà!
            //altrimenti si illuminerà normalmente 
            if(mines.includes(parseInt(box.textContent))) {
                box.classList.add('bomb');
                box.style.color = 'var(--primary-blue)';
                //box.innerHTML = 
                gameOver = true; 
            } else {
                box.classList.add('pressed');
                box.style.color = 'var(--primary-blue)';
                console.log('hai cliccato il tasto numero:' + i)
            }
        });
        return box;
    };

    function levelCreator(difficulty) {
        switch(difficulty) {
            case 'easy':
                el2 = 100;
                break;
            case 'normal':
                el2 = 81;
                break;
            default:
                el2 = 49;
        }
        return el2;
    };

    //uso il rng per generarmi le bombe in una funzione apparte
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //mi creo una funzione che mi geenri le mine
    function mineGenerator(elArray, numOfBoxes) {
        const numMines = 15;
        //creo un ciclo while che cicli fino a che mines non ha 16 elementi estratti a caso
        while(elArray.length <= numMines) {
            //per ogni volta che cicla 
            //estraggo un numero da 1 a al massimo (in base a boxnum)
            let mine = getRndInteger(1, numOfBoxes);
            //lo pusho nell'array
            elArray.push(mine);
            //ma se ho gia questo numero?
            //potrei usare un include:
            //se l'array non include questo elemento estratto rng, pushamelo in array!
            console.log(mine);
            if(!elArray.includes(mine)) {
                elArray.push(mine);
            }
        };
        console.log(elArray);
        return elArray;
    }
};
