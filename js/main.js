// script.js
function updateClock() {
    var now = new Date(); // 獲取當前時間
    var hours = now.getHours(); // 小時
    var minutes = now.getMinutes(); // 分鐘
    var seconds = now.getSeconds(); // 秒
  
    // 格式化時間顯示，如 01:05:09
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    var timeString = hours + ':' + minutes + ':' + seconds;
  
    // 將格式化後的時間顯示在 #clock 元素中
    document.getElementById('clock').textContent = timeString;
  
    // 每秒更新時間
    setTimeout(updateClock, 1000);
  }
  
  updateClock(); // 初始調用函數
  