var x =$(document);
x.ready(main);

//Declaracion de variables globales
var numNotas=0;
function main (){
		var objSerialized1 = localStorage.getItem("colorFondo");
		if(objSerialized1!=null){
			var color = JSON.parse(objSerialized1);
			$("#bod").css("backgroundColor",'#' +color);
			$('#colorSelector div').css('backgroundColor', '#' + color);
		}


		$('#colorSelector').ColorPicker({
			color: '#0C5871',
			
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				$(".imagen").css("zIndex","0");
				$(".note").css("zIndex","0");
			    $(".tablero").css("zIndex","-1");
				$("#menu").css("zIndex","2");
				return false;
				
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				organizarCapas();
				return false;
				
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector div').css('backgroundColor', '#' + hex);
			    $('#bod').css('backgroundColor', '#' + hex);
				
				// Web Storage - JSON
				var objSerialized = JSON.stringify(hex);
				localStorage.setItem("colorFondo", objSerialized);
		
			}



	
		});


	setProperties();
	loadNotes();
	//localStorage.clear();

	var objSerialized = localStorage.getItem("numN");
	if(objSerialized!=null){
		var obj = JSON.parse(objSerialized);
		numNotas=obj;
	}

	$(".btnX").css("display","none");
	$(".color").css("display","none");
	$(".btnImg").css("display","none");
	$(".btnXimg").css("display","none");
	$("#menu").css("background-image","url(img/cor2.jpg)");


}
function organizarCapas(){
	var x=$(".note").css("zIndex","100");
    $(".imagen").css("zIndex","101");
	$(".tachuela").css("zIndex","200");
	$(".tablero").css("zIndex","10");
	$("#menu").css("zIndex","6000");


}

function downTablero(){
	$(this).css("zIndex","100");
	$(".note").css("zIndex","1000");
	$(".tachuela").css("zIndex","2000");
}


function deleteImg(){
	var x =$(this).attr("id").substring(4);
	var img = $("#img"+x);
	localStorage.removeItem("img"+x);
	//img.fadeOut("slow");
	img.effect("explode");

}

function changeImg(){
	var x =$(this).attr("id").substring(6);
	var img =$("#img"+x+" img");
	var ruta = prompt("Paste the url of the image");
	
		 if(ruta==false||ruta==""||ruta==null){
	 
	 }
	 else{
	img.attr("src",ruta);
	

	var pos=img.position();
	var id=img.attr("id");
	var obj = new Object();
	obj.left=pos.left;
	obj.top=pos.top;
	obj.width=img.innerWidth()-42;;
	obj.height=img.innerHeight()-42;
	var x2=$("#img"+x+" img");
	obj.ruta=x2.attr("src");
	// Web Storage - JSON
	var objSerialized2 = JSON.stringify(obj);
	localStorage.setItem(id, objSerialized2);
	

}}

function downImagen(){
organizarCapas();
var x=$(this);
x.css("zIndex","3000");

}
function addNota(){
	 numNotas++;
	 
	var objSerialized = JSON.stringify(numNotas);
	localStorage.setItem("numN", objSerialized);
	 
	 
	 var x = $("#contenido");
	 x.append("	<div class='note' id="+numNotas+"> <img class='color' src='images/color.png' width='15px' height='15px'/> <div class='colores'><div class='purple'></div>  <div class='green'></div> <div class='blue'></div>  <div class='red'></div> <div class='white'></div> <div class='yellow'></div> </div> <p class='btnX' id='bx"+numNotas+"' >x</p>	<textarea class='textArea' id='t"+numNotas+"' placeholder='Notes...  '></textarea></div>");
	 setProperties();
	var o=$("#bx"+numNotas);

	o=$("#"+numNotas);
	o.css("position","absolute");
	o.css("left","80%");
	o.css("top","60%");
	
	x=$("#"+numNotas);

	var pos=x.position();
	var numero=x.attr("id");
	var caja=$("#t"+numero);
	var obj = new Object();
	obj.contenido=caja.val();
	obj.left=pos.left;
	obj.top=pos.top;
	obj.width=x.innerWidth()-32;
	obj.height=x.innerHeight()-32;
	obj.drop=false;


	// Web Storage - JSON
	var objSerialized = JSON.stringify(obj);
	localStorage.setItem(numero, objSerialized);

	$(".btnX").css("display","none");
	$(".color").css("display","none");

}

