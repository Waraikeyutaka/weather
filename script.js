document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e1572047446f440bbae11258242709'; // ここにWeatherAPIのAPIキーを入力してください
    const city = 'Matsuyama';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&lang=ja`;
    

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecast = data.forecast.forecastday[0];
            const condition = forecast.day.condition;
            const weatherText = `今日の松山の天気</br> ${condition.text}, 最高気温 ${forecast.day.maxtemp_c}°C 最低気温 ${forecast.day.mintemp_c}°C 現在の気温 ${data.current.temp_c}°C`;
            

            // アイコンのURLを取得
            const iconUrl = `https:${condition.icon}`;

            // テキストとアイコンを表示
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML = `
                ${weatherText}
                <img src="${iconUrl}" alt="${condition.text}" />
            `;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weather').textContent = 'Unable to retrieve weather data.';
        });

        
});


