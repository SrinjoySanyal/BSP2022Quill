const fs = require('fs');
const Simplegit = require('simple-git');
//simpleGit().clean(simpleGit.CleanOptions.FORCE);

const git = new Simplegit();

git.init().addRemote("origin", "https://github.com/SrinjoySanyal/subrepo.git");

function commonIndices(version0, version1) {
  let index1 = 0;
  let array1 = [];
  for(element in version0){
    if(element in version1.slice(index1 + 1, version1.length - 1)){
      array1.push(version1.indexOf(element));
      index1 = version0.indexOf(element);
    }
  }
  return array1;
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
       * Goal: Create an array with the common indices
       */
      array1 = commonIndices(version0,version1);

      if(version0.slice(0, array1[0]).length == 0){
        if(version1.slice(0, array1[0]).length != 0){
          version0.splice(0, version1.slice(0, array1[0]));
        }
      }

      if(version1.slice(0, array1[0]).length == 0){
        if(version0.slice(0, array1[0]).length != 0){
          version1.splice(0, version0.slice(0, array1[0]));
        }
      }

      for(i = 0; i < array1.length - 1; i++){
        if(version0.slice(array1[i] + 1, array1[i + 1]).length == 0){
          if(version1.slice(array1[i] + 1, array1[i + 1]).length != 0){
            version0.splice(i, version1.slice(array1[i] + 1, array1[i + 1]));
          }
        }
      }

      for(j = 0; j < array1.length - 1; j++){
        if(version1.slice(array1[j] + 1, array1[j + 1]).length == 0){
          if(version0.slice(array1[j] + 1, array1[j + 1]).length != 0){
            version1.splice(j, version0.slice(array1[j] + 1, array1[j + 1]).length)
          }
        }
      }

      fs.writeFile('file.json', JSON.stringify(version0), (err) => {
        if(err){
          console.log(err);
        }
        else{
          git.add('file.json').push().branch('Merge-branch').checkout({'-b':'Merge-branch'});
          fs.writeFile('file.json', JSON.stringify(version1), (err) => {
            if(err){
              console.log(err);
            }
            else{
              git.add('file.json').push().checkout({'-b':'master'}).merge("master","Merge-branch",{'-m':'"merged"'}, (msg, err) => {
                if(err){
                  console.log(err);
                }
                else{
                  console.log('Merge successful');
                }
              }).deleteLocalBranch('Merge-branch');
            }
          });
        }
      });
    }
  });
}

console.log('Testing commonIndices');

console.log('   Test 1');
const commonIndices_Test1_version0 = [
  {
    ops: [
      {insert: 'Sringjoy'}
    ]
  }
]
const commonIndices_Test1_version1 = [
  {
    ops: [
      {insert: 'Tomer'}
    ]
  }
]
const commonIndices_Test1_array1 = []

const commonIndices_Test1_result = JSON.stringify(commonIndices(commonIndices_Test1_version0,commonIndices_Test1_version1));
if (commonIndices_Test1_result === JSON.stringify(commonIndices_Test1_array1))
  console.log("   Test 1 succeeded");
else {
  console.log("   Test 1 failed");
  console.log(`   Calling commonIndices on ${JSON.stringify(commonIndices_Test1_version0)} and ${JSON.stringify(commonIndices_Test1_version1)} should result with ${JSON.stringify(commonIndices_Test1_array1)}. Instead, we get ${JSON.stringify(commonIndices_Test1_result)}`);
}

let test = '[{"ops":[{"insert":"Srinjoy"}]}]';

//if (uploadDelta(JSON.parse(test)) == null)
//  console.log("Test 1 failed");
