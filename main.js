const temp = document.querySelector('[data-temp="degrees"]');
const cRadio = document.querySelector('[data-temp="c"]');
const fRadio = document.querySelector('[data-temp="f"]');
const tempMin = document.querySelector('[data-temp="min"]');
const tempMax = document.querySelector('[data-temp="max"]');

let tempPrefCookies = document.cookie.split('; ');

let tempPrefLocal = localStorage.getItem('temp');

cookiesI = tempPrefCookies.findIndex(function(element) {
    return element.includes('temp');
});

tempPrefCookies = tempPrefCookies[cookiesI].split('=')[1];

if (tempPrefCookies === 'fahr' && tempPrefLocal === 'fahr') {

    cRadio.checked = false;
    fRadio.checked = true;

} else {

    cRadio.checked = true;
    fRadio.checked = false;

}

fetch('https://api.openweathermap.org/data/2.5/weather?q=Brasov,Ro&appid=c7da641777760054e5ca6164eb47580a')
.then(resUn => resUn.json()).then(function(res) {

    if (document.querySelector('[data-temp="c"]').checked) {
        
        temp.innerHTML = `${(res.main.temp - 273.15).toFixed(2)} &#8451`;
        tempMin.innerHTML = `${(res.main.temp_min - 273.15).toFixed(2)} &#8451`;
        tempMax.innerHTML = `${(res.main.temp_max - 273.15).toFixed(2)} &#8451`;
        
    } else {
        
        temp.innerHTML = `${(((res.main.temp * 9) / 5) - 459.67).toFixed(2)} &#8457;`;
        tempMin.innerHTML = `${(((res.main.temp_min * 9) / 5) - 459.67).toFixed(2)} &#8457;`;
        tempMax.innerHTML = `${(((res.main.temp_max * 9) / 5) - 459.67).toFixed(2)} &#8457;`;
        
    }

    cRadio.addEventListener('change', function() {

        localStorage.setItem('temp', 'cels');
        document.cookie = "temp=cels; expires=22 Dec 2020 00:00:00 UTC";
        temp.innerHTML = `${(((Number(temp.innerHTML.substring(0, 5)) - 32) * 5) / 9).toFixed(2)} &#8451;`;
        tempMin.innerHTML = `${(((Number(tempMin.innerHTML.substring(0, 5)) - 32) * 5) / 9).toFixed(2)} &#8451;`;
        tempMax.innerHTML = `${(((Number(tempMax.innerHTML.substring(0, 5)) - 32) * 5) / 9).toFixed(2)} &#8451;`;

    });

    fRadio.addEventListener('change', function() {

        localStorage.setItem('temp', 'fahr');
        document.cookie = "temp=fahr; expires=22 Dec 2020 00:00:00 UTC";
        temp.innerHTML = `${(((Number(temp.innerHTML.substring(0, 5)) * 9) / 5) + 32).toFixed(2)} &#8457;`;
        tempMin.innerHTML = `${(((Number(tempMin.innerHTML.substring(0, 5)) * 9) / 5) + 32).toFixed(2)} &#8457;`;
        tempMax.innerHTML = `${(((Number(tempMax.innerHTML.substring(0, 5)) * 9) / 5) + 32).toFixed(2)} &#8457;`;

    });

    
});