// 查询第三方流水号
// 设置卡号序列，必须要用【英文】单引号【'】或双引号【"】将每个账号包含在内，并且使用英文【", "】进行分隔，填写前确保有一个缩进
var card = [

]





var dateval = new Date();
var transdatetime = dateval.Format("yyyy-MM-dd hh:mm:ss");
var transdate = dateval.Format("yyyy-MM-dd");
// 获取账号数量
var listlen = card.length
// 添加查询列
var addsfLs = document.querySelector("#ifTab_container_addsfLs").contentWindow
for (let index = 1; index < listlen; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addsfLs.document.querySelector("#sfLsQqEditForm > div:nth-child(14) > div.add_btn > i").click();
}
// 填写表单
for (let second = 0; second < listlen; second++) {
    // 账号类型
    addsfLs.document.querySelector("#bean_accName_" + second).value = "支付机构订单号";
    addsfLs.document.querySelector("#sfLsQqEditForm > div:nth-child(14) > div:nth-child(" + (second + 1) + ") > div:nth-child(1) > div").className = "has-feedback form_controls success";
    addsfLs.document.querySelector("#bean_acctype_" + second).value = "A2"

    // 账号
    addsfLs.document.querySelector("#bean_accnumber_" + second).value =  card[second]
    // $('#bean_accnumber_' + second).val(card[second]);
    // addsfLs.querySelector("#bean_accnumber_0").data-status("1");
    addsfLs.document.querySelector("#sfLsQqEditForm > div:nth-child(14) > div:nth-child(" + (second + 1) + ") > div:nth-child(4) > div").className = "form_controls success"
    
    // 支付机构
    if (card[second].indexOf("420000") != -1) {
        addsfLs.document.querySelector("#bean_payname_" + second).value = "财付通支付科技有限公司";
        addsfLs.document.querySelector("#bean_paycode_" + second).value = "Z00444000013";
        addsfLs.document.querySelector("#sfLsQqEditForm > div:nth-child(14) > div:nth-child(" + (second + 1) + ") > div:nth-child(5) > div").className = "has-feedback form_controls success"
    }
    else {
        addsfLs.document.querySelector("#bean_payname_" + second).value = "支付宝（中国）网络技术有限公司";
        addsfLs.document.querySelector("#bean_paycode_" + second).value = "Z00133000019";
        addsfLs.document.querySelector("#sfLsQqEditForm > div:nth-child(14) > div:nth-child(" + (second + 1) + ") > div:nth-child(5) > div").className = "has-feedback form_controls success"
    }
    // 交易时间
    addsfLs.document.querySelector("#bean_trandate_" + second).value = transdate
    addsfLs.document.querySelector("#bean_zzsj_"+ second).value = transdatetime
}