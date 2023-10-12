// ==UserScript==
// @name         AIAS
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Aihelp QA assistant tool
// @author       reizhi
// @match        https://aihelpcn.net/*
// @require      https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js
// ==/UserScript==

const observer = new MutationObserver((changes) => {
    if ($("#app").length && $("#ccdiv").length == 0) {
      main();
    }
  
    if (
      $(".marginT10").length == 2 &&
      $(".marginT10").eq(1).find(".box") &&
      changes[0]["addedNodes"].length
    )
      if (changes[0]["addedNodes"][0]["className"] == "box") {
        $(".marginT10").eq(1).find(".box").off("click");
        $(".marginT10")
          .eq(1)
          .find(".box")
          .on("click", function () {
            $("#counter").val(parseInt($("#counter").val()) + 1);
            localStorage.setItem("ccsave", $("#counter").val());
          });
      }
  });
  
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  
  function main() {
    if (!localStorage.getItem("ccsave")) {
      localStorage.setItem("ccsave", 0);
    }
    let ccdiv = document.createElement("div");
    ccdiv.setAttribute("id", "ccdiv");
  
    $("#app").append(ccdiv);
    $("#ccdiv").attr({
      style:
        "background:beige;position:absolute;top:26px;right:515px;z-index:9999999"
    });
    $("#ccdiv").width("250px");
    $("#ccdiv").height("50px");
  
    let counter = document.createElement("input");
    counter.setAttribute("id", "counter");
    $("#ccdiv").append(counter);
    $("#counter").attr({
      style:
        "position:relative;top:9px;left:5px;font-size:22px;text-align:center;width:58px;height:32px"
    });
    $("#counter").val(localStorage.getItem("ccsave"));
  
    let incbt = document.createElement("button");
    incbt.setAttribute("id", "incbt");
    $("#ccdiv").append(incbt);
    $("#incbt").addClass("el-button");
    $("#incbt").attr({
      style: "position:relative;top:7px;left:15px;width:52px;height:32px"
    });
    $("#incbt").text("+1");
    $("#incbt").click(function () {
      $("#counter").val(parseInt($("#counter").val()) + 1);
      localStorage.setItem("ccsave", $("#counter").val());
    });
  
    let decbt = document.createElement("button");
    decbt.setAttribute("id", "decbt");
    $("#ccdiv").append(decbt);
    $("#decbt").addClass("el-button");
    $("#decbt").attr({
      style: "position:relative;top:7px;left:15px;width:52px;height:32px"
    });
    $("#decbt").text("-1");
    $("#decbt").click(function () {
      $("#counter").val(parseInt($("#counter").val()) - 1);
      localStorage.setItem("ccsave", $("#counter").val());
    });
  
    let rstbt = document.createElement("button");
    rstbt.setAttribute("id", "rstbt");
    $("#ccdiv").append(rstbt);
    $("#rstbt").addClass("el-button");
    $("#rstbt").attr({
      style: "position:relative;top:7px;left:15px;width:52px;height:32px"
    });
    $("#rstbt").text("0");
    $("#rstbt").click(function () {
      $("#counter").val(0);
      localStorage.setItem("ccsave", $("#counter").val());
    });
  }
  