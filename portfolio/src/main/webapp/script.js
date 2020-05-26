// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
/**
 * Adds a random fact to the page.
 */
function addRandomFact() {
  const facts =
      ['I\'m Advanced Scuba Certified', 'Age: 20', 'Favorite Song: 1985 (Bowling for Soup'];

  // Pick a random fact.
  let fact = facts[Math.floor(Math.random() * facts.length)];

  // Make sure it is not the same random fact from last click.
  while(document.getElementById('fact-container').innerText === fact) {
    fact = facts[Math.floor(Math.random() * facts.length)];
    console.log('reassigned');
  }

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}
