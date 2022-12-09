// 导出银行卡、微信、支付宝的主体和明细
// 只可填写标准银行卡、微信、支付宝账号，不可填写身份证号，难以判定身份证号和银行卡区别！！！
var card = [

]




// 设置脚本执行速度（执行时间：毫秒），一般速度越低执行越不稳定，建议在10以内
var sleeptime = 1    //ms
var waitExecFrequency = 300    //等待轮询次数

var queryType = confirm("选择表格类型:\n    [确定]: 受害人表格\n    [取消]: 嫌疑人表格")
var exportTypes = confirm("选择导出类型:\n    [确定]: 导出明细\n    [取消]: 导出主体")
var isLimitLoops = confirm("轮询限制:\n    [确定]: 限制轮训\n    [取消]: 不限制轮询")
var mainBody = "账户类型\t" + "账/卡号\t" + "主体名称\t" + "证照号码\t" + "联系手机\t" + "住宅地址\t" + "反馈说明\t" + "账户余额\n"
// yaykShow.document为一级ifram
var yaykShow = document.querySelector("#ifTab_container_yaykShow").contentWindow;
var zcShowIframe = yaykShow.document.querySelector("#zcShowIframe").contentWindow;
var not_feedback_list = "";
var not_query_list = "";
var error_list = "";
var first = "";
var card_type = "";
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
    if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container") != null) {
        while (true) {
            if (yaykShow.document.querySelector("#addTable > div:nth-child(2) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                console.log("Table0 load finished!")
                break;
            }
            await sleep(0.3)
        }
    }
    if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container") != null) {
        while (true) {
            if (yaykShow.document.querySelector("#addTable > div:nth-child(5) > div.fixed-table-container > div.fixed-table-body > div").style.display.includes("none")) {
                console.log("Table1 load finished!")
                break;
            }
            await sleep(0.3)
        }
    }
    // 导明细
    if (exportTypes) {
        // 遍历卡号
        for (let index = 0; index < card.length; index++) {
            var index_local = index;
            // 遍历受害人卡和一级卡
            for (let second = 1; second < yaykShow.document.querySelector("#zcGrid" + first).rows.length; second++) {
                var second_local = second;
                if (card[index_local] == yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(5)").innerHTML) {
                    try {
                        if ((card[index_local].length == 12 || (card[index_local].length <= 19 && card[index_local].length >= 16)) && !isNaN(Number(card[index_local]))) {
                            console.log("Exporting Account: " + card[index_local] + ".\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                            // 点击明细按钮
                            yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(1)").click();
                            for (let index = 1; true;) {
                                if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("#toolbar > i") != null || index >= waitExecFrequency) {
                                    break;
                                }
                                if (isLimitLoops) {
                                    index++
                                }
                                await sleep(sleeptime)
                            }
                            if (!zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.includes("未反馈")) {
                                // 使用原作者代码
                                var bankLink = "http://68.89.99.55/znzf/yhkMxJgLst/excel?bankcode=" + zcShowIframe.document.querySelector("#bankcode").value + "&cardnumber=" + zcShowIframe.document.querySelector("#cardnumber").value + "&jysj_begin=" + zcShowIframe.document.querySelector("#inquiryperiodstart").value + "&jysj_end=" + zcShowIframe.document.querySelector("#inquiryperiodend").value;
                                window.open(bankLink);
                                console.log("---Succeed!---");
                            }
                            else {
                                not_feedback_list += (card[index_local] + "\n");
                                console.log("---Failed, No Feedback!---");
                            }
                        }
                        else {
                            console.log("Exporting Account: " + card[index_local] + ".\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                            // 点击明细按钮
                            yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(1)").click();
                            for (let index = 1; true;) {
                                if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("#toolbar > i") != null || index >= waitExecFrequency) {
                                    break;
                                }
                                if (isLimitLoops) {
                                    index++;
                                }
                                await sleep(sleeptime)
                            }
                            if (!zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.includes("未反馈")) {
                                var thirdPartLink = "/znzf/sfMxJgLst/excel?paycode=" + zcShowIframe.document.querySelector("#paycode").value + "&accnumber=" + zcShowIframe.document.querySelector("#accnumber").value + "&jysj_begin=" + zcShowIframe.document.querySelector("#starttime").value + "&jysj_end=" + zcShowIframe.document.querySelector("#expiretime").value;
                                window.open(thirdPartLink);
                                console.log("---Succeed!---");
                            }
                            else {
                                not_feedback_list += (card[index_local] + "\n");
                                console.log("---Failed, No Feedback!---");
                            }
                        }
                    } catch (error) {
                        error_list += card[index_local] + "\n";
                    }
                    break;
                }
                else if (second == yaykShow.document.querySelector("#zcGrid" + first).rows.length - 1) {
                    not_query_list += card[index_local] + "\n";
                }
            }
        }
        console.clear();
        console.log("---Export Finished!---");
        if (not_feedback_list.length > 0) {
            console.log("未反馈账号：\n" + not_feedback_list);
        }
        if (error_list.length > 0) {
            console.log("出错账号：\n" + error_list);
        }
    }



    else {
        // 导主体
        for (let index = 0; index < card.length; index++) {
            var index_local = index;
            for (let second = 1; second < yaykShow.document.querySelector("#zcGrid" + first).rows.length; second++) {
                var second_local = second;
                if (card[index_local] == yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(5)").innerHTML) {
                    try {
                        if ((card[index_local].length == 12 || (card[index_local].length <= 19 && card[index_local].length >= 16)) && !isNaN(Number(card[index_local]))) {
                            console.log("Exporting Account: " + card[index_local] + ".\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                            // 点击主体按钮
                            yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(2)").click();
                            while (true) {
                                if (zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(5) > td:nth-child(4)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(5) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(6) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(9) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(13) > td:nth-child(2)") != null) {
                                    break;
                                }
                                await sleep(sleeptime)
                            }
                            card_type = "银行卡"
                            if (zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(13) > td:nth-child(2)").innerHTML.includes("已反馈") || zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(13) > td:nth-child(2)").innerHTML.includes("失败反馈")) {
                                mainBody += card_type + ":" + zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML + "\t";
                                // 账/卡号
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML + "\t";
                                // 主体名称
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(1) > td:nth-child(6)").innerHTML + "\t";
                                // 证照号码
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(5) > td:nth-child(4)").innerHTML + "\t";
                                // 联系手机
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(5) > td:nth-child(6)").innerHTML + "\t";
                                // 住宅地址
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(6) > td:nth-child(2)").innerHTML + "\t";
                                // 反馈说明
                                mainBody += zcShowIframe.document.querySelector("body > div > div > table > tbody > tr:nth-child(9) > td:nth-child(6)").innerHTML.replace("\n", "") + "\t";
                                console.log("---Step 1: Succeed!---");
                                // 点击明细按钮
                                try {
                                    yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(1)").click();
                                    for (let index = 1; true;) {
                                        if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(9) > td:nth-child(4)") != null || index >= waitExecFrequency) {
                                            break;
                                        }
                                        if (isLimitLoops) {
                                            index++
                                        }
                                        await sleep(sleeptime)
                                    }
                                    // 账户余额
                                    mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(9) > td:nth-child(4)").innerHTML + "\n";
                                    console.log("---Step 2: Succeed!---");
                                } catch (error) {
                                    mainBody += "\n"
                                    console.log("---Step 2: Error!---");
                                }
                            }
                            else {
                                mainBody += card_type + "\t" + card[index_local] + "\t\t\t\t\t未反馈\n"
                                not_feedback_list += (card[index_local] + "\n");
                                console.log("---Failed, No Feedback!---");
                            }
                        }
                        else {
                            // 获取主体内容
                            console.log("Exporting Account: " + card[index_local] + ".\nExport: The " + index + " account in " + second_local + " line,\nTotal: " + card.length + ".")
                            // 点击主体按钮
                            yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(2)").click();
                            while (true) {
                                if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(4)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(6) > td:nth-child(2)") != null) {
                                    break;
                                }
                                await sleep(sleeptime);
                            }
                            if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(6) > td:nth-child(2)").innerHTML.includes("已反馈") || zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(6) > td:nth-child(2)").innerHTML.includes("失败反馈")) {
                                if ((card[index_local].includes("tenpay") || card[index_local].includes("wxid_")) || (!card[index_local].includes("@") && isNaN(Number(card[index_local])))) {
                                    card_type = "财付通";
                                }
                                else {
                                    card_type = "支付宝";
                                }
                                mainBody += card_type + "\t"
                                // 账/卡号
                                mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(4)").innerHTML + "\t";
                                // 主体名称
                                mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(1) > td:nth-child(6)").innerHTML + "\t";
                                // 证照号码
                                mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(4)").innerHTML + "\t";
                                // 联系手机
                                mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(6)").innerHTML + "\t\t";
                                console.log("---Step 1: Succeed!---");
                                // 点击明细按钮
                                try {
                                    yaykShow.document.querySelector("#zcGrid" + first + " > tbody > tr:nth-child(" + second_local + ") > td:nth-child(7) > span:nth-child(1)").click();
                                    for (let index = 1; true;) {
                                        if (zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(2)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerHTML == card[index_local] && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(8) > td:nth-child(6)") != null && zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(7) > td:nth-child(2)") != null || index >= waitExecFrequency) {
                                            break;
                                        }
                                        if (isLimitLoops) {
                                            index++
                                        }
                                        await sleep(sleeptime)
                                    }
                                    // 反馈说明
                                    mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(8) > td:nth-child(6)").innerHTML + "\t";
                                    // 账户余额
                                    mainBody += zcShowIframe.document.querySelector("body > div.banner_box > div > table > tbody > tr:nth-child(7) > td:nth-child(2)").innerHTML + "\n";
                                    console.log("---Step 2: Succeed!---");
                                } catch (error) {
                                    mainBody += "\n";
                                    console.log("---Step 2: Error!---");
                                }
                            }
                            else {
                                mainBody += card_type + "\t" + card[index_local] + "\t\t\t\t\t未反馈\n";
                                not_feedback_list += (card[index_local] + "\n");
                                console.log("---Failed, No Feedback!---");
                            }
                        }
                    } catch (error) {
                        mainBody += card_type + "\t" + card[index_local] + "\t\t\t\t\t错误反馈\n";
                        error_list += card[index_local] + "\n";
                        console.log("Error: " + card[index_local]);
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
        console.log(mainBody);
        if (not_feedback_list.length > 0) {
            console.log("未反馈账号：\n" + not_feedback_list);
        }
        if (error_list.length > 0) {
            console.log("出错账号：\n" + error_list);
        }
        if (not_query_list.length > 0) {
            console.log("未查询账号:\n" + not_query_list);
        }
    }
})()
