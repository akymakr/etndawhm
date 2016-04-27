// Global variables
var formChanged = false;
var formSubmitting = false;

$(document).ready(function() {

	// Shift select checkbox
	$('table').find('input[type="checkbox"]').shiftSelectable();
	
	// Keyboard events
	$('html').keyup(function(e){
		if(e.keyCode == 46) { // Delete
			$('button[name="op_submit"][value="delete"]').click();
		} else if(e.ctrlKey && e.keyCode == 13) { // Ctrl + Enter
			if(confirm("您是否要提交此表格？")) {
				$('button[name!="op_submit"][type="submit"]:last').click();
			}
		}
	});
	
	// Set formChanged to True
	$('form[name!=""]:last').change(function() {
		formChanged = true;
	});
	
	// Prevent form double submit
	$('form').on('submit', function() {
		formSubmitting = true;
		
		for(instance in CKEDITOR.instances) {
			CKEDITOR.instances[instance].updateElement();
		}
		
		$(this).children('buttom').prop('disabled', true);
    });
	
	// Auto cron
	setInterval(function() {
		$.ajax({
			type: "GET",
			url: "blank.php",
		});
	}, 60000);
});

$(window).on('beforeunload', function() {
	if(formChanged && !formSubmitting) {
		alert('FormChanged' + formChanged);
		alert('formSubmitting' + formSubmitting);
		return("表格內容可能已經被修改，如您離開此頁將放棄此修改。");
	}
});

function rowHover(row, on) {
	var onOverColor = "#E0E0E0";
	var onOutColor = "#FAFAFA";
	
	if(on == "mouseover") {
		row.style.backgroundColor = onOverColor;
	} else if(on == "mouseout") {
		row.style.backgroundColor = onOutColor;
	} else {
		row.style.backgroundColor = onOutColor;
	}		
}