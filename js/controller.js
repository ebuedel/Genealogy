var app = angular.module('genealogy', []);

app.controller('genealogyCtrl', function($scope) {
    $scope.nameLength = 250;
    $scope.numGenerations = 1;
    $scope.nameFontSize = 20;
    $scope.infoFontSize = 12;
    $scope.firstVert = 2000;
    $scope.lineWidth = 4;

    $scope.initialY = 300;
    $scope.initialX1 = 0;

    $scope.people = [];
    
    var push = function(name, birth, pob, wed, pow, death, pod, genealogyNum) {
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
                        'wed':wed,
                        'pow':pow,
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

    $scope.changeVisibility = function(person) {
        if (person.visible === 'none') {
            person.visible = 'black';
            person.visibleRect = '#d3d3d3';
            person.visibleLink = 'blue';
        } else {
            person.visible = person.visibleRect = person.visibleLink = 'none';
        }
    }

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
