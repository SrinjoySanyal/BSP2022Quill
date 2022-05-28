var ancestor, conflicts, fs, make_conflict_node, merge, ours, theirs;
fs = require('fs');
try {
ancestor = JSON.parse(fs.readFileSync(process.argv[2]));
} catch(e) {
  console.log('Incorrect JSON in ancestor file '+process.argv[2]+ ' '+e.message);
  process.exit(1);
}
try {
ours = JSON.parse(fs.readFileSync(process.argv[3]));
} catch(e) {
  console.log('Incorrect JSON in ours file '+process.argv[3]+ ' '+e.message);
  process.exit(1);
}
try {
theirs = JSON.parse(fs.readFileSync(process.argv[4]));
} catch(e) {
  console.log('Incorrect JSON in theirs file '+process.argv[4]+ ' '+e.message);
  process.exit(1);
}
conflicts = false;
make_conflict_node = function(ancestor_value, our_value, their_value, path) {
  var res;
  res = {};
  res['CONFLICT'] = '<<<<<<<<>>>>>>>>';
  res['OURS'] = our_value != null ? our_value : null;
  res['THEIRS'] = their_value != null ? their_value : null;
  res['ANCESTOR'] = ancestor_value != null ? ancestor_value : null;
  res['PATH'] = path.join('.');
  return res;
};
merge = function(ancestor_node, our_node, their_node, path) {
  var ancestor_value, key, keys, our_value, sub_path, their_value, _, _results;
  if (path == null) {
    path = [];
  }
  keys = {};
  for (key in our_node) {
    _ = our_node[key];
    keys[key] = true;
  }
  for (key in their_node) {
    _ = their_node[key];
    keys[key] = true;
  }
  _results = [];
  for (key in keys) {
    _ = keys[key];
    ancestor_value = ancestor_node != null ? ancestor_node[key] : void 0;
    our_value = our_node != null ? our_node[key] : void 0;
    their_value = their_node != null ? their_node[key] : void 0;
    sub_path = path.concat(key);
    if (our_value !== their_value) {
      if (JSON.stringify(their_value) === JSON.stringify(ancestor_value)) {
        continue;
      } else if (JSON.stringify(our_value) === JSON.stringify(ancestor_value)) {
        _results.push(our_node[key] = their_value);
      } else if (our_value && their_value && typeof our_value === 'object' && typeof their_value === 'object') {
        _results.push(merge(ancestor_value, our_value, their_value, sub_path));
      } else {
        conflicts = true;
        _results.push(our_node[key] = make_conflict_node(ancestor_value, our_value, their_value, sub_path));
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};
merge(ancestor, ours, theirs);
fs.writeFileSync(process.argv[3], JSON.stringify(ours, null, 4));
process.exit(conflicts ? 1 : 0);