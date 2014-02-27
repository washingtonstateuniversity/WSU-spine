// @if DEBUG
/* for debug only. remove when done */
/*jshint unused: false */
function dump(arr,limit,level) {
	var dumped_text, level_padding, j, item, value;
	dumped_text = "";
	if(!limit){
		limit=3;
	}
	if(!level){
		level = 0;
	}

	//The padding given at the beginning of the line.
	level_padding = "";
	for(j=0;j<level+1;j++){
		level_padding += "	";
	}

	if(typeof(arr) === "object") { //Array/Hashes/Objects 
		if(level<=limit){
			for(item in arr) {
				value = arr[item];
				
				if(typeof(value) === "object") { //If it is an array,
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += dump(value,limit,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

// @endif