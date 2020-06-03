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

function loadCommentSection(commentLimit) {
  
    // clear previous elements
    var currentDOM = document.getElementsByClassName('indiv-comments');
    console.log(currentDOM);
    if (currentDOM != null) {
        console.log(currentDOM);
        Array.from(currentDOM).forEach(function (element) {
            console.log(element);
            element.remove();
        })
    }

    commentURL = '/list-comments?limit=' + commentLimit;
    fetch(commentURL)
    .then(response => response.json())
    .then((comments) => {

    /* Build the list of comments.
    */
    const commentLe = document.getElementById('post-content');

    comments.forEach((comment) => {
      commentLe.appendChild(createCommentElement(comment));
    })

  });
}

/** Creates an element that represents a task, including its delete button. */
function createCommentElement(comment) {
  const commentElement = document.createElement('div');
   commentElement.setAttribute('class', 'indiv-comments');

  const pElement = document.createElement('p');
  pElement.innerText = comment.user + ': ' + comment.commentText;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);

    // Remove the comment from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(pElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}


/** Tells the server to delete the task. */
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}
