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

async function getUserLoginStatus() {
  const url = '/login';
  let response = await fetch(url);
  let text = await response.text();
  return text;
}

/** Loads and displays comments according to a limit */
async function loadCommentSection(commentLimit) {
    let userLoginInfo = await getUserLoginStatus();
    let isLoggedIn = "Y" === userLoginInfo[0];

    // clear previous elements to refresh login status
    var loginDOM = document.getElementsByClassName('login');
    if (loginDOM != null) {
        Array.from(currentDM).forEach(function (element) {
            element.remove();
        })
    }

    // clear previous elements to refresh comments
    var commentDOM = document.getElementsByClassName('indiv-comments');
    if (commentDOM != null) {
        Array.from(currentDOM).forEach(function (element) {
            element.remove();
        })
    }

    // split text stream by new line character, use REGEX to put in HTML
    const words = userLoginInfo.split("\n");
    for (let i = 1; i < words.length - 1; i++) {
        const loginSection = document.getElementById('content');
        const htmlTag = words[i].match(/^<(.*?)>/)[1];
        const textContent = words[i].match(/>(.*)</)[1];
        const loginElement = document.createElement(htmlTag);
        loginElement.setAttribute("class", "login");
        loginElement.innerHTML = textContent;
        loginSection.appendChild(loginElement);
    }

    // if user is logged in, display comments
    if (isLoggedIn) {
      const userEmail = userLoginInfo.match(/\S*@\S*[com|edu|org|gov]/);
      document.getElementById('comment').value = userEmail;
      document.getElementById('post-content').style.display = "block";
      commentURL = `/list-comments?limit=${commentLimit}`;
      fetch(commentURL)
        .then(response => response.json())
        .then((comments) => {
        // Build the list of comments.
        const commentLe = document.getElementById('post-content');
        for (let comment of comments) {
          commentLe.appendChild(createCommentElement(comment));
        }
      });
    }
    else {
      document.getElementById('post-content').style.display = "none";
    }
}

/** Creates an element that represents a task, including its delete button. */
function createCommentElement(comment) {
  const commentElement = document.createElement('div');
  commentElement.setAttribute('class', 'indiv-comments');
  const pElement = document.createElement('p');
  pElement.innerText = `${comment.user}: ${comment.commentText}`;
  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);
    commentElement.remove();
  });

  commentElement.appendChild(pElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}

/** Tells the server to delete the task. */
function deleteComment(comment) {
  const deleteString = `/delete-comment?id=${comment.id}`;
  fetch(deleteString, {method: 'DELETE'});
}
