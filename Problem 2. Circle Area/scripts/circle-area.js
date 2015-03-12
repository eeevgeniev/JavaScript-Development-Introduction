function calcArea(inputValue) {

    return inputValue * inputValue * Math.PI;

}

function createNewDiv(container) {

    var elementDiv = document.getElementById(container);
 
    var radius = 0;
    
    for (var index = 0; index < 3; index++) {
        
        var paragraph = document.createElement("p");
        
        switch (index) {
            case 0:
                radius = 7;
                break;
            case 1:
                radius = 1.5;
                break;
            default:
                radius = 20;
                break;
        }

        var node = document.createTextNode("r = " + radius + "; area = " + calcArea(radius));
        paragraph.appendChild(node);

        elementDiv.appendChild(paragraph);

    }
}