var num = 4;
var percentages = [];
var weights = [];
var booster = 0;
var cur = 0;

function checkValid(score, total, id) {
	if (total <= 0 || score < 0 || (score > total)) {
		document.getElementById("P" + id.charAt(1)).innerHTML = "invalid";
        percentages[Number(id.charAt(1))] = "invalid";
        return false;
    } return true;
}

function percentShow(id) {
    let score;
    let total;
    weights[Number(id.charAt(1))] = document.getElementById("A" + id.charAt(1) + "weight").value;
    switch (id.charAt(2)) {
        case "t":
            score = Number(document.getElementById("A" + id.charAt(1) + "score").value);
            total = Number(document.getElementById(id).value);
            if (!checkValid(score, total, id)) break;
            percentages[Number(id.charAt(1))] = ((score / total) * 100).toFixed(2);
            document.getElementById("P" + id.charAt(1)).innerHTML = ((score / total) * 100).toFixed(2) + "%";
            break;

        case "s":
            score = Number(document.getElementById(id).value);
            total = Number(document.getElementById("A" + id.charAt(1) + "total").value);
            if (!checkValid(Number(document.getElementById(id).value), total, id)) break;
            percentages[Number(id.charAt(1))] = ((score / total) * 100).toFixed(2);;
            document.getElementById("P" + id.charAt(1)).innerHTML = ((score / total) * 100).toFixed(2); + "%";
            break;
    }
}

function calculate(type) {
	if (type == 'weight')  {
		cur = "weight";
		let i, weightAll = 0,
        temp = num,
        all = 0;
   		for (i = 1; i <= num; i++) {
        	if (percentages[i] === undefined) {
            	temp--;
            	continue;
        	} if ((percentages[i] instanceof String) || (weights[i] <= 0)) {
            	document.getElementById("result").innerHTML = "Invalid Input";
            	return;
        	} weightAll += Number(percentages[i]) * Number(weights[i]);
        	all += Number(weights[i]);
    	} let output = ((weightAll / all) + +booster).toFixed(2);
    	if (isNaN(output) || temp <= 0) {
        	document.getElementById("result").innerHTML = "Invalid Input";
        	return;
    	} document.getElementById("result").innerHTML = "Weighted Mean: " + output + "%";
	}
	if (type == 'mean') {
		cur = "mean";
		let i, all = 0,
        temp = num;
	    for (i = 1; i <= num; i++) {
	        if (percentages[i] === undefined) {
	            temp--;
	            continue;
	        } if (percentages[i] instanceof String) {
	            document.getElementById("result").innerHTML = "Invalid Input";
	            return;
	        } all += Number(percentages[i]);
	    } let output = ((all / temp) + +booster).toFixed(2);
	    if (isNaN(output) || temp <= 0) {
	        document.getElementById("result").innerHTML = "Invalid Input";
	        return;
	    } document.getElementById("result").innerHTML = "Mean: " + output + "%";
	}
}

function boost() {
	booster += +10;
	document.getElementById("plus").innerHTML = "MARK BOOSTER (+" + booster + "%)";
	if (cur == "mean") calculate('mean');
	if (cur == "weight") calculate('weight');
}

function unboost() {
	booster = +0;
	document.getElementById("plus").innerHTML = "MARK BOOSTER";
	if (cur == "mean") calculate('mean');
	if (cur == "weight") calculate('weight');
}

function add() {
    num++;
    var table = document.getElementById("calc");
    var row = table.insertRow(-1);

    var
        Name = document.createElement('td'),
        ShortName = document.createElement('td'),
        Weight = document.createElement('td'),
        Grade = document.createElement('td'),
        Percentage = document.createElement('td')
    IDtag = "A" + num;

    Name.innerHTML = "Activity " + num;
    ShortName.innerHTML = "A" + num;
    Weight.innerHTML =
        '<input type="number" ' + "name=" + IDtag + "weight " + "id=" + IDtag + "weight " + 'value="" onchange="percentShow(this.id)"/>';
    Grade.innerHTML =
        '<input type="number" ' + "name=" + IDtag + "score " + "id=" + IDtag + "score " + 'value="" onchange="percentShow(this.id)"/>' +
        "/" +
        '<input type="number" ' + "name=" + IDtag + "total " + "id=" + IDtag + "total " + 'value="" onchange="percentShow(this.id)"/>';
    Percentage.id = "P" + num;

    row.appendChild(Name);
    row.appendChild(ShortName);
    row.appendChild(Weight);
    row.appendChild(Grade);
    row.appendChild(Percentage);
}