const ofLen = 5
function* lowerCaseStrings() {
  let digits = ['a', 'b'];
  let current = 0;
  while (current <= digits.length ** ofLen) {
    current++;
    let newBase = current.toString(2);
    const lowerCased = "a" * ofLen;
    for (let i = 0; i < newBase.length; i++) {
      const charIndex = digits[i];
      const char = digits[charIndex];
      lowerCased[i] = char;
    }
    yield lowerCased;
  }
}

while (true) {
  let gen = lowerCaseStrings();
  console.log(gen.next());
}