function setProperties(){
	var x = $(".note");

	x.hover(overNote,outNote);
	x.mousedown(clickNote);

	x.droppable({drop:dropTachuela });
	x.droppable({accept:".tachuela"});
	x.droppable({out:outTachuela});

	x.draggable();
	x.resizable();

	x= $(".tablero");
	x.draggable();
	x.resizable();
	
	
	 var o=$(".btnX");
	 o.click(deleteNote);
	 
	 o=$(".btnXtab");
	  o.click(deleteTablero);
	 

	$("#menu").css("zIndex","300");
	$(".note").css("zIndex","200");
    $(".tablero").css("zIndex","100");

	x=$(".tachuela");
	x.draggable();

	x=$(".imagen");
	
	x.draggable();
	x.resizable();
	x.mousedown(downImagen);
	x.hover(overImagen,outImagen);
	x=$(".btnXimg");
	x.click(deleteImg);
	x=$(".btnImg");
	x.click(changeImg);
}


function overImagen(){
	var x=$(this);
	var num = x.attr("id");
	$("#"+num+" .btnImg").show();
	$("#"+num+" .btnXimg").show();

}

function outImagen(){
	var x=$(this);
	var num = x.attr("id");
	$("#"+num+" .btnImg").hide();
	$("#"+num+" .btnXimg").hide();
}
function clickNote(){
	var x;
	
	organizarCapas();
	x=$(this);
	x.css("zIndex","1000");
	$(".tachuela").css("zIndex","2000");


	}
	var numAux;
	function overNote(){
	var x=$(this);
	var num = x.attr("id");
	numAux=num;
	//x.css("background-color","rgba(255,224,110,0.9)");
	//var y=$("#t"+x.attr("id"));
	//y.css("background-color","rgba(255,224,110,0.1)");

	$("#"+num+" .btnX").show();
	$("#"+num+" .color").show();
	$("#"+num+" .purple").click(clickPurple);
	$("#"+num+" .green").click(clickGreen);
	$("#"+num+" .blue").click(clickBlue);
	$("#"+num+" .red").click(clickRed);
	$("#"+num+" .white").click(clickWhite);
	$("#"+num+" .yellow").click(clickYellow);
	 
	var o=$("#"+num+" .color");
	o.click(overColores);

}

