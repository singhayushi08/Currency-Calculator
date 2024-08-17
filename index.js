let apiKey = "21a82d08de26575026f828cd";

const base_url = "https://v6.exchangerate-api.com/v6/";

const dropdowns = document.querySelectorAll(".dropdown select");
// console.log(dropdowns);

for(let select of dropdowns) {
    // console.log("select:",select);
    for(let code in countryList) {
        //console.log(code, countryList[code]);
        let newOption = document.createElement("option"); //create new option using option tag
        newOption.innerText = code; //add text as country code
        newOption.value = code; //add value as country code
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption); //append new option in dropdown
    }

    select.addEventListener("change",(event) => {
        updateFlag(event.target);
    });
}

let img1 = document.querySelector(".from img");
console.log(img1.src);
let img2 = document.querySelector(".to img");
console.log(img2.src);

const updateFlag = (element) => {
    console.log(element.value);
    console.log(element.name);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img_url = `https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(img_url);
    if(element.name === "from") {
        img1.src = img_url;
    } else if(element.name === "to") {
        img2.src = img_url;
    }
}

let btn = document.querySelector("button");
// console.log(btn);
let fromCode = document.querySelector(".from select");
// console.log(fromCode.value);
let toCode = document.querySelector(".to select");
// console.log(toCode.value);
let msg = document.querySelector("#msg p");
// console.log(msg.innerText);

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = () => {
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    // let money = amount.value;
    if(amountVal === "" || amountVal < 1) {
        amountVal = 1;
    } 
    // console.log(amountVal);
    let url =  `${base_url}${apiKey}/latest/${fromCode.value}`;
    // console.log(url);
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => 
        {
            // console.log(data);
            // console.log(data.conversion_rates[toCode.value]);
            let rate = data.conversion_rates[toCode.value]; //example: conversion_rates[INR];
            msg.innerHTML = `${amountVal} ${fromCode.value} = ${rate*amountVal} ${toCode.value}`;
        }   
    ).catch((err) => console.log(err));
};

window.addEventListener("load", () => {
    updateExchangeRate();
})