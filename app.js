/*jslint node: true */
'use strict';

// Подключение express
var express = require('express');
var hbs = require("hbs");

// Создаем объект приложения
var app = express();
//var jsonParser = bodyParser.json();
var host = getIPAddress();
var hostdb = "localhost";
var port = "27017";
//var bd = "tokyo52";
var appport = 80;
var wsport = 443;
//var url = "mongodb://" + hostdb + ":" + port + "/" + bd;

// Устанавливаем нахождение представлений
hbs.registerPartials(__dirname + '/views/particales');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

// Главная страница
app.get('/', (req, res) => {
	
	// Текцщий год
	let nowYear = new Date().getFullYear();
		
	// Чем заполнять
	let data = {
		title: `Индивидуальные экскурсии по Черногории, лицензированный гид и историк. Общаемся без посредников, цены ${nowYear} года.`,
		prod: [ 
			'Хлеб',
			'Батоны',
			'Пирожные'
		]
	};
	
	// Отсылаем главную
	res.render('index.hbs', data);
});

app.get('/contacts', (req, res) => {
	
	let data = {};
	data.title = 'Наши контакты';
	data.email = ["gavgav@mycorp.com", "mioaw@mycorp.com"];
	data.tel = '+7 (123) 456-78-90';
	
	res.render('contacts.hbs', data);
});

app.get('/pop_excurs', (req, res) => res.render('popular_excursions.hbs'));
app.get('/special_turs', (req, res) => res.render('special_turs.hbs'));
app.get('/next_trips', (req, res) => res.render('next_trips.hbs'));
app.get('/vine&adr', (req, res) => res.render('vine&adr.hbs'));
app.get('/feedbacks', (req, res) => res.render('feedbacks.hbs'));
app.get('/more_notes', (req, res) => res.render('more_notes.hbs'));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => res.render('404error.hbs'));

hbs.registerHelper('getDate', () => {
	
	let myDate = new Date();
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
	
    return `Текущее время: ${hour}:${minute}:${second}`;
	
});

hbs.registerHelper('getList', (list) => {

	let str = '';
	list.forEach( (e) => {
		str += `<li>${e}</li>`;
	});
	
	return new hbs.SafeString(`<ul>${str}</ul>`);
});

app.listen(appport, () => {
	console.log('==========[ Сервер запущен ]==========');
});

//// Определение обработчик для маршрута /
//app.use((req, res, next) => {
//	
//	var now = new Date();
//    var hour = now.getHours();
//    var minutes = now.getMinutes();
//    var seconds = now.getSeconds();
//	var data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`;
//	console.log(data);
//    fs.appendFile("server.log", data + "\n");;
//	next();
//});

//app.get('/user/:userid', (req, res) => {
//	res.send('Вы на странице пользователя ' + req.params['userid']);
//});
//
///* 
//	Определяем маршрут товаров
//	Начало
//*/
//var productRouter = express.Router();
//
//productRouter.route('/')
//  .get( (req, res) => {
//	res.send("Список товаров");
//  });
//
//productRouter.route('/:id')
//  .get( (req, res) => {
//	res.send(`Товар #${req.params['id']}`);
//  });
///* 
//	Определяем маршрут товаров
//	Конец
//*/
//
//// Используем маршрут
//app.use('/prod', productRouter);
//
//// Стандартный обработчик
//app.get('/', (req, res) => {
//	res.send('Главная страница');
//});

//определение IP
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return 'localhost';
}