function clickPurple(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function clickGreen(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function clickBlue(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function clickRed(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function clickWhite(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function clickYellow(){
	var color=$(this).css("background-color");
	var x=$("#"+numAux).css("background-color",color);
	$(".colores").slideUp("fast");
}

function overColores(){

	$("#"+numAux+" .colores").slideDown("slow");
	$("#"+numAux+" .colores").css("zIndex","500");
}


function outNote(){
	var x=$(this);
	var num = x.attr("id");
	$("#"+num+" .btnX").css("display","none");
	$("#"+num+" .color").css("display","none");
	$("#"+num+" .colores").slideUp("slow");
}


function loadNotes(){
	var objSerialized1 = localStorage.getItem("numN");
	if(objSerialized1!=null){
		var obj1 = JSON.parse(objSerialized1);
		numNotas=obj1;
	}

	var str="";
	//alert(numNotas);
	for(var i=0;i<numNotas+1;i++){
		var objSerialized = localStorage.getItem(i);
		if(objSerialized!=null){
			var obj = JSON.parse(objSerialized);
			var x=$("#contenido");
			x.append("	<div class='note' id="+i+"><img class='color' src='images/color.png' width='15px' height='15px'/> <div class='colores'><div class='purple'></div>  <div class='green'></div> <div class='blue'></div>  <div class='red'></div> <div class='white'></div> <div class='yellow'></div> </div> <p class='btnX' id='bx"+i+"' '>x</p>	<textarea class='textArea' id='t"+i+"' placeholder='Escribe tu nota...  '>"+obj.contenido+"</textarea></div>");
			x=$("#"+i);
			x.css("position","absolute");
			x.css("left",obj.left);
			x.css("top",obj.top);
			x.css("width",obj.width);
			x.css("height",obj.height);
			x.css("background-color",obj.color);
		}



	}

	organizarCapas();
	setProperties();
}


function deleteNote(){
	var x =$(this);
	var num= x.attr("id").substring(2);
	localStorage.removeItem(num);
	$("#"+num).fadeOut("slow");
}

function deleteTablero(){
	var x =$(this);
	var num= x.attr("id").substring(3);
	localStorage.removeItem("tab"+num);
	$("#tab"+num).fadeOut("slow");
}


function upTachuela(){


}

function downTachuela(){
	$(this).css("z-index","1000");
	$(".note").css("z-index","100");
	$(".tablero").css("z-index","10");

}


function dropTachuela( event, ui ){
	var x=$(this);
	var num=x.attr("id");


	var ta=ui.draggable;
	ta.addClass("drop"+num);
	
	x.draggable("disable");
	x.resizable("disable");
	x.css("box-shadow","2px 2px 2px #444");
	
	x.droppable({accept:".drop"+num});

		
		var color=x.css("background-color");
		var pos=x.position();
		var numero=x.attr("id");
		var caja=$("#t"+numero);
		obj = new Object();
		obj.contenido=caja.val();
		obj.left=pos.left;
		obj.top=pos.top;
		obj.width=x.innerWidth()-32;
		obj.height=x.innerHeight()-32;
		obj.color=color;
		obj.drop=true;
		
		// Web Storage - JSON
		 objSerialized = JSON.stringify(obj);
		localStorage.setItem(numero, objSerialized);

}


function outTachuela(event, ui ){

	var x=$(this);
	var num=x.attr("id");
	x.draggable("enable");
	x.resizable("enable");
	x.droppable({accept:".tachuela"});
	x.css("box-shadow","3px 3px 5px #222");
	var ta=ui.draggable;
	ta.removeClass("drop"+num);
	//x.css("border-radius","0");
	//x.css("-moz-transform","rotate(0deg)");

		var color=x.css("background-color");
		var pos=x.position();
		var numero=x.attr("id");
		var caja=$("#t"+numero);
		obj = new Object();
		obj.contenido=caja.val();
		obj.left=pos.left;
		obj.top=pos.top;
		obj.width=x.innerWidth()-32;
		obj.height=x.innerHeight()-32;
		obj.color=color;
		obj.drop=false;
		
		// Web Storage - JSON
		 objSerialized = JSON.stringify(obj);
		localStorage.setItem(numero, objSerialized);
}


  
	window.onbeforeunload = confirmaSalida;  
    function confirmaSalida()   {
		
		
		var nota;
		var objSerialized = localStorage.getItem("numN");
		if(objSerialized!=null){
			var obj = JSON.parse(objSerialized);
			numNotas=obj;
			
			for(var i=1;i<numNotas+1;i++){
				nota = $("#"+i);
				var obAux = localStorage.getItem(i);
				if(obAux!=null){
					var obAux2 = JSON.parse(obAux);
					var num=nota.attr("id");
					
						
					
					var x=$("#"+i);
					var color=x.css("background-color");
					var pos=x.position();
					var numero=x.attr("id");
					var caja=$("#t"+numero);
					obj = new Object();
					obj.contenido=caja.val();
					obj.left=pos.left;
					obj.top=pos.top;
					obj.width=x.innerWidth()-32;
					obj.height=x.innerHeight()-32;
					obj.color=color;
					obj.drop=obAux2.drop;
					
					// Web Storage - JSON
					 objSerialized = JSON.stringify(obj);
					localStorage.setItem(numero, objSerialized);

			

				}
			}
		}

    }

	function imgError(){

	 this.src = 'img/error.png';
	
	}

	function clearLocalStorage(){

	localStorage.clear();
	location.reload();
	}
	
	function openRisk(){
		window.open('http://localhost:9085/risk', 'Risk');
	}
	function openTrader(){
		window.open('http://localhost:8085/trader', 'Trader');
	}
	
	
