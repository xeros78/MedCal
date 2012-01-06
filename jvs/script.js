
var calculs = {
	"Surface Corporelle" : {
		"fnct" : function(data) {
			//alert(JSON.stringify(data));
			//(4 * Poids + 7)/(Poids +90)Poids en Kg
			return (4 * data.poids + 7) / (data.poids + 90)
		},
		"inputs" : {
			"Poids" : {"id" : "poids", "type" : "number" }
		},
		"unit" : "m²"
	},
	"Tonicité plasmatique calculée" : {
		"fnct" : function(data) {},
		"inputs" : {
			"Na" : {"id" : "na", "type" : "number" },
			"Glycémie" : {"id" : "glycemie", "type" : "number" }
		},
		"unit" : "m²"
	}

};

$(window).load(function(){
		var $content = $("#home").children(":jqmData(role=content)");
		var l = '<ul data-role="listview" data-inset="true" data-filter="true">';
		for (id in calculs) {
			l += "<li><a>"+id+"</a></li>"
		}
		l += '</ul>';
		$content.html(l);
		$("#home").page();
		$content.find(":jqmData(role=listview)").listview();

		$('#home li').click(function() {
			var $id = $(this).text();
			var $content = $("#inputs").children(":jqmData(role=content)");
			var $calcul = calculs[$id]
			var $html = "";
			
			$content.html($html);
			$("#inputs").children(":jqmData(role=header)").children("h1").text($id);
			
			for ( name in $calcul.inputs){
				$html += "<input placeholder='"+name+"' name='"+name+"' id='"+$calcul.inputs[name].id+"' type='"+$calcul.inputs[name].type+"' ><br>"
			}
			//alert($html);
			$html += "<button onclick='calculer(\""+$id+"\")' data-icon='check'>Calculer</button>"
			
			$content.html($html).trigger("create");
			//$("input").page();
			//$("#inputs").page()
			$.mobile.changePage($("#inputs"),{"dataUrl" : "#inputs?"+$id });
		});
});


function calculer(id){
	var $calcul = calculs[id];
	var $data = {};
	for ( name in $calcul.inputs){
		$data[$calcul.inputs[name].id] = $("#"+$calcul.inputs[name].id).val();
	}
	//alert(JSON.stringify($data));
	//Math.round(r * 1000) / 1000
	alert(Math.round($calcul.fnct($data)*1000)/1000 + " " + $calcul.unit);
}
