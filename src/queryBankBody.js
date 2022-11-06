// 查询银行卡主体
// 设置卡号序列，必须要用【英文】单引号或双引号将每个账号包含在内，并且使用英文【", "】进行分隔
// 可以填写银行卡、支付宝、微信，函数会筛选银行卡并填入表单中。不可填写身份证号！否则函数处理会出错！！！
var card_raw = [

]





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


var addyhkMx = document.querySelector("#ifTab_container_addyhkZt").contentWindow
// 添加查询列
for (let index = 1; index < card.length; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addyhkMx.document.querySelector("#yhkZtQqEditForm > div:nth-child(7) > div.add_btn > i").click();
}
// 填写表单
for (let second = 0; second < card.length; second++) {
    addyhkMx.document.querySelector("#bean_zh_" + second).value = card[second];
    addyhkMx.document.querySelector("#yhkZtQqEditForm > div:nth-child(7) > div:nth-child(" + (second + 1) + ") > div:nth-child(4) > div").className = "form_controls success";
    addyhkMx.getBank(addyhkMx.document.querySelector("#bean_zh_" + (second)));
}