// 查询第三方主体
// 设置卡号序列，必须要用【英文】单引号【"】或双引号【"】将每个账号包含在内，并且使用英文【", "】进行分隔，填写前确保有一个缩进
// 可以填写身份证号、银行卡号、微信、支付宝账号，函数会自动识别第三方账号并填入表单。不可瞎叽霸填！！！
var card_raw = [

]





var card = []
var card_check_failed = ""
for (let index = 0, card_id = 0; index < card_raw.length; index++) {
    card_raw[index] = card_raw[index].replace(" ", "").replace("\t", "");
    if ((!isNaN(Number((card_raw[index].replace("-", "")))) && card_raw[index].length >= 12) || (!isNaN(Number(card_raw[index].replace(/x/gi, ""))) && card_raw[index].length == 18)) {
        card_check_failed += card_raw[index] + "\n";
        continue;
    }
    else {
        card[card_id] = card_raw[index];
        card_id++;
    }
}
if (card_check_failed.length > 0) {
    console.log("无法使用第三方查询的账号：\n" + card_check_failed + "请自主检查该账号列表")
}
// 创建查询日期数组
// var timearray = new Array(querylinenum);
var dateval = new Date();
var transdate = dateval.Format("yyyy-MM-dd hh:mm:ss");

// 获取账号数量
var listlen = card.length
// 添加查询列
var addsfZt = document.querySelector("#ifTab_container_addsfZt").contentWindow
for (let index = 1; index < listlen; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addsfZt.document.querySelector("#sfZtQqEditForm > div:nth-child(10) > div.add_btn > i").click();
}
// 填写表单
for (let second = 0; second < listlen; second++) {
    addsfZt.document.querySelector("#bean_accnumber_" + second).value = (card[second]);
        if ((card[second].includes("tenpay") || card[second].includes("wxid_")) || (!card[second].includes("@") && isNaN(Number(card[second])))) {
            // value="Z00444000013"
            addsfZt.document.querySelector("#bean_payname_" + second).value = "财付通支付科技有限公司";
            addsfZt.document.querySelector("#bean_paycode_" + second).value = "Z00444000013"
        }
        else {
            // value="Z00133000019"
            addsfZt.document.querySelector("#bean_payname_" + second).value = "支付宝（中国）网络技术有限公司";
            addsfZt.document.querySelector("#bean_paycode_" + second).value = "Z00133000019"
        }
        addsfZt.document.querySelector("#sfZtQqEditForm > div:nth-child(10) > div:nth-child(" + (second + 1) + ") > div:nth-child(5) > div").className = "has-feedback form_controls success";
        addsfZt.document.querySelector("#bean_zzsj_" + second).value = transdate;
}