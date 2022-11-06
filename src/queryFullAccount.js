// 查询第三方资金流
// 设置卡号序列，必须要用【英文】单引号【'】或双引号【"】将每个账号包含在内，并且使用英文【", "】进行分隔，填写前确保有一个缩进
// 只可填写身份证号和姓名，一一对应！
var card = [

]
var personalname = [

]





// 创建查询日期数组
var dateval = new Date();
var transdatetime = dateval.Format("yyyy-MM-dd hh:mm:ss");


var addsfQzh = document.querySelector("#ifTab_container_addsfQzh").contentWindow
// 添加查询列
for (let index = 1; index < card.length * 2; index++) {
    // 单引号内为该元素对应的Selector值，可以直接复制
    addsfQzh.document.querySelector("#sfQzhQqEditForm > div:nth-child(11) > div.add_btn > i").click();
}
// 填写表单
for (let index = 0; index < card.length; index++) {
    for (let second = 0; second <= 1; second++) {
        // 显示姓名
        addsfQzh.document.querySelector("#div_accountype_" + (2 * index + second)).className = "form-group";
        // 账号
        addsfQzh.document.querySelector("#bean_accnumber_" + (2 * index + second)).value = card[index];
        // 账号类型
        addsfQzh.document.querySelector("#bean_acctype_" + (2 * index + second)).value = "02";
        addsfQzh.document.querySelector("#bean_acctypeName_" + (2 * index + second)).value = "身份证号";

        // 三方机构
        if (second == 0) {
            addsfQzh.document.querySelector("#bean_payname_" + (2 * index + second)).value = "支付宝（中国）网络技术有限公司";
            addsfQzh.document.querySelector("#bean_paycode_" + (2 * index + second)).value = "Z00133000019"
        }
        else {
            addsfQzh.document.querySelector("#bean_payname_" + (2 * index + second)).value = "财付通支付科技有限公司";
            addsfQzh.document.querySelector("#bean_paycode_" + (2 * index + second)).value = "Z00444000013"
        }
        addsfQzh.document.querySelector("#sfQzhQqEditForm > div:nth-child(11) > div:nth-child(" + (2 * index + second + 1) + ") > div:nth-child(4) > div").className = "has-feedback form_controls success"

        // 姓名
        addsfQzh.document.querySelector("#bean_accountname_" + (2 * index + second)).value = personalname[index]

        // 转账时间
        addsfQzh.document.querySelector("#bean_zzsj_" + (2 * index + second)).value = transdatetime
        addsfQzh.document.querySelector("#sfQzhQqEditForm > div:nth-child(11) > div:nth-child(" + (2 * index + second + 1) + ") > div:nth-child(7) > div").className = "form_controls success"

    }
}