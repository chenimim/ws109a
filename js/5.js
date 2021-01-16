const Shop = {
    name: '云兮閣',
    address: '金門縣金寧鄉大學路 1 號',
    tel: '0987789312',
    items: {'川味火鍋': 300, '水餃1顆': 2, '肉粽': 35 ,'擔仔麵': 40,'北京烤鴨1隻': 250, '燒肉飯': 45, '春捲': 35 ,'臘肉飯': 60, '三先脫骨魚': 199, '東波肉': 95 ,'宮保雞丁': 80,'麻婆豆腐': 80, '龍井蝦仁': 150, '臘味合蒸': 100 ,'珍珠奶茶': 75, '龍井茶': 85 ,'蘋果醋': 60, '綜合水果汁': 70, '芒果飲': 70 ,'烏龍茶': 85 },
    addons: {'無': 0,'加辣': 0, '加量': 0, '加飯': 50, '加麵': 20 ,'加冬粉':20},
    orderCount: 0,
  }
  
  Shop.html = `
  <div>
    <button class="big" onclick="Pos.start()">新增訂單</button><br/><br/>
    <button class="big" onclick="Report.start()">本日報表</button><br/><br/>
    <button class="big" onclick="Setting.start()">商店設定</button><br/><br/>
  </div>
  `
  
  Shop.start = function () {
    Shop.init()
    Shop.name = localStorage.getItem('Shop.name') || Shop.name
    Shop.address = localStorage.getItem('Shop.address') || Shop.address
    Shop.tel = localStorage.getItem('Shop.tel') || Shop.tel
    Ui.id('menuShopName').innerHTML = Shop.name
    const itemsJson = localStorage.getItem('Shop.items')
    const addonsJson = localStorage.getItem('Shop.addons')
    if (itemsJson != null) Shop.items = JSON.parse(itemsJson)
    if (addonsJson != null) Shop.addons = JSON.parse(addonsJson)
    Ui.show(Shop.html)
  }
  
  Shop.init = function () {
    Shop.orderCount = localStorage.getItem('Pos.Order.count')
    if (Shop.orderCount == null) {
      Shop.orderCount = 0
      localStorage.setItem('Pos.Order.count', Shop.orderCount)
    }
  }
  
  Shop.incCount = function () {
    // let orderCount = parseInt(localStorage.getItem('Pos.Order.count')) + 1
    localStorage.setItem('Pos.Order.count', ++ Shop.orderCount)
  }
  
  Shop.saveOrder = function (Order) {
    localStorage.setItem('Pos.Order.' + Shop.orderCount, JSON.stringify(Order))
  }
  
  Shop.getOrder = function (i) {
    let orderJson = localStorage.getItem('Pos.Order.'+i)
    if (orderJson == null) return null
    return JSON.parse(orderJson)
  }