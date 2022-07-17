// Импорт стилей
import '../src/style.css';
// переменная в которо происходит инициализация карты 
let myMap;
//блок отзывов
let reviewBlock = document.querySelector('.map__review');
//флаг для проверки появилась ли 
let isClick = reviewBlock.classList.contains('d-none');
//крестик на форме
let closeButton = document.querySelector('.close');
//кнопка добавить
let addButton = document.querySelector('#map__review-add');
//форма отзывов
let reviewForm = document.querySelector('.map__review-form');

const init = () => {

    //инициализация карты
    myMap = new ymaps.Map("map", {
        center: [35.337272, 33.322556],
        zoom: 15,
        controls: []
    });

    //отключила перетаскивание и зумы
    myMap.behaviors
    .disable(['drag', 'rightMouseButtonMagnifier','dblClickZoom'])

    //массив в котором я буду хранить свои координаты
    const coords = [];

    //создаю коллекцию геообъектов и записываю ее в переменную myCollection
    var myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'islands#redIcon', //все метки красные
        draggable: false // и их нельзя перемещать
    });

    //Форма: открыть / закрыть
    myMap.events.add('click', function(e) {

        var coord = e.get('coords');
        coords.push(coord);
    
        //получаем позицию курсора на момент клика
        let position = e.get('domEvent').get('position');

        //открываем форму рядом с буллетом
        if(isClick === true){
            reviewBlock.style.top = (position[1] - 382) + "px";
            reviewBlock.style.left = (position[0] - 72) + "px";
            reviewBlock.classList.remove('d-none');
        }
        //обработка события вне формы -- ?? ничего не получается
        if(isClick === false){
            document.addEventListener('click', function(e){
                if (e.target.id !== 'map__review'){
                    reviewBlock.classList.add('d-none');
                }
            })
        }

        //закрываем форму по крестику
        closeButton.addEventListener('click', function (e) { 
            reviewBlock.classList.add('d-none');
        });

        //запись данных из формы
        addButton.addEventListener('click', function(e){
            e.preventDefault(e);
            if(e.target.tagName === 'BUTTON'){
                
                let reviewObj = {};
                let reviewArray = [];

                //записываем данные в массив [index:0 - объект 1,index1:1 - объект 2]

                reviewArray.push(`name = ${reviewForm.name.value}`)
                reviewArray.push(`place = ${reviewForm.place.value}`)
                reviewArray.push(`review = ${reviewForm.review.value}`)

                //записываем массив в объект где ключ - координаты, а значение - массив объектов
                console.log(reviewObj);
                console.log(reviewArray);
                localStorage[position]= JSON.stringify(reviewArray);

                //очищаю форму
                reviewForm.name.value = ' ';
                reviewForm.place.value = ' ';
                reviewForm.review.value = ' ';

                //добавляю в объект [geoObjects - гео-объекты карты] свои буллеты
                myMap.geoObjects.add(myCollection);

                //добавляем при клике поинтер
                myCollection.add(new ymaps.Placemark(coord));

                //закрываю карту после добавления
                reviewBlock.classList.add('d-none');

                console.log(coords);
            }
        });
        
    })
}

ymaps.ready(init);
