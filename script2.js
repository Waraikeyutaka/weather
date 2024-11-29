document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e1572047446f440bbae11258242709'; // ここにWeatherAPIのAPIキーを入力してください
    const city = 'Matsuyama';
    const daysToFetch = 7; // 過去1週間分の日数
    const baseUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&lang=ja`; // 言語を日本語に設定

    // 今日の日付を取得
    const today = new Date();

    // 過去1週間の天気を取得する関数
    const fetchWeatherForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換
        const url = `${baseUrl}&dt=${formattedDate}`;

        // 天気データを取得
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const forecast = data.forecast.forecastday[0];
                const condition = forecast.day.condition;

                // 天気データのフォーマット
                return {
                    date: formattedDate,
                    weatherText: `${condition.text}, 最高気温 ${forecast.day.maxtemp_c}°C, 最低気温 ${forecast.day.mintemp_c}°C`,
                    icon: `https:${condition.icon}` // アイコンのURL
                };
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                return {
                    date: formattedDate,
                    weatherText: '天気データを取得できませんでした',
                    icon: '' // アイコンなし
                };
            });
    };

    // 過去1週間の天気を取得して表示する関数
    const fetchWeatherForWeek = async () => {
        const weatherContainer = document.getElementById('weather');
        let weatherContent = ''; // 表示するHTMLを蓄積

        for (let i = 0; i < daysToFetch; i++) {
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() - i); // 1日ずつ過去の日付に

            const weatherData = await fetchWeatherForDate(targetDate); // 天気データを取得

            // 天気情報をHTMLとして追加
            weatherContent += `
                <div>
                    <h5>${weatherData.date}</h5>
                    <p>${weatherData.weatherText}</p>
                    ${weatherData.icon ? `<img src="${weatherData.icon}" alt="${weatherData.weatherText}">` : ''}
                </div>
                <hr>
            `;
        }

        weatherContainer.innerHTML = weatherContent; // 全ての天気データをHTMLに反映
    };

    // 関数を実行
    fetchWeatherForWeek();
});
