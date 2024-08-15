let BASE_URL="https://api.exchangerate-api.com/v4/latest";
let dropdown=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let refresh=document.querySelector("#refresh");

refresh.addEventListener("click",()=>{
    location.reload();
})
for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=currCode;
        newOption.value=currCode;
        if(select.name==="from"&&currCode==="USD"){
            newOption.selected="sselected";
        }else if(select.name==="to"&&currCode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
   let currCode=element.value
   let countryCode=countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue===""||amountValue<1){
        amountValue=1;
        amount.value="1";
    }
    let newURL=`${BASE_URL}/${fromCurr.value}`;
    let response=await fetch(newURL);
    let data=await response.json();
    let rate=data.rates[toCurr.value];
    let finalAmount=rate*amountValue;
    msg.innerHTML=`${amountValue}${fromCurr.value}=${finalAmount.toFixed(2)}${toCurr.value}`;
    console.log(rate);
});
