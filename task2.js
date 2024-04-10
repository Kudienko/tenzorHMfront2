function task21(arr) {
  // Создаю массив объектов с их количеством вхождений в исходном массиве
  const groupedData = arr.reduce(function (acc, obj) {
    const key = `${obj.year}-${obj.month}`;
    if (!acc[key]) {
      acc[key] = { year: obj.year, month: obj.month, opsCount: 0 };
    }
    acc[key].opsCount++;
    return acc;
  }, {});
  // Оставляю только 3 самых больших opsCount
  const topMonths = Object.values(groupedData)
    .sort((a, b) => b.opsCount - a.opsCount)
    .slice(0, 3);
  return topMonths;
}

function task22(year, month, arr) {
  let monthBalance = 0;
  let monthWithdrawal = 0;
  let sumReplenishment = 0;
  let sumWithdrawal = 0;
  // Подсчитываю позначения по каждому объекту массива
  arr.forEach((item) => {
    if (item.year === year && item.month === month) {
      if (item.type === "replenishment") {
        sumReplenishment += item.amount;
      } else if (item.type === "withdrawal") {
        sumWithdrawal += item.amount;
      }
    }
  });

  monthBalance = sumReplenishment - sumWithdrawal;
  monthWithdrawal = sumWithdrawal;
  // Здесь округляю до десятитысячных
  withdrawalRate =
    Math.round((sumWithdrawal / sumReplenishment) * 10000) / 10000;
    // Проверяю месяц, если является цифрой, то конкатенирую с нулем
  date = `${year}-${String(month).length == 1 ? "0" + month : month}-31`;
  // Проверка статуса пользователя
  let rank = "";
  if (withdrawalRate < 0.15) {
    rank = "Золотой";
  } else if (withdrawalRate < 0.3) {
    rank = "Серебряный";
  } else {
    rank = "Бронзовый";
  }

  return { date, monthBalance, monthWithdrawal, withdrawalRate, rank };
}

function task23(arr) {
    // Убираю дубликаты обьектов
  newArr = arr.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.year === value.year && t.month === value.month)
  );
  result = [];
  // Прохожу по каждому месяцу, вызываю свою функцию и считаю totalBalance
  for (i = 0; i < newArr.length; i++) {
    obj = task22(newArr[i].year, newArr[i].month, arr);
    if (result.length > 0) {
      obj.totalBalance = obj.monthBalance + result[i - 1].totalBalance;
    } else {
      obj.totalBalance = obj.monthBalance;
    }
    result.push(obj);
  }
  return result;
}
