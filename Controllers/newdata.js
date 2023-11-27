function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}
function getType(){
    let TypeButton = document.querySelector("#TypeButton");
    let kiad = document.querySelector("#kiad");
    let bevetel = document.querySelector("#bevetel");

    
}

function addSteps(){

    let date = document.querySelector('#date');
    let tag = document.querySelector('#tags');

    if (date.value == "" || tag.value == "" ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(vane){
                let data = {
                    tag : tag.value	
                }
                axios.patch(`${serverURL}/items/ID/eq/${upID}`, data).then((res)=>{
                    alert('A lépésszám módosítva!');
                    date.value = null;
                    tag.value = 0;
                });
            }
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,	
                    tag : tag.value	
                }

                axios.post(`${serverURL}/items`, data).then((res)=>{
                    alert('A lépésszám rögzítve!');
                    date.value = null;
                    tag.value = 0;
                });
            }
        })
    }
}

getToday();
