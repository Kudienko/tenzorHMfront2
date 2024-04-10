function task21(arr) {
  const groupedData = arr.reduce(function (acc, obj) {
    const key = `${obj.year}-${obj.month}`;
    if (!acc[key]) {
      acc[key] = { year: obj.year, month: obj.month, opsCount: 0 };
    }
    acc[key].opsCount++;
    return acc;
  }, {});

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
  withdrawalRate =
    Math.round((sumWithdrawal / sumReplenishment) * 10000) / 10000;
  date = `${year}-${String(month).length == 1 ? "0" + month : month}-31`;

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
  newArr = arr.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.year === value.year && t.month === value.month)
  );
  console.log(newArr);
  result = [];
  for (i = 0; i < newArr.length; i++) {
    obj = task22(newArr[i].year, newArr[i].month, arr);
    if (result.length > 0) {
      obj.totalBalance = obj.monthBalance + result[i - 1].totalBalance;
    } else {
      obj.totalBalance = obj.monthBalance;
    }
    result.push(obj);
  }
  console.log(result)
}
