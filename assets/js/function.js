var aosDelay=0;
var startMedi =0;
var endMedi;
var arrMedi = [];
var arrStoreMedi = [];

function myFunctionOnLoad() {
    
    makeMediArr();
    getMediArr(0);
    
    document.getElementById("nameMedi").innerHTML='Aripiprazole';
    document.getElementById("useMedi").innerHTML='used to treat schizophrenia in adults and children at least 13 years old.';
    document.getElementById("introMedi").innerHTML="Aripiprazole is also used in children 6 years or older who have Tourette's disorder, or symptoms of autistic disorder (irritability, aggression, mood swings, temper tantrums, and self-injury).Aripiprazole is used alone or with a mood stabilizer medicine to treat bipolar I disorder in adults and children at least 10 years old.";
    document.getElementById("warnMedi").innerHTML="Avoid driving and doing other tasks or actions that call for you to be alert or have clear eyesight until you see how aripiprazole affects you.High blood sugar or diabetes, high cholesterol, and weight gain have happened with drugs like this one.";
    document.getElementById("takeMedi").innerHTML="Swallow the regular tablet whole and do not crush, chew, or break it. Do not split the orally disintegrating tablet.Remove an orally disintegrating tablet from the package only when you are ready to take the medicine. Place the tablet in your mouth and allow it to dissolve.";
    document.getElementById("sideEffectMedi").innerHTML="blurred vision,increased saliva or drooling;muscle stiffness;uncontrolled muscle movements, shaking, anxiety, feeling restless;nausea, vomiting, constipation;increased or decreased appetite;headache, dizziness, drowsiness, feeling tired, sore throat";
    document.getElementById("ifMissMedi").innerHTML='Take the medicine as soon as you can, but skip the missed dose if it is almost time for your next dose. Do not take two doses at one time.Get your prescription refilled before you run out of medicine completely.';
  
}

async function makeMediArr(){

    var xhttp = new XMLHttpRequest();
		
		// Set GET method and ajax file path with parameter
		xhttp.open("GET", "php/getName.php", false);
		//xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		
		// call on request changes state
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	arrMedi = JSON.parse(this.responseText);
                arrStoreMedi  = JSON.parse(this.responseText);
                endMedi= arrMedi.length;
		    }
		};

		// Send request
		xhttp.send();
}

function getMediArr(para) {
    
    if(para ==0){
        startMedi = 0;
    }else if(para == 2){
        if(endMedi != arrMedi.length){
            startMedi = endMedi;
        }
        
    }else{
        startMedi = startMedi - 24 ;
        if(startMedi < 0){
            startMedi = 0 ;
        }
    }

    endMedi = startMedi +24 ;

    if(arrMedi.length < endMedi){
        endMedi = arrMedi.length;
    }
    aosDelay = 0;
    document.getElementById("ListMedi").innerHTML ='';
    for (var i = startMedi; i <endMedi; i++) {
        document.getElementById("ListMedi").innerHTML += '<div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up"  data-aos-delay="'+aosDelay+'"><div class="icon"><i class="fa fa-plus-square" ></i></div><h4 class="title" onclick="getDetailsMedi(`'+arrMedi[i]+'`)"><a href="#mediDetails">'+arrMedi[i]+'</a></h4></div>';
        aosDelay+=20;
    }
}

function getDetailsMedi(para){

    if(para == "0"){
        para = document.getElementById("searchMedi").value;
        para= para.trim();
        if(para == '' || para.includes(';')){
            document.getElementById("errMedi").innerHTML= 'please enter a vaild name';
            return;
        }
    }
    console.log(para);
    document.getElementById("errMedi").innerHTML= '';
    //ajax
    var xhttp = new XMLHttpRequest();
		
		// Set GET method and ajax file path with parameter
		xhttp.open("GET", "php/getDetail.php?MediName="+para, true);
		//xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		
		// call on request changes state
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	
		    	// Parse this.responseText to JSON object
		    	var response = JSON.parse(this.responseText);
                if(response[0].errMedi == 'no'){

		    	document.getElementById("nameMedi").innerHTML= response[0].nameMedi;
                document.getElementById("useMedi").innerHTML= response[0].useMedi;
                document.getElementById("introMedi").innerHTML= response[0].introMedi;
                document.getElementById("warnMedi").innerHTML= response[0].warnMedi;
                document.getElementById("takeMedi").innerHTML= response[0].takeMedi;
                document.getElementById("sideEffectMedi").innerHTML= response[0].sideEffectMedi;
                document.getElementById("ifMissMedi").innerHTML= response[0].ifMissMedi;
                }else{
                   document.getElementById("errMedi").innerHTML= 'please enter a vaild name' ;
                }

		    }
		};

		// Send request
		xhttp.send();
    document.getElementById("searchMedi").value ='';

}

function makeArrFill(){

    var pattern = document.getElementById("searchFill").value;
    pattern = pattern.toLowerCase();
    arrMedi = arrStoreMedi.filter(function (str) { return str.toLowerCase().includes(pattern); });

    getMediArr(0);
}