// 查询银行卡明细和主体
// 设置卡号序列，必须要用【英文】单引号或双引号将每个账号包含在内，并且使用英文【", "】进行分隔
// 可以填写银行卡、支付宝、微信，函数会筛选银行卡并填入表单中。不可填写身份证号！否则函数处理会出错！！！
var card_raw = [

]





// 设置每个账号查几行：
var querrylinenum = prompt("请输入每个账号查询几行（1行相当于3个月明细，以此类推）：", 4)

var card = []
for (let index = 0, card_id = 0; index < card_raw.length; index++) {
    card_raw[index] = card_raw[index].replace(" ", "").replace("\t", "")
    if ((card_raw[index].length == 12 || (card_raw[index].length <= 19 && card_raw[index].length >= 16)) && !isNaN(Number(card_raw[index]))) {
        card[card_id] = card_raw[index];
        card_id++;
    }
    else {
        continue;
    }
}
// 设置此系列银行卡是第几次查询
var checknum = prompt("请输入向过去查询第几个" + 3 * querrylinenum + "个月明细：")
// 创建查询日期数组
var timearray = new Array(querrylinenum);
var dateval = new Date();
var transdate = dateval.Format("yyyy-MM-dd hh:mm:ss");
// 判定小时数是否在12点以内，不在12点以内无法查询当日明细
// if (dateval.getHours() <= 12) {
//     dateval.setDate(dateval.getDate() - 1)
// }
// 提前计算结束日期
dateval = new Date(dateval.setDate(dateval.getDate() - 83 * querrylinenum * (checknum - 1)))
// 开始创建日期数组
for (let index = 0; index < querrylinenum; index++) {
    timearray[index] = new Array(2);
    for (let second = timearray[index].length - 1; second >= 0; second--) {
        if (second == 0) {
            dateval = new Date(dateval.setDate(dateval.getDate() - 83))
        }
        timearray[index][second] = dateval.Format("yyyy-MM-dd hh:mm:ss");
    }
}


// 获取账号数量
var listlen = card.length
var addyhkMx = document.querySelector("#ifTab_container_addyhkMx").contentWindow
// 添加查询列
for (let index = 1; index < listlen * querrylinenum; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addyhkMx.document.querySelector("#yhkMxQqEditForm > div:nth-child(10) > div.add_btn > i").click();
}
// 填写表单
for (let second = 0; second < listlen; second++) {
    for (let index = 0; index < querrylinenum; index++) {
        addyhkMx.document.querySelector("#bean_zh_" + (second * querrylinenum + index)).value = card[second];
        addyhkMx.document.querySelector("#yhkMxQqEditForm > div:nth-child(10) > div:nth-child(" + (second * querrylinenum + index + 1) + ") > div:nth-child(6) > div").className = "form_controls success";
        addyhkMx.getBank(addyhkMx.document.querySelector("#bean_zh_" + (second * querrylinenum + index)));
        addyhkMx.document.querySelector("#bean_zzsj_" + (second * querrylinenum + index)).value = transdate;
        addyhkMx.document.querySelector("#bean_startDate_" + (second * querrylinenum + index)).value = timearray[index % 4][0];
        addyhkMx.document.querySelector("#bean_endDate_" + (second * querrylinenum + index)).value = timearray[index % 4][1];
    }
}