const api = {
    key: "a0ec7b6caf739133c4572144359ae3dd",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", () => {
    const query = searchbox.value;
    getResults(query);
});

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric&lang=tr`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);

    let img = document.querySelector(".icon");
    img.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let description = document.querySelector(".description");
    description.innerText = weather.weather[0].description;

    let button = document.querySelector(".button");
    button.style.display="inline-block"
    button.innerText="DETAYLI BİLGİ"
    button.href=`https://www.google.com/search?q=${weather.name}+hava+durumu`
}

function dateBuilder(d) {
    let months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ];
    let days = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${date} ${month} ${day}`;
}
// design by Mikail Enes Kaya
function konumAl(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric&lang=tr`)
        .then((weather) => {
            return weather.json();
        })
        .then((weatherData) => {
            searchbox.value = `${weatherData.name}, ${weatherData.sys.country}`;
            displayResults(weatherData);
        });
}

function konumHata() {
    alert("Konum alınamadı. Arama kutusunu kullanarak hava durumunun öğrenebilirsiniz.");
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(konumAl, konumHata);
}