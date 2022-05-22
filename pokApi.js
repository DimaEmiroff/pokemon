let inp = document.querySelector('.inp_pok');
let btn = document.querySelector('.btn_pok');
let btn_del = document.querySelector('.btn_pok_del');
let div = document.querySelector('div');
let divBack = document.querySelector('div');
let div_pok = document.querySelector('.div_pok');

//Инициализация ключевых слов let для сохранения данных
let data = '';//Пустое значение,для записи данных
let pushPok = [];// Пустой массив,для записи новых значений

/*----Объявление функции, для запроса к API (всегда асинхронное выполнение)*/
const getUrl = async (obj, arrData) => {//Ключевое слово аsync, для возврата промиса (связь сервера и подьзователя)
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${obj}`);//awаit - заставляет ждать,то что находится слева от него
    res = await res.json();//вывод данные в формате JSON
    arrData.push(res.sprites.front_default);// Пушит фото с покемоном в конец
   console.log(res);// Выводит в консоль весь объект
}

//Объявляем функцию для считывания событий
const getData = (str) => {data = str.target.value};//Свойство event.target обращается к элементу, на котором произошло событие

/*Объявление асинхронной функции, для перебора данных и запись их в массив*/
const getImgFrontShow = async () => {
   div.innerHTML = ''; //---Обнуление значений, при задвоении записей в массив
    await getUrl(data, pushPok);// вызываем функцию и передаем переменные в качестве аргументов
    pushPok.forEach(item => {//перебор массива методом ForEach(), который выполняет указанную функцию один раз для каждого элемента в массиве.
            getImg(item, div);
        console.log(pushPok);
    })
}

/*Удаление данных массива, с помощью метода splice()*/
const getImgRem = async () => {
    divBack.innerHTML = ''; //---Обнуление значений
    pushPok.splice(0,5);
}

/*Объяление функции с двумя аргументами, для создания DOM элемента <img> и <p>*/
const getImg = (elem, htmlCont) => {
    const img = document.createElement('img');//создает новый элемент с тэгом <img> и присваивает его переменной
    let p = document.createElement('p');//создает новый элемент с тэгом <р> и присваивает его переменной
    p.innerHTML = data;// Позволяет получить HTML-содержимое элемента в виде строки, вводимое в поле <input>
    img.style.cssText = `
    wight: 120px;
    height: 120px;
`
    p.style.cssText = `
    font-size: 24px;
     margin-left: 50px;
`
    p.src = elem;// Передаем ссылку на API, html элементу <p>
    img.src = elem;// Передаем ссылку на API, html элементу <img>
    htmlCont.append(p); // Вставляем тег в конец div
    htmlCont.append(img);// Вставляем тег в конец div
}

/*Обработчики события*/
inp.addEventListener('keyup',getData);//Обработка события, при вводе с клавиатуры в поле <input> и передача в переменную data
btn.addEventListener('click', getImgFrontShow);//Обработка события при нажатии на левую клавишу мыши и выполнение дейстия согласно функции
btn_del.addEventListener('click', getImgRem);//Обработка события при нажатии на левую клавишу мыши и выполнение дейстия согласно функции удаления элементов

//----STYLES----
//----Div----
div_pok.style.cssText = `
      display: flex;
      flex-direction: row;
       align-items: center;
`
//-----Input----
inp.style.cssText = `
        
        width: 140px;
        height: 35px;
 `
//----Button----
btn.style.width = '140px';
btn.style.height = '40px';

//----Button delete----
btn_del.style.width = '140px';
btn_del.style.height = '40px';
//btn_sec.style.marginTop = '20px';


