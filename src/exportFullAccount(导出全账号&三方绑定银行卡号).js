// 导出全账号，包括身份证号对应微信、支付宝账号，以及微信支付宝对应的银行卡账号。
// 只可填写标准身份证号、微信、支付宝账号，填写银行卡号会出现错误！！！
var card = [

]




// 设置脚本执行速度（执行时间:毫秒），一般速度越低执行越不稳定，建议在10以内
var sleeptime = 1



var queryType = confirm("选择表格类型:\n    [确定]: 受害人表格\n    [取消]: 嫌疑人表格")
var mainBody = "账户类型\t" + "账/卡号\t" + "主体名称\t" + "证照号码\t" + "联系手机\t" + "住宅地址\t" + "反馈说明\t" + "账户余额\t" + "绑定微信号\n"
// yaykShow.document为一级ifram
var yaykShow = document.querySelector("#ifTab_container_yaykShow").contentWindow;
var zcShowIframe = yaykShow.document.querySelector("#zcShowIframe").contentWindow;
var not_feedback_list = "";
var not_query_list = ""
var error_list = "";
var first = "";
if (queryType) {
    first = "0"
}
else {
    first = "1"
}
// 设置等待函数
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

(async function () {
    if (queryType) {
        if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
            // 受害人表格展开
            yaykShow.$("#addTable > div:nth-child(2) > div.fixed-table-pagination > div.pull-left.pagination-detail > span.page-list > span > ul > li:last > a").click()
            while (true) {
                if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                    console.log("Table0 load finished!")
                    break;
                }
                await sleep(sleeptime);
            }
        }
        else {
            while (true) {
                if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                    // 受害人表格展开
                    yaykShow.$("#addTable > div:nth-child(2) > div.fixed-table-pagination > div.pull-left.pagination-detail > span.page-list > span > ul > li:last > a").click()
                    while (true) {
                        if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                            console.log("Table0 load finished!")
                            break;
                        }
                        await sleep(sleeptime);
                    }
                    break;
                }
                await sleep(sleeptime);
            }
        }
    }
    else {
        if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
            // 一级卡表格展开
            yaykShow.$("#addTable > div:nth-child(5) > div.fixed-table-pagination > div.pull-left.pagination-detail > span.page-list > span > ul > li:last > a").click()
            while (true) {
                if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                    console.log("Table1 load finished!")
                    break;
                }
                await sleep(sleeptime);
            }
        }
        else {
            while (true) {
                if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                    // 一级卡表格展开
                    yaykShow.$("#addTable > div:nth-child(5) > div.fixed-table-pagination > div.pull-left.pagination-detail > span.page-list > span > ul > li:last > a").click()
                    while (true) {
                        if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                            console.log("Table1 load finished!")
                            break;
                        }
                        await sleep(sleeptime);
                    }
                    break;
                }
                await sleep(sleeptime);
            }
        }

    }
    // 遍历查询
    for (let index = 0; index < card.length; index++) {
        var index_local = index;
        for (let second = 1; second < yaykShow.document.querySelector("#zcGrid" + first).rows.length; second++) {
            var second_local = second;
            if (card[index_local] == yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(5)").innerHTML) {
                try {
                    if (card[index_local].length == 18 && !isNaN(Number(card[index_local].split(/x/gi, "")))) {
                        console.log("Exporting Account: " + card[index_local] + " is ID.\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                        // 点击全账号按钮
                        yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(3)").click();
                        while (true) {
                            if (zcShowIframe.document.querySelector("#sfQzhShow") != null) {
                                if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(8)") != null && zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(8)").innerHTML == card[index_local]) {
                                    break;
                                }
                                await sleep(sleeptime)
                            }
                            await sleep(sleeptime);
                        }
                        for (let third = 1; third <= zcShowIframe.$("body > div > ul > li").length; third++) {
                            // 点击全账号All
                            zcShowIframe.document.querySelector("body > div > ul > li:nth-child(" + third + ") > a").click();
                            // 点击后等待
                            while (true) {
                                // if (zcShowIframe.document.querySelector("#sfQzhShow") != null) {
                                if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > div") != null && zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("block")) {
                                    while (true) {
                                        if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > div") != null && zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                                            break;
                                        }
                                        await sleep(sleeptime)
                                    }
                                    break;
                                }
                                await sleep(sleeptime)
                                // }
                                // await sleep(sleeptime)
                            }
                            if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML.includes("财付通")) {
                                card_type = "财付通";
                            }
                            else {
                                card_type = "支付宝";
                            }
                            if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.includes("已反馈")) {
                                for (let fourth = 1; fourth < zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("#sfJgActGrid").rows.length; fourth++) {
                                    if (card_type == "财付通" && !isNaN(Number(zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("#sfJgActGrid > tbody > tr:nth-child(" + fourth + ") > td:nth-child(2)").innerHTML))) {
                                        continue
                                    }
                                    else {
                                        // 账户类型
                                        mainBody += (card_type + "\t");
                                        // 账/卡号
                                        mainBody += (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("#sfJgActGrid > tbody > tr:nth-child(" + fourth + ") > td:nth-child(2)").innerHTML + "\t\t");
                                        // 证照号码
                                        mainBody += (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(8)").innerHTML + "\t\t\t反馈成功\t\t")
                                        // 绑定微信号
                                        mainBody += (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("#sfJgActGrid > tbody > tr:nth-child(" + fourth + ") > td:nth-child(5)").innerHTML + "\n");
                                        // console.log("---line " + fourth + ": Succeed!---");
                                    }
                                }
                                console.log("---Step " + third + ": Succeed!---");
                            }
                            else if (zcShowIframe.document.querySelector("#sfQzhShow").contentWindow.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.includes("未反馈")) {
                                not_feedback_list += (card_type + "\t\t\t");
                                not_feedback_list += card[index_local] + "\t\t\t未反馈\n";
                                console.log("---Failed, No Feedback!---");
                            }
                            else {
                                error_list += (card_type + "\t\t\t");
                                error_list += (card[index_local] + "\t\t\t反馈失败\n");
                                console.log("---Failed, Response Failed!---.");
                            }
                        }
                    }
                    else if (isNaN(Number(card[index_local])) || (card[index_local].length == 11 && !isNaN(Number(card[index_local])))) {
                        console.log("Exporting Account: " + card[index_local] + " is Account.\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                        // 点击主体按钮
                        card_type = "银行卡";
                        yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(2)").click();
                        while (true) {
                            if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)") != null) {
                                if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML == card[index_local]) {
                                    break;
                                }
                                await sleep(sleeptime)
                            }
                            await sleep(sleeptime)
                        }
                        // 展开表格
                        while (true) {
                            // 等待银行卡div加载完成
                            if (zcShowIframe.document.querySelector("body > div:nth-child(4) > div.fixed-table-container > div.fixed-table-body > div") != null) {
                                // 等待银行卡明细加载完成
                                if (zcShowIframe.document.querySelector("body > div:nth-child(4) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                                    // 点击事件
                                    zcShowIframe.$("body > div:nth-child(4) > div.fixed-table-pagination > div.pull-left.pagination-detail > span.page-list > span > ul > li:last > a").click()
                                    // 等待银行卡明细加载完成
                                    while (true) {
                                        if (zcShowIframe.document.querySelector("body > div:nth-child(4) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                                            break;
                                        }
                                        await sleep(sleeptime)
                                    }
                                    break;
                                }
                                await sleep(sleeptime)
                            }
                            await sleep(sleeptime)
                        }
                        if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(6) > td:nth-child(2)").innerHTML.includes("已反馈") || zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(6) > td:nth-child(2)").innerHTML.includes("反馈失败")) {
                            if (!zcShowIframe.document.querySelector("#sfJgCardGrid > tbody > tr > td").innerHTML.includes("没有找到匹配的记录")) {
                                console.log("开始读明细")
                                for (let third = 1; third < zcShowIframe.document.querySelector("#sfJgCardGrid").rows.length; third++) {
                                    mainBody += (card_type + ":" + zcShowIframe.document.querySelector("#sfJgCardGrid > tbody > tr:nth-child(" + third + ") > td:nth-child(2)").innerHTML + "\t")
                                    mainBody += (zcShowIframe.document.querySelector("#sfJgCardGrid > tbody > tr:nth-child(" + third + ") > td:nth-child(3)").innerHTML + "\t")
                                    // 主体名称
                                    mainBody += (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)").innerHTML + "\t")
                                    // 证照号码
                                    mainBody += (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(4)").innerHTML + "\n")
                                }
                            }
                        }
                        else {
                            not_feedback_list += ("银行卡\t");
                            not_feedback_list += card[index_local] + "\t\t\t\t\t未反馈\n";
                            console.log("---Failed, No Feedback!---");
                        }
                    }
                    else {
                        console.log("---" + card[index_local] + "可能是银行卡---")
                    }
                } catch (error) {
                    if (card_type.includes("银行卡")) {
                        error_list += (card_type + "\t");
                        error_list += (card[index_local] + "\t\t\t\t\t反馈错误\n");
                    }
                    else {
                        error_list += card_type + "\t\t\t";
                        error_list += (card[index_local] + "\t\t\t反馈错误\n");
                    }
                    console.log("Failed: " + card[index_local])
                }
                break;
            }
            else if (second == yaykShow.document.querySelector("#zcGrid" + first).rows.length - 1) {
                mainBody += "\t" + card[index_local] + "\t\t\t\t\t未查询\n";
                not_query_list += card[index_local] + "\n";
                console.log("---Failed, No Query!---");
            }
        }
    }
    console.clear();
    console.log("---Export Finished!---");
    console.log(mainBody + not_feedback_list + error_list);
    if (not_feedback_list.length > 0) {
        console.log("未反馈或导出失败账号：\n" + not_feedback_list);
    }
    if (error_list.length > 0) {
        console.log("出错账号：\n" + error_list);
    }
})()