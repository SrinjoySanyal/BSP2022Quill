require('core-js/stable/array/flat-map');
require('core-js/stable/object/from-entries');
require('core-js/stable/object/from-entries');
const fs = require('fs');
const { resolve } = require('path');
const Simplegit = require('simple-git');
//var branch = require('create-git-branch');
//simpleGit().clean(simpleGit.CleanOptions.FORCE);

function commonIndicesVersion1(version0, version1) {
  let index1 = -1;
  let array1 = [];
  let interestElement;
  for(let element0 = 0; element0 < version0.length; element0++){
    for(let element1 = index1 + 1; element1 < version1.length; element1++){
      //console.log(String(element0) + "," + String(element1));
      if(JSON.stringify(version0[element0]) == JSON.stringify(version1[element1])){

        interestElement = element1;
        array1.push(element1);
        break;

      }
    }
    index1 = interestElement;
    //index1 += 1;
  }
  return array1;
}

function commonIndicesVersion0(version0, version1) {
  let index0 = -1;
  let array0 = [];
  let interestElement;
  for(let element0 = 0; element0 < version0.length; element0++){
    for(let element1 = index0 + 1; element1 < version1.length; element1++){
      //console.log(String(element0) + "," + String(element1));
      if(JSON.stringify(version0[element0]) == JSON.stringify(version1[element1])){

        interestElement = element1;
        array0.push(element0);
        break;

      }
    }
    index0 = interestElement;
    //index0 += 1;
    //console.log(index0);
  }
  return array0;
}


function beginningInsertVersion0(version0, version1, array0, array1){
  if(version0.slice(0, array0[0]).length == 0){
    if(version1.slice(0, array1[0]).length != 0){
      for(let ops = 0; ops < version1.slice(0, array1[0]).length; ops++){
        version0.splice(ops, 0, version1.slice(0, array1[0])[ops]);
      }
    }
  }
  return version0;
}

function beginningInsertVersion1(version0, version1, array0, array1){
  if(version1.slice(0, array1[0]).length == 0){
    if(version0.slice(0, array0[0]).length != 0){
      for(let ops = 0; ops <= version0.slice(0, array1[0]).length; ops++){
        version1.splice(ops, 0, version0.slice(0, array1[0])[ops]);
      }
    }
  }
  return version1;
}

function middleInsertVersion0(version0, version1, array0, array1){
  //console.log(JSON.stringify(version0));
  //console.log(JSON.stringify(version1));
  for(let i = 0; i < array0.length - 1; i++){
    //console.log(JSON.stringify((version1.slice(array1[i], array1[i + 1]))[0]));
    if(version0.slice(array0[i] + 1, array0[i + 1]).length == 0){
      if(version1.slice(array1[i] + 1, array1[i + 1]).length != 0){
        //console.log(JSON.stringify(version1.slice(array1[i] + 1, array1[i + 1])));
        for(let ops = 0; ops < version1.slice(array1[i] + 1, array1[i + 1]).length; ops++){
          //console.log(JSON.stringify((version1.slice(array1[i] + 1, array1[i + 1]))[ops - array1[i] - 1]));
          version0.splice(array1[i] + 1 + ops, 0, version1.slice(array1[i] + 1, array1[i + 1])[ops]);
        }
      }
    }
  }
  return version0;
}

function middleInsertVersion1(version0, version1, array0, array1){
  for(i = 0; i < array1.length - 1; i++){
    if(version1.slice(array1[i] + 1, array1[i + 1]).length == 0){
      if(version0.slice(array0[i] + 1, array0[i + 1]).length != 0){
        for(let ops = array0[i] + 1; ops <= version0.slice(array0[i] + 1, array0[i + 1]).length; ops++){
          version1.splice(ops, 0, version0.slice(array0[i] + 1, array0[i + 1])[ops - array0[i] - 1]);
        }
        //version0.splice(0, 0, version1.slice(0, array1[0]));
      }
    }
  }
  return version1;
}

function merging(version0, version1){
  //Simplegit()
   //.init()
   //.addRemote('origin', 'AAAAB3NzaC1yc2EAAAADAQABAAABgQDBP5/z6tQFL23ryPNJ3NORD9vs5NtZwVNK9wYsoJDnEMHnXSF/9kXq2LUJKvxiVTpmLu1mQoqrLneEm2vmaqSahD/xMfM7BU50hynwM5JVEbjTk1AMt4hWyaxsOXrLn54/0mwvmzii5zb0rj1vQ09D2X/g3thZ3uxdYOppxXnoIfAMWtRRYUTDxJW0HQ0q4LZ99J2H78RgX6MYsmpWQ7/FYDsFcF8AGSAPWOBQDRP6Yt/u9VaVvrV6+POwXUkD1heZuZMZjcVCFgOcbQaR+lDEsN3cqk9sI5AMKX1PYxGvd1cdHkZzv+a/4SA/h3oQG5+OHB3R6WCMV3GVuYU+vM0eQ0OMLh7xP0YDj7U0AfBgz/f3uTy2X0QzCywKpTKjzmzTcyO+KLf4o1y+yr/Ft69IJ6whRqgbiFYufZBURSfXlterCZ3bnNY6qI8jlCOMlp+Z/uzFIxoajsTskXdRuJc1BegO36Jq28iRtc3SrfE8N7ey1/hImT+YoLKh1I7ZYcU= srinjoy@LAPTOP-96E147H6')
   function abc(){
     return new Promise(function(resolve, reject){
       fs.writeFile('folder.json', JSON.stringify(version0), 'utf-8', function(err){
         if(err) reject(err);
         else resolve('done');
       });
     });
   }

   function def(){
    return new Promise(function(resolve, reject){
      fs.writeFile('folder.json', JSON.stringify(version1), 'utf-8', function(err){
        if(err) reject(err);
        else resolve('done');
      });
    });
  }
  //merger -> version 1
  //master -> version 0
   abc().then(
    Simplegit().add(['folder.json'])
    .commit("more commit!")
    .push(['origin', 'master'], () => console.log("push 1"))
    .checkout(['-b','merger'])).then(def()).then(
      Simplegit().add(["folder.json"]).commit('test').push(['origin', 'merger'], () => console.log("push 2"))
      //.checkout(['master'])
      //.mergeFromTo('origin', 'merger', ['-s', 'resolve']).then((result => console.log(result))).catch(err => console.log(err))
    );
}

function displayDelta(version){
  finalDelta = []
  let l = version.length;
  for(let i = 1; i < l; i++){
    version.splice(i, 0, {ops: [{insert: '\n'}]});
  }
  version.push({ops: [{insert: '\n'}]});
  //alert(JSON.stringify(version));
  for(let j = 0; j < version.length; j++){
    for(let k = 0; k < version[j].ops.length; k++){
      finalDelta.push(version[j].ops[k]);
    }
  }

  return finalDelta;
}

/**
 * Version 0: in git
 * Version 1: changed document
 */
function uploadDelta(version1){
  let version0 = new Array();
  fs.readFile('file.json',(err, data) => {
    if(err){
      fs.writeFile('file.json', JSON.stringify(version1), (err) => {console.log(err);});
      git.add(['file.json']).push();
    }
    else{
      version0 = JSON.parse(data);

      /**
       * Goal: Create array1 containing the indices of the elements of version1 in version0 and array0 containing the indices
       * of the elements of version0 in version1
       */
      array1 = commonIndicesVersion1(version0,version1);
      array0 = commonIndicesVersion0(version0,version1);

      /*
      If some ops had been inserted in the beginning of Version1 but not of Version 0,
      then those ops are added to the beginning of Version0
      */
      version0 = beginningInsertVersion0(version0, version1, array0, array1);

      /*
      If some ops had been inserted in the beginning of Version0 but not of Version1,
      then those ops are added to the beginning of Version1
      */
      version1 = beginningInsertVersion1(version0, version1, array0, array1);

      /*
      If some ops had been inserted in the middle of Version1 but not of Version0,
      then those ops are added to the beginning of Version0
      */
      version0 = middleInsertVersion0(version0, version1, array0, array1);

      /*
      If some ops had been inserted in the middle of Version0 but not of Version1,
      then those ops are added to the beginning of Version1
      */
      version1 = middleInsertVersion1(version0, version1, array0, array1);

      //merging(version0, version1);

    }
  });
}

/**
 * Test all possible cases of version0 and version1
 */
console.log("Test 1")
console.log('      Testing commonIndicesVersion1');

const commonIndices_Test1_version0 = [
  {
    ops: [
      {insert: 'Sringjoy'}
    ]
  },
  {
    ops: [
      {insert: 'yes'}
    ]
  }
];
const commonIndices_Test1_version1 = [
  {
    ops: [
      {insert: 'Tomer'}
    ]
  },
  {
    ops: [
      {insert: 'Sringjoy'}
    ]
  },
  {
    ops: [
      {insert: 'yes'}
    ]
  }
];

const commonIndices_Test1_array1 = [1,2];

const commonIndices_Test1_result = JSON.stringify(commonIndicesVersion1(commonIndices_Test1_version0,commonIndices_Test1_version1));
if (commonIndices_Test1_result === JSON.stringify(commonIndices_Test1_array1))
  console.log("   Test 1.1 succeeded");
else {
  console.log("   Test 1.1 failed");
  console.log(`   Calling commonIndices on ${JSON.stringify(commonIndices_Test1_version0)} and ${JSON.stringify(commonIndices_Test1_version1)} should result with ${JSON.stringify(commonIndices_Test1_array1)}. Instead, we get ${JSON.stringify(commonIndices_Test1_result)}`);
}



console.log('     Testing commonIndicesVersion0');
const commonIndicesVersion0_Test1_array1 = [0,1];

const commonIndicesVersion0_Test1_result = JSON.stringify(commonIndicesVersion0(commonIndices_Test1_version0,commonIndices_Test1_version1));
if (commonIndicesVersion0_Test1_result === JSON.stringify(commonIndicesVersion0_Test1_array1))
  console.log("   Test 1.2 succeeded");
else {
  console.log("   Test 1.2 failed");
  console.log(`   Calling commonIndices on ${JSON.stringify(commonIndices_Test1_version0)} and ${JSON.stringify(commonIndices_Test1_version1)} should result with ${JSON.stringify(commonIndicesVersion0_Test1_array1)}. Instead, we get ${JSON.stringify(commonIndicesVersion0_Test1_result)}`);
}

console.log('    Testing beginningInsertVersion0');
beginningInsertVersion0_Test1_result = [
  {
    ops: [
      {insert: 'Tomer'}
    ]
  },
  {
    ops: [
      {insert: 'Sringjoy'}
    ]
  },
  {
    ops: [
      {insert: 'yes'}
    ]
  }
];

const beginningInsertVersion0_Test1_version0 = beginningInsertVersion0(commonIndices_Test1_version0,commonIndices_Test1_version1,[0,1],[1,2]);
if (JSON.stringify(beginningInsertVersion0_Test1_result) == JSON.stringify(beginningInsertVersion0_Test1_version0))
  console.log("   Test 1.3 succeeded");
else {
  console.log("   Test 1.3 failed");
  console.log(`   Calling commonIndices on ${JSON.stringify(commonIndices_Test1_version0)} and ${JSON.stringify(commonIndices_Test1_version1)} should result with ${JSON.stringify(beginningInsertVersion0_Test1_result)}. Instead, we get ${JSON.stringify(beginningInsertVersion0_Test1_version0)}`);
}

console.log('Test 2');

const Test2_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];

const Test2_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];

/*
console.log('    Testing displayDelta');
const displayDelta_test = [
  {insert: 'a'},
  {insert: '\n'},
  {insert: 'b'},
  {insert: '\n'}
];
const displayDelta_result = displayDelta(Test2_version0);
if(JSON.stringify(displayDelta_result) == JSON.stringify(displayDelta_test)) console.log('   Test 2.2 succeeded');
else {
  console.log("   Test 2.2 failed");
  console.log(`   Calling displayDelta on ${JSON.stringify(Test2_version0)} should result 
  with ${JSON.stringify(displayDelta_test)}. Instead, we get ${JSON.stringify(displayDelta_result)}`);
}
*/

console.log('    Testing middleInsertVersion0');
const middleInsertVersion0_test = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];

const middleInsertVersion0_result = middleInsertVersion0(Test2_version0, Test2_version1, commonIndicesVersion0(Test2_version0,Test2_version1), commonIndicesVersion1(Test2_version0,Test2_version1));
if (JSON.stringify(middleInsertVersion0_test) == JSON.stringify(middleInsertVersion0_result))
  console.log("   Test 2.1 succeeded");
else {
  console.log("   Test 2 failed");
  console.log(`   Calling middleInsertVersion0 on ${JSON.stringify(Test2_version0)} and ${JSON.stringify(Test2_version1)} 
  should result with ${JSON.stringify(middleInsertVersion0_test)}. Instead, we get ${JSON.stringify(middleInsertVersion0_result)}`);
}

console.log('Test 3');
console.log('     Testing commonIndicesVersion0');
const Test3_version0 = [
  {
    ops: [
      {insert: 'Sringjoy'}
    ]
  },
  {
    ops: [
      {insert: 'yes'}
    ]
  }
];
const Test3_version1 = [
  {
    ops: [
      {insert: 'Tomer'}
    ]
  }
];

const test3_1_test = [];
const test3_1_result = commonIndicesVersion0(Test3_version0, Test3_version1);

if(JSON.stringify(test3_1_test) == JSON.stringify(test3_1_result)){
  console.log('     Test 3.1 succeeded');
}
else {
  console.log("   Test 3.1 failed");
  console.log(`   Calling displayDelta on ${JSON.stringify(Test3_version0)} should result 
  with ${JSON.stringify(test3_1_test)}. Instead, we get ${JSON.stringify(test3_1_result)}`);
}

const test3_2_test = [];
const test3_2_result = commonIndicesVersion1(Test3_version0, Test3_version1);

console.log('     Testing commonIndicesVersion1');
if(JSON.stringify(test3_2_test) == JSON.stringify(test3_2_result)){
  console.log('     Test 3.2 succeeded');
}
else {
  console.log("   Test 3.2 failed");
  console.log(`   Calling displayDelta on ${JSON.stringify(Test3_version0)} should result with ${JSON.stringify(test3_2_test)}. 
  Instead, we get ${JSON.stringify(test3_2_result)}`);
}

//merging(merging1, merging1);
console.log('Test 4');
console.log('     Testing commonIndicesVersion0');

const Test4_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];
const Test4_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];

const test4_1_test = [0, 1];
const test4_1_result = commonIndicesVersion0(Test4_version0, Test4_version1);

if(JSON.stringify(test4_1_test) == JSON.stringify(test4_1_result)){
  console.log('     Test 4.1 succeeded');
}
else {
  console.log("   Test 4.1 failed");
  console.log(`   Calling commonIndicesVersion0 on ${JSON.stringify(Test4_version0)} and ${JSON.stringify(Test4_version1)} 
  should result with ${JSON.stringify(test4_1_test)}. Instead, we get ${JSON.stringify(test4_1_result)}`);
}

console.log('     Testing commonIndicesVersion1');
const test4_2_test = [0, 2];
const test4_2_result = commonIndicesVersion1(Test4_version0, Test4_version1);

if(JSON.stringify(test4_1_test) == JSON.stringify(test4_1_result)){
  console.log('     Test 4.2 succeeded');
}
else {
  console.log("   Test 4.2 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test4_version0)} and ${JSON.stringify(Test4_version1)} 
  should result with ${JSON.stringify(test4_2_test)}. Instead, we get ${JSON.stringify(test4_2_result)}`);
}

console.log('Test 5');
const Test5_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const Test5_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
console.log('     Testing commonIndicesVersion1');
const test5_1test = [0, 2, 3];
const test5_1result = commonIndicesVersion1(Test5_version0, Test5_version1);

if(JSON.stringify(test5_1test) == JSON.stringify(test5_1result)){
  console.log('     Test 5.1 succeeded');
}
else {
  console.log("   Test 5.1 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test5_version0)} and ${JSON.stringify(Test5_version1)} 
  should result with ${JSON.stringify(test5_1test)}. Instead, we get ${JSON.stringify(test5_1result)}`);
}

console.log('     Testing commonIndicesVersion0');
const test5_2test = [0, 1, 2];
const test5_2result = commonIndicesVersion0(Test5_version0, Test5_version1);

if(JSON.stringify(test5_2test) == JSON.stringify(test5_2result)){
  console.log('     Test 5.2 succeeded');
}
else {
  console.log("   Test 5.1 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test5_version0)} and ${JSON.stringify(Test5_version1)} 
  should result with ${JSON.stringify(test5_1test)}. Instead, we get ${JSON.stringify(test5_1result)}`);
}


console.log('Test 6');
const Test6_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const Test6_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
console.log('     Testing commonIndicesVersion0');
const test6_1test = [0, 1];
const test6_1result = commonIndicesVersion0(Test6_version0, Test6_version1);

if(JSON.stringify(test6_1test) == JSON.stringify(test6_1result)){
  console.log('     Test 6.1 succeeded');
}
else {
  console.log("   Test 6.1 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test6_version0)} and ${JSON.stringify(Test6_version1)} 
  should result with ${JSON.stringify(test6_1test)}. Instead, we get ${JSON.stringify(test6_1result)}`);
}

console.log('     Testing commonIndicesVersion1');
const test6_2test = [0, 2];
const test6_2result = commonIndicesVersion1(Test6_version0, Test6_version1);

if(JSON.stringify(test6_2test) == JSON.stringify(test6_2result)){
  console.log('     Test 6.2 succeeded');
}
else {
  console.log("   Test 6.2 failed");
  console.log(`   Calling commonIndicesVersion0 on ${JSON.stringify(Test6_version0)} and ${JSON.stringify(Test6_version1)} 
  should result with ${JSON.stringify(test6_2test)}. Instead, we get ${JSON.stringify(test6_2result)}`);
}

console.log('     Testing beginningInsertVersion0');
const test6_3test = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];

const test6_3result = beginningInsertVersion0(Test6_version0, Test6_version1, commonIndicesVersion0(Test6_version0, Test6_version1), commonIndicesVersion1(Test6_version0, Test6_version1));
if (JSON.stringify(test6_3test) == JSON.stringify(test6_3result))
  console.log("     Test 6.3 succeeded");
else {
  console.log("     Test 6.3 failed");
  console.log(`      Calling beginningInsertVersion0 on ${JSON.stringify(Test6_version0)} and ${JSON.stringify(Test6_version1)} 
  should result with ${JSON.stringify(test6_3test)}. Instead, we get ${JSON.stringify(test6_3result)}`);
}

