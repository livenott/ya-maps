// Импорт стилей
import '../src/style.css';

let myMap;
let reviewForm = document.querySelector('.map__review');

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [35.337272, 33.322556],
        zoom: 15,
        controls: []
    });

    const coords = [
        [35.338573, 33.315818],
        [35.336780, 33.307021]
    ];

    var myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'islands#redIcon', //все метки красные
        draggable: false // и их можно перемещать
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors
    .disable(['drag', 'rightMouseButtonMagnifier','scrollZoom','dblClickZoom'])

    myMap.events.add('click', function (e) {
        if(reviewForm.classList.contains('d-none')){
            reviewForm.classList.remove('d-none');
        }else{
            reviewForm.classList.add('d-none');
        }
    })
}

ymaps.ready(init);
