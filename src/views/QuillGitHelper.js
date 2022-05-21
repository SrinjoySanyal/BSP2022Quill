const fs = require('fs');
const Simplegit = require('simple-git');
//simpleGit().clean(simpleGit.CleanOptions.FORCE);

const git = new Simplegit();

git.init();

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

        interestElement = element0;
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
      //version0.splice(0, 0, version1.slice(0, array1[0]));
    }
  }
  return version0;
}

function beginningInsertVersion1(version0, version1, array0, array1){
  if(version1.slice(0, array1[0]).length == 0){
    if(version0.slice(0, array0[0]).length != 0){
      for(let ops = 0; ops < version0.slice(0, array1[0]).length; ops++){
        version1.splice(ops, 0, version0.slice(0, array1[0])[ops]);
      }
      //version0.splice(0, 0, version1.slice(0, array1[0]));
    }
  }
  return version0;
}

function middleInsertVersion0(version0, version1, array0, array1){
  for(i = 0; i < array0.length - 1; i++){
    if(version0.slice(array0[i], array0[i + 1]).length == 0){
      if(version1.slice(array1[i], array1[i + 1]).length != 0){
        for(let ops = array1[i]; ops < version1.slice(array1[i], array1[i + 1]).length; ops++){
          version0.splice(ops, 0, version1.slice(array1[i], array1[i + 1])[ops]);
        }
        //version0.splice(0, 0, version1.slice(0, array1[0]));
      }
    }
  }
  return version0;
}

function middleInsertVersion0(version0, version1, array0, array1){
  for(i = 0; i < array1.length - 1; i++){
    if(version1.slice(array1[i], array1[i + 1]).length == 0){
      if(version0.slice(array0[i], array0[i + 1]).length != 0){
        for(let ops = array0[i]; ops < version0.slice(array0[i], array0[i + 1]).length; ops++){
          version1.splice(ops, 0, version0.slice(array0[i], array0[i + 1])[ops]);
        }
        //version0.splice(0, 0, version1.slice(0, array1[0]));
      }
    }
  }
  return version1;
}

function merging(version0, version1){
  fs.writeFile('file.json', JSON.stringify(version0), (err) => {
    if(err) console.log(err);
    else{
      git.add('file.json').commit('1st part').push('https://github.com/SrinjoySanyal/BSP2022Quill.git', 'master')
      .then(fs.writeFile('file.json', JSON.stringify(version1),(err) => {
        if(err) console.log(err);
        else{
          git.pull('https://github.com/SrinjoySanyal/BSP2022Quill.git', 'master', {'--rebase': 'true'}).branch(['<Merging>'])
          .checkoutBranch('Merging', 'master').add('file.json').commit('2nd part').push('https://github.com/SrinjoySanyal/BSP2022Quill.git')
          .mergeFromTo('https://github.com/SrinjoySanyal/BSP2022Quill.git', 'master').then((response) => {console.log(response);}).catch((err) => {console.log(err);})
        }
      }));
    }
  });
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

      merging(version0, version1);

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
console.log('    Testing middleInsertVersion0');

const Test2_version0 = [
  {
    ops: [
      {insert: 'Tomer'}
    ]
  },
  {
    ops: [
      {insert: 'yes'}
    ]
  }
];

const Test2_version1 = [
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

const middleInsertVersion0_test = [
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

const middleInsertVersion0_result = middleInsertVersion0(Test2_version0, Test2_version1, commonIndicesVersion0(Test2_version0,Test2_version1), commonIndicesVersion1(Test2_version0,Test2_version1));

if (JSON.stringify(middleInsertVersion0_test) == JSON.stringify(middleInsertVersion0_result))
  console.log("   Test 2.1 succeeded");
else {
  console.log("   Test 2 failed");
  console.log(`   Calling middleInsertVersion0 on ${JSON.stringify(Test2_version0)} and ${JSON.stringify(Test2_version1)} should result with ${JSON.stringify(middleInsertVersion0_test)}. Instead, we get ${JSON.stringify(middleInsertVersion0_version0)}`);
}

console.log('    Testing displayDelta');

const displayDelta_test = [
  {insert: 'Tomer'},
  {insert: '\n'},
  {insert: 'yes'},
  {insert: '\n'}
];
const displayDelta_result = displayDelta(Test2_version0);
if(JSON.stringify(displayDelta_result) == JSON.stringify(displayDelta_test)) console.log('   Test 2.2 succeeded');
else {
  console.log("   Test 2.2 failed");
  console.log(`   Calling displayDelta on ${JSON.stringify(Test2_version0)} should result with ${JSON.stringify(displayDelta_test)}. Instead, we get ${JSON.stringify(displayDelta_result)}`);
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
  console.log(`   Calling displayDelta on ${JSON.stringify(Test3_version0)} should result with ${JSON.stringify(test3_1_test)}. Instead, we get ${JSON.stringify(test3_1_result)}`);
}

const test3_2_test = [];
const test3_2_result = commonIndicesVersion1(Test3_version0, Test3_version1);

if(JSON.stringify(test3_2_test) == JSON.stringify(test3_2_result)){
  console.log('     Test 3.2 succeeded');
}
else {
  console.log("   Test 3.2 failed");
  console.log(`   Calling displayDelta on ${JSON.stringify(Test3_version0)} should result with ${JSON.stringify(test3_2_test)}. Instead, we get ${JSON.stringify(test3_2_result)}`);
}

//merging(merging1, merging1);
