// 建筑选项数组
const buildings = ["货仓", "瞭望塔", "工厂", "教堂", "市集", "宿舍", "银行", "大会堂", "修道院"];

window.onload = function () {
  // 随机生成骰子点数并显示
  const dieElements = document.querySelectorAll('.die');
  dieElements.forEach(die => {
    const randomNum = Math.floor(Math.random() * 6) + 1; // 1-6 随机数
    die.textContent = randomNum;
    die.style.display = 'flex'; // 显示骰子
  });

  // 为每个六边形绑定点击事件，弹出选择建筑的对话框
  const hexElements = document.querySelectorAll('.hex');
  hexElements.forEach(hex => {
    hex.addEventListener('click', function () {
      const buildingDiv = this.querySelector('.building');
      const selectedBuilding = prompt('请选择建筑：\n' + buildings.join('\n'));
      if (buildings.includes(selectedBuilding)) {
        buildingDiv.textContent = selectedBuilding;
      } else {
        alert('请选择正确的建筑选项！');
      }
    });
  });
};
