let updateList = ()=>{
    elements = document.getElementById("beers").getElementsByClassName("beer");
    console.log("Elements:" + elements);
    for(i=0; i < elements.length; i++){
        inputedText = document.getElementById("inputedText").value.toUpperCase();
        element = elements[i].innerText.toUpperCase();
        if(element.indexOf(inputedText) > -1){
            elements[i].style.display = "";
            for(j=0; j < elements.length; j++){
                if(elements[j].style.display == ""){
                    document.getElementById("beers").getElementsByClassName("unknown")[0].style.display = "none";
                    break;
                }
            }
        }else{
            elements[i].style.display = "none";
            for(j=0; j < elements.length; j++){
                if(elements[j].style.display == ""){
                    break;
                }
                if(elements[j].style.display == "none" && j == elements.length - 1){
                    document.getElementById("beers").getElementsByClassName("unknown")[0].style.display = "";
                }
            }
        }
    }
};

document.getElementById("clearButton").onclick = ()=>{
    document.getElementById("inputedText").value = "";
    updateList;
};

document.getElementById("inputedText").onkeyup = updateList;





// source : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list