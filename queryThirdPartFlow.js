// 查询第三方资金流
// 设置卡号序列，必须要用【英文】单引号【'】或双引号【"】将每个账号包含在内，并且使用英文【", "】进行分隔，填写前确保有一个缩进
// 可以填写身份证号、银行卡号、微信、支付宝账号，函数会自动识别第三方账号并填入表单。不可瞎叽霸填！
var card_raw = [

]





// 设置每个账号查几行，最多4行：
var querylinenum = prompt("请输入每个账号查询几行（1行相当于3个月明细，以此类推）：", 4)
var card = []
for (let index = 0, card_id = 0; index < card_raw.length; index++) {
    card_raw[index] = card_raw[index].replace(" ", "").replace("\t", "");
    if ((!isNaN(Number((card_raw[index].replace("-", "")))) && card_raw[index].length >= 12) || (!isNaN(Number(card_raw[index].replace(/x/gi, ""))) && card_raw[index].length == 18)) {
        continue;
    }
    else {
        card[card_id] = card_raw[index];
        card_id++;
    }
}
// 设置此系列银行卡是第几次查询，如果是第1次查询且查询行数是4行，则相当于查近一年明细；如果查询次数是第2次，查询账号行数是2行，则相当于半年之前的半年明细。
var checknum = prompt("请输入向过去查询第几个" + 3 * querylinenum + "个月明细：")
// 创建查询日期数组
var timearray = new Array(querylinenum);
var dateval = new Date();
var transdate = dateval.Format("yyyy-MM-dd hh:mm:ss");
// 判定小时数是否在12点以内，不在12点以内无法查询当日明细
// if (dateval.getHours() <= 12) {
//     dateval.setDate(dateval.getDate() - 1)
// }
// 提前计算结束日期
dateval = new Date(dateval.setDate(dateval.getDate() - 83 * querylinenum * (checknum - 1)))
// 开始创建日期数组
for (let index = 0; index < querylinenum; index++) {
    timearray[index] = new Array(2);
    for (let second = timearray[index].length - 1; second >= 0; second--) {
        if (second == 0) {
            dateval = new Date(dateval.setDate(dateval.getDate() - 83))
        }
        timearray[index][second] = dateval.Format("yyyy-MM-dd hh:mm:ss");
    }
}
var addsfMx = document.querySelector("#ifTab_container_addsfMx").contentWindow
// 获取账号数量
var listlen = card.length
// 添加查询列
for (let index = 1; index < listlen * querylinenum; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addsfMx.document.querySelector("#sfMxQqEditForm > div:nth-child(13) > div.add_btn > i").click();
}
// 填写表单
for (let second = 0; second < listlen; second++) {
    for (let index = 0; index < querylinenum; index++) {
        addsfMx.document.querySelector("#bean_accnumber_" + (second * querylinenum + index)).value = card[second];
        if ((card[second].includes("tenpay") || card[second].includes("wxid_")) || (!card[second].includes("@") && isNaN(Number(card[second])))) {
            // value="Z00444000013"
            addsfMx.document.querySelector("#bean_payname_" + (second * querylinenum + index)).value = "财付通支付科技有限公司";
            addsfMx.document.querySelector("#bean_paycode_" + (second * querylinenum + index)).value = "Z00444000013"
        }
        else {
            // value="Z00133000019"
            addsfMx.document.querySelector("#bean_payname_" + (second * querylinenum + index)).value = "支付宝（中国）网络技术有限公司";
            addsfMx.document.querySelector("#bean_paycode_" + (second * querylinenum + index)).value = "Z00133000019"
        }
        addsfMx.document.querySelector("#sfMxQqEditForm > div:nth-child(13) > div:nth-child(" + (index + 1) + ") > div:nth-child(5) > div").className = "has-feedback form_controls success";
        addsfMx.document.querySelector("#bean_zzsj_" + (second * querylinenum + index)).value = transdate;
        addsfMx.document.querySelector("#bean_starttime_" + (second * querylinenum + index)).value = timearray[index % 4][0];
        addsfMx.document.querySelector("#bean_expiretime_" + (second * querylinenum + index)).value = timearray[index % 4][1];
    }
}