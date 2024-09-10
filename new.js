let select2=document.querySelectorAll(".select");
select2.forEach((select1)=>{
    for(let currcode in countryList){
        let opt=document.createElement("option");
        opt.innerText=currcode;
        opt.value=currcode;
        select1.append(opt);
        if(currcode==='USD' && select1.name==="from"){
            opt.selected="selected";
        }
        if(currcode==='INR' && select1.name==="to"){
            opt.selected="selected";
        }
    }
    select1.addEventListener('change',(event)=>{
        let val=event.target;
        let countrycode=countryList[val.value];
        console.log(countrycode);
        let img=val.parentElement.parentElement.querySelector('img');
        img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    })
})

let converter=document.querySelector('.rate');
converter.addEventListener('click', async (evt) => {
    evt.preventDefault();
    
    // Get input values
    let amount = document.querySelector('.enter input').value;
    let from = document.querySelector('.from1').value.toLowerCase();
    let to = document.querySelector('.to1').value.toLowerCase();
    
    console.log(amount); // Debugging to show the entered amount

    // Construct the API URL
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
    
    try {
        // Fetch the currency conversion data
        let response = await fetch(url);
        let data = await response.json();
        console.log(from,to);
        // Access the conversion rate
        let val = amount*data[from][to];
        
        console.log(val); // Debugging to show the conversion rate

        // Display the conversion rate in the designated element
        let data_2 = document.querySelector('.convert');
        data_2.innerText = `${amount} ${from.toUpperCase()} = ${val} ${to.toUpperCase()}`;
    } catch (error) {
        console.error('Error fetching the currency data:', error);
    }
});
window.addEventListener("load",async ()=>{
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;
    
    try {
        // Fetch the currency conversion data
        let response = await fetch(url);
        let data = await response.json();
        // Access the conversion rate
        let val = data["usd"]["inr"];
        
        console.log(val); // Debugging to show the conversion rate

        // Display the conversion rate in the designated element
        let data_2 = document.querySelector('.convert');
        data_2.innerText = `1 USD = ${val} INR`;
    } catch (error) {
        console.error('Error fetching the currency data:', error);
    }
})

