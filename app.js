document.getElementById("search-btn").addEventListener("click",async()=>{
    const date = document.getElementById("search-date").valie;
    if(!date) return alert("日付を選択してください");

    try{
        const response = await await axios.get(`/weather?date=${date}`);
        const data = response.data;

         // 以前の結果をクリアし、取得したデータを表示
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    if (data) {
      list.innerHTML += `
        <li class="list-group-item">
          <h5>${data.date}</h5>
          <p>${data.description}, 最高気温 ${data.max_temp}°C, 最低気温 ${data.min_temp}°C</p>
          <img src="${data.icon}" alt="天気アイコン">
        </li>`;
    }else{
        list.innerHTML = "<li classs='list-group-item'>データが見つかりませんでした</li>";
    }
    }catch(error){
        console.error("エラーが発生しました", error);
    alert("天気データの取得に失敗しました。");
    }


    app.get("/weather", async (req, res) => {
        const date = req.query.date;
        if (!date) return res.status(400).send("日付が指定されていません");
      
        try {
          const weatherData = await Weather.findOne({ date: date }); // MongoDBから該当日付のデータを検索
          if (weatherData) {
            res.json(weatherData);
          } else {
            res.status(404).send("データが見つかりませんでした");
          }
        } catch (error) {
          console.error("エラーが発生しました:", error);
          res.status(500).send("サーバーエラーが発生しました");
        }
      });
      
});