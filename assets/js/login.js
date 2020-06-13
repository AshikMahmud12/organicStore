var x=document.getElementById('userName');
var p= document.getElementById('userPassword');

document.getElementById('formLogin').addEventListener('submit',(ee)=>{
    ee.preventDefault();
    console.log(x.value);
    console.log(p.value);
    if(x.value=='admin@gmail.com' && p.value =="123456"){
        swal.fire({
            position:'center',
            type:'success',
            title:'welcome',
            text:'Access Granted' 

        });
        x.value='';
        p.value='';
        setTimeout(()=>{
loadPage();
        },3000);
        } else {
            swal.fire({
                position:'center',
                type:'error',
                title:'Error',
                text:'Access Denied'
            });
            x.value='';
            p.value=''; 
        }
        function loadPage(){
            window.location.href="./admin.html";
        }
    
}); 