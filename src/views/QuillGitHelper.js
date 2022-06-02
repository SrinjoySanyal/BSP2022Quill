const fs = require('fs');
const { resolve } = require('path');
const Simplegit = require('simple-git');

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

  for(let i = 0; i < array0.length - 1; i++){
    if(version0.slice(array0[i] + 1, array0[i + 1]).length == 0){
      if(version1.slice(array1[i] + 1, array1[i + 1]).length != 0){
        for(let ops = 0; ops < version1.slice(array1[i] + 1, array1[i + 1]).length; ops++){
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
        for(let ops = 0; ops < version0.slice(array0[i] + 1, array0[i + 1]).length; ops++){
          version1.splice(array0[i] + 1 + ops, 0, version0.slice(array0[i] + 1, array0[i + 1])[ops]);
        }
        //version0.splice(0, 0, version1.slice(0, array1[0]));
      }
    }
  }
  return version1;
}

function endInsertVersion0(version0, version1, array0, array1){
  if(version0.slice(array0[array0.length - 1] + 1, version0.length).length == 0){
    if(version1.slice(array1[array1.length - 1] + 1, version1.length).length != 0){
      for(let ops = 0; ops < version1.slice(array1[array1.length - 1] + 1, version1.length).length; ops++){
        version0.splice(version0.length + ops, 0, version1.slice(array1[array1.length - 1] + 1, version1.length)[ops]);
      }
    }
  }
  return version0;
}

function endInsertVersion1(version0, version1, array0, array1){
  if(version1.slice(array1[array1.length - 1] + 1, version1.length).length == 0){
    if(version0.slice(array0[array0.length - 1] + 1, version0.length).length != 0){
      for(let ops = 0; ops < version0.slice(array0[array0.length - 1] + 1, version0.length).length; ops++){
        version1.splice(version1.length + ops, 0, version0.slice(array0[array0.length - 1] + 1, version0.length)[ops]);
      }
    }
  }
  return version1;
}

function displayDelta(version){
  finalDelta = []
  let l = version.length;
  for(let i = 1; i < l; i++){
    version.splice(i, 0, {ops: [{insert: '\n'}]});
  }
  version.push({ops: [{insert: '\n'}]});
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
function getCurrentNumber(){

  function setCurrentNumber(number){
    //console.log("This " + num);
    return new Promise(function(resolve, reject){
      fs.writeFile('versionNum.txt', String(parseInt(number)), 'utf-8', (err) => {
        if(err) reject(err);
        else{resolve("finish");}
      });
    })
    
  } 
  //var numb = 0;
  let numb = fs.readFileSync('versionNum.txt', 'utf-8');
  console.log(numb);
  let num = parseInt(numb) + 1;
  console.log(num);

  setCurrentNumber(num)
  .then(Simplegit().checkout('master').add(['versionNum.txt']).commit('commit').push('origin', 'master'))
  .then(console.log('done here')).catch((err) => {if(err) throw err;});

  return num;
}

function getCurrentVersion(num){
  var version0 = []

  Simplegit().checkout(['-b', 'branch' + String(num)]).checkout('master');
  fs.readFile('folder.json', 'utf-8', (err, data) => {
    if(data) version0 = JSON.parse(data);
  });

  return version0;
}

function modifyVersion0(version0, version1){
  let a0 = commonIndicesVersion0(version0, version1);
  let a1 = commonIndicesVersion1(version0, version1);
  version0 = beginningInsertVersion0(version0, version1, a0, a1);
  version0 = middleInsertVersion0(version0, version1, a0, a1);
  version0 = endInsertVersion0(version0, version1, a0, a1);
  return version0;
}

function modifyVersion1(version0, version1){
  let a0 = commonIndicesVersion0(version0, version1);
  let a1 = commonIndicesVersion1(version0, version1);
  version1 = beginningInsertVersion1(version0, version1, a0, a1);
  version1 = middleInsertVersion1(version0, version1, a0, a1);
  version1 = endInsertVersion1(version0, version1, a0, a1);
  return version1;
}
//Problem here to solve
function getVersion0(){
  var output;
  Simplegit().checkout('master');
  output = fs.readFileSync('folder.json', 'utf-8');
  console.log("output " + output);
  return JSON.parse(output);
}

function merging(num, modifiedVersion){
  function masterPush(v0){
    return new Promise(function(resolve, reject){
      fs.writeFile('folder.json', JSON.stringify(v0), 'utf-8', function(err){
        if(err) reject(err);
        else resolve('done1');
      });
    });
  }

  function branchPush(v1){
    return new Promise(function(resolve, reject){
      fs.writeFile('folder.json', JSON.stringify(v1), 'utf-8', function(err){
        if(err) reject(err);
        else resolve('done2');
      });
    });
  }

  if(num == 1){
    Simplegit().checkout('branch' + String(num))
    .then(branchPush(modifiedVersion))
    .then(
      Simplegit()
      .add(['folder.json'])
      .commit('branch1')
    ).then(
      Simplegit()
      .checkout('master')
      .merge(['branch' + String(num)])
      .then((result) => console.log(result)).catch((err) => console.log(err))
    )
    .then(Simplegit().add(['folder.json']).commit('merging').push('origin', 'master'));
  }
  
  if(num > 1){
    let v0 = getVersion0();
    console.log(JSON.stringify(v0));
    v0 = modifyVersion0(v0, modifiedVersion);
    console.log(JSON.stringify(v0));
    let v1 = modifyVersion1(v0, modifiedVersion);
    console.log(JSON.stringify(v1));
    masterPush(v0).then(
      Simplegit()
      .checkout('master')
      .add(['folder.json'])
      .commit('master' + String(num))
      .checkout('branch' + String(num))
    ).then(branchPush(v1)).then(
      Simplegit()
      .checkout('branch' + String(num))
      .add(['folder.json'])
      .commit('branch' + String(num))
      .checkout('master')
      .merge(['-m', 'merged', 'branch' + String(num)]).then((result) => console.log(result)).catch((err) => {
        console.log(err);
        Simplegit().merge(['--abort'])
      })
    ).then(Simplegit().add(['folder.json']).commit('merging').push('origin', 'master'));
  }
}

function exit(num){
  Simplegit().checkout('master').branch(['-D', 'branch' + String(num)]);
}
/**
 * Test all possible cases of version0 and version1
 */
console.log("Test 1");
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
//console.log([].length);
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

console.log('Test 11');
const Test11_version0 = [
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
const Test11_version1 = [];

console.log('     Testing commonIndicesVersion0');
const test11_1test = [];
const test11_1result = commonIndicesVersion0(Test11_version0, Test11_version1);
if (JSON.stringify(test11_1test) == JSON.stringify(test11_1result))
  console.log("     Test 11.1 succeeded");
else {
  console.log("     Test 10.1 failed");
  console.log(`      Calling commonIndicesVersion1 on ${JSON.stringify(Test11_version0)} and ${JSON.stringify(Test11_version1)} 
  should result with ${JSON.stringify(test11_1test)}. Instead, we get ${JSON.stringify(test11_1result)}`);
}

console.log('Test 12');
const Test12_version0 = [
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
const Test12_version1 = [
  {
    ops: [
      {insert: 'a'}
    ]
  }
];

console.log('     Testing commonIndicesVersion0');
const test12_1test = [0];
const test12_1result = commonIndicesVersion0(Test12_version0, Test12_version1);
if (JSON.stringify(test12_1test) == JSON.stringify(test12_1result))
  console.log("     Test 12.1 succeeded");
else {
  console.log("     Test 12.1 failed");
  console.log(`      Calling commonIndicesVersion1 on ${JSON.stringify(Test12_version0)} and ${JSON.stringify(Test12_version1)} 
  should result with ${JSON.stringify(test12_1test)}. Instead, we get ${JSON.stringify(test12_1result)}`);
}

console.log('     Testing endInsertVersion1');
const test12_2test = [
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
const test12_2result = endInsertVersion1(Test12_version0, Test12_version1, [0], [0]);
if (JSON.stringify(test12_2test) == JSON.stringify(test12_2result))
  console.log("     Test 12.2 succeeded");
else {
  console.log("     Test 12.2 failed");
  console.log(`      Calling commonIndicesVersion1 on ${JSON.stringify(Test12_version0)} and ${JSON.stringify(Test12_version1)} 
  should result with ${JSON.stringify(test12_2test)}. Instead, we get ${JSON.stringify(test12_2result)}`);
}

console.log("Test 13")

const v1 = [{ops: [{insert :'a'}]}, {ops: [{insert :'b'}]}];
const v2 = [{ops: [{insert :'b'}]}, {ops: [{insert :'c'}]}];

//let n1 = getCurrentNumber();
//console.log("This is1 " + n1);
//let display1 = getCurrentVersion(n1);
//console.log(JSON.stringify(display1));
//let n2 = getCurrentNumber();
//console.log("This is2 " + n2);
//let display2 = getCurrentVersion(n2);
//console.log(JSON.stringify(display2));

//
//

merging(1, v1);
//merging(n2, v2);

