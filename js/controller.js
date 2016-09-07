var app = angular.module('genealogy', []);

app.controller('genealogyCtrl', function($scope) {
    // length of line where name will be placed
    $scope.nameLength = 250;

    // font size of names
    $scope.nameFontSize = 20;

    // font size of all info about a person
    $scope.infoFontSize = 12;

    // length of the initial vertical line; this size determines the size of all the others, too
    $scope.firstVert = 2000;

    // thickness of the lines of the tree
    $scope.lineWidth = 4;

    // initial x-coordinate of the first person
    $scope.initialY = 300;

    // initial y-coordinate of the first person
    $scope.initialX1 = 0;

    // array containing all members of the tree
    $scope.people = [];
    
    /*
    *   add a new member to the tree
    *
    *   ---PARAMETERS---
    *   name:  New member's full name
    *   birth: Date of birth
    *   pob:   Location of birth
    *   marr:  Date of marriage
    *   pom:   Location of marriage
    *   death: Date of death
    *   pod:   Location of death
    *   bur:   Name of cemetery where buried
    *   pobur: Location of cemetery
    *   genealogyNum: # of person on tree (root is 1, father of root is 2, mother 3, paternal grandfather 4, etc...)
    */
    var push = function(name, birth, pob, marr, pom, death, pod, bur, pobur, genealogyNum) {
        var inner = Math.floor(Math.log2(genealogyNum));
        var denom = Math.pow(2, inner);

        var deltaX = inner * ($scope.nameLength + $scope.lineWidth);
        var deltaY = ((denom - 1) / denom - 2 / denom * (genealogyNum - denom)) * $scope.firstVert * -1;
        
        var vert = 0;
        if (genealogyNum % 2 === 0) {
            vert = 2 * $scope.firstVert / denom + 4;
        }
        $scope.people.push({'name':name,
                        'birth':birth,
                        'pob':pob,
                        'marr':marr,
                        'pom':pom,
                        'death':death,
                        'pod':pod,
                        'num':genealogyNum,
                        'dx':deltaX,
                        'dy':deltaY,
                        'vertBar':vert,
                        'visible':'none',
                        'visibleRect':'none',
                        'visibleLink':'none'
        });
    };

    // hide the info fields on everyone unless that information is specifically requested by the user (person's name is clicked)
    // this prevents the tree from becoming too cluttered
    $scope.changeVisibility = function(person) {
        if (person.visible === 'none') {
            person.visible = 'black';
            person.visibleRect = '#d3d3d3';
            person.visibleLink = 'blue';
        } else {
            person.visible = person.visibleRect = person.visibleLink = 'none';
        }
    }

    // add everyone to the tree
    // thinking of a better way to accomplish this still, but this works for a proof of concept
    push('Eric Austin Buedel', '', '', '', '', '', '', '1');
    push('Steven Wayne Buedel, D.D.S.', '', '', '', '', '', '', '2');
    push('Andora Davis', '', '', '', '', '', '', '3');
    push('Jerry Lewis Buedel', '', '', '', '', '', '', '4');
    push('Betty Lee Freudenberger', '', '', '', '', '', '', '5');
    push('Henry Thomas Davis, Sr.', '', '', '', '', '', '', '6');
    push('Harriet Irene Couch', '', '', '', '', '', '', '7');
    for (var i = 8; i <= 127; i++) {
        push('', '', '', '', '', '', '', i);
    }
});
