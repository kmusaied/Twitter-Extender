
// Saves options to localStorage.
function save_options() {
  
  localStorage["bitlyUserName"] = $("#bitlyUserName").val();
  localStorage["bitlyPassword"] = $("#bitlyPassword").val();
  localStorage["HighLightColor"] = $("#HighLightColor").val();
  
  localStorage["DisableDesktopAlerts"] = $("#DisableDesktopAlerts:checked").length > 0;
  
  localStorage["AutoSwitch"] = $("#AutoSwitch").val();
  
  localStorage["MyLang"] = $("#MyLang").val();
  
  alert("Settings Saved");
}

// Restores select box state to saved value from localStorage.
function load_options() {
 
  $("#bitlyUserName").val(localStorage["bitlyUserName"]);
  $("#bitlyPassword").val(localStorage["bitlyPassword"]);
  
  if (localStorage["HighLightColor"]!=null)
	$("#HighLightColor").val(localStorage["HighLightColor"]) ;
  else
	$("#HighLightColor").val("#FFFFCC") ;
		
	if (localStorage["AutoSwitch"]!=null)
		$("#AutoSwitch").val(localStorage["AutoSwitch"]);
	else
		$("#AutoSwitch").val("0");
	
	if (localStorage["DisableDesktopAlerts"] == null)
	{
		$("#DisableDesktopAlerts").attr('checked', false);
	}	
	else if (localStorage["DisableDesktopAlerts"] == 'true')
	{
		$("#DisableDesktopAlerts").attr('checked', true);
	}
	
	
	
	if (localStorage["MyLang"]!=null)
		$("#MyLang").val(localStorage["MyLang"])	
	else 
		$("#MyLang").val("en");
}



function restore_options() 
{
  $("#bitlyUserName").val("") ;
  $("#bitlyPassword").val("") ;
  $("#HighLightColor").val("#FFFFCC");
  $("#AutoSwitch").val("0");
  $("#DisableDesktopAlerts").attr('checked', false);
  
  $("#MyLang").val("en");
}

$(document).ready(function(){
	load_options()
	$("#Save").click(save_options);
	$("#Restore").click(restore_options);
});