console.log('Test 7');
const Test7_version0 = [
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const Test7_version1 = [
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
console.log('     Testing commonIndicesVersion1');
const test7_1test = [0, 2];
const test7_1result = commonIndicesVersion1(Test7_version0, Test7_version1);

if(JSON.stringify(test7_1test) == JSON.stringify(test7_1result)){
  console.log('     Test 7.1 succeeded');
}
else {
  console.log("   Test 7.1 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test7_version0)} and ${JSON.stringify(Test7_version1)} 
  should result with ${JSON.stringify(test7_1test)}. Instead, we get ${JSON.stringify(test7_1result)}`);
}

console.log('     Testing commonIndicesVersion0');
const test7_2test = [0, 1];
const test7_2result = commonIndicesVersion0(Test7_version0, Test7_version1);

if(JSON.stringify(test7_2test) == JSON.stringify(test7_2result)){
  console.log('     Test 7.2 succeeded');
}
else {
  console.log("   Test 7.2 failed");
  console.log(`   Calling commonIndicesVersion1 on ${JSON.stringify(Test7_version0)} and ${JSON.stringify(Test7_version1)} 
  should result with ${JSON.stringify(test7_2test)}. Instead, we get ${JSON.stringify(test7_2result)}`);
}

console.log('     Testing beginningInsertVersion0');
const test7_3test = [
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];

const test7_3result = beginningInsertVersion0(Test7_version0, Test7_version1, commonIndicesVersion0(Test7_version0, Test7_version1), commonIndicesVersion1(Test7_version0, Test7_version1));
if (JSON.stringify(test7_3test) == JSON.stringify(test7_3result))
  console.log("     Test 7.3 succeeded");
else {
  console.log("     Test 7.3 failed");
  console.log(`      Calling beginningInsertVersion0 on ${JSON.stringify(Test7_version0)} and ${JSON.stringify(Test7_version1)} 
  should result with ${JSON.stringify(test7_3test)}. Instead, we get ${JSON.stringify(test7_3result)}`);
}

console.log('     Testing beginningInsertVersion1');
const test7_4test = [
  {
    ops: [
      {insert: 'c'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];

const test7_4result = beginningInsertVersion1(Test7_version0, Test7_version1, commonIndicesVersion0(Test7_version0, Test7_version1), commonIndicesVersion1(Test7_version0, Test7_version1));
if (JSON.stringify(test7_4test) == JSON.stringify(test7_4result))
  console.log("     Test 7.4 succeeded");
else {
  console.log("     Test 7.4 failed");
  console.log(`      Calling beginningInsertVersion0 on ${JSON.stringify(Test7_version0)} and ${JSON.stringify(Test7_version1)} 
  should result with ${JSON.stringify(test7_4test)}. Instead, we get ${JSON.stringify(test7_4result)}`);
}

console.log('Test 8');
const Test8_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const Test8_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'a'}
    ]
  }
];

console.log('     Testing middleInsertVersion1');
const test8_1test = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'a'}
    ]
  }
];

const test8_1result = middleInsertVersion1(Test8_version0, Test8_version1, commonIndicesVersion0(Test8_version0, Test8_version1), commonIndicesVersion1(Test8_version0, Test8_version1));
if (JSON.stringify(test8_1test) == JSON.stringify(test8_1result))
  console.log("     Test 8.1 succeeded");
else {
  console.log("     Test 8.1 failed");
  console.log(`      Calling beginningInsertVersion1 on ${JSON.stringify(Test8_version0)} and ${JSON.stringify(Test8_version1)} 
  should result with ${JSON.stringify(test8_1test)}. Instead, we get ${JSON.stringify(test8_1result)}`);
}

console.log('Test 9');
const Test9_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const Test9_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'd'}
    ]
  },
  {
    ops: [
      {insert: 'd'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];

console.log('     Testing middleInsertVersion0');
const test9_1test = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'd'}
    ]
  },
  {
    ops: [
      {insert: 'd'}
    ]
  },
  {
    ops: [
      {insert: 'c'}
    ]
  }
];
const test9_1result = middleInsertVersion0(Test9_version0, Test9_version1, commonIndicesVersion0(Test9_version0, Test9_version1), commonIndicesVersion1(Test9_version0, Test9_version1));
if (JSON.stringify(test9_1test) == JSON.stringify(test9_1result))
  console.log("     Test 9.1 succeeded");
else {
  console.log("     Test 9.1 failed");
  console.log(`      Calling beginningInsertVersion1 on ${JSON.stringify(Test9_version0)} and ${JSON.stringify(Test9_version1)} 
  should result with ${JSON.stringify(test9_1test)}. Instead, we get ${JSON.stringify(test9_1result)}`);
}

console.log('Test 10');
const Test10_version0 = [
  {
    ops: [
      {insert: 'a'}
    ]
  },
  {
    ops: [
      {insert: 'b'}
    ]
  }
];
const Test10_version1 = [
  {
    ops: [
      {insert: 'b'}
    ]
  },
  {
    ops: [
      {insert: 'a'}
    ]
  },
];

console.log('     Testing commonIndicesVersion0');
const test10_1test = [0];
const test10_1result = commonIndicesVersion0(Test10_version0, Test10_version1);
if (JSON.stringify(test10_1test) == JSON.stringify(test10_1result))
  console.log("     Test 10.1 succeeded");
else {
  console.log("     Test 10.1 failed");
  console.log(`      Calling commonIndicesVersion1 on ${JSON.stringify(Test10_version0)} and ${JSON.stringify(Test10_version1)} 
  should result with ${JSON.stringify(test10_1test)}. Instead, we get ${JSON.stringify(test10_1result)}`);
}

console.log('     Testing commonIndicesVersion1');
const test10_2test = [1];
const test10_2result = commonIndicesVersion1(Test10_version0, Test10_version1);
if (JSON.stringify(test10_1test) == JSON.stringify(test10_1result))
  console.log("     Test 10.2 succeeded");
else {
  console.log("     Test 10.2 failed");
  console.log(`      Calling commonIndicesVersion1 on ${JSON.stringify(Test10_version0)} and ${JSON.stringify(Test10_version1)} 
  should result with ${JSON.stringify(test10_2test)}. Instead, we get ${JSON.stringify(test10_2result)}`);
}

const v0 = {ops: [{insert :'x'}]};
const v1 = {ops: [{insert :'a'}]};

merging(v0, v1);