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
    const response = await fetch(url);
    const loginJSON = await response.json();
    return loginJSON;
}

/** Loads and displays comments according to a limit */
async function loadCommentSection(commentLimit) {
    const userLoginInfo = await getUserLoginStatus();
    const isLoggedIn = userLoginInfo.loginStatus;

    // clear previous elements to refresh login status
    const loginDOM = document.getElementsByClassName('login');
    if (loginDOM != null) {
        for (element of Array.from(loginDOM)) {
            element.remove();
        }
    }

    // clear previous elements to refresh comments
    const commentDOM = document.getElementsByClassName('indiv-comments');
    if (commentDOM != null) {
        for (element of Array.from(commentDOM)) {
            element.remove();
        }
    }

    // if user is logged in, display comments
    const loginSection = document.getElementById('content');
    if (isLoggedIn) {
        loginSection.appendChild(createLoggedInSection(userLoginInfo));
        document.getElementById('comment').value = userLoginInfo.userEmail;
        document.getElementById('post-content').style.display = "block";
        const commentURL = `/list-comments?limit=${commentLimit}`;
        fetch(commentURL)
        .then(response => response.json())
        .then(comments => {
        // Build the list of comments.
        const commentLe = document.getElementById('post-content');
        for (comment of comments) {
            commentLe.appendChild(createCommentElement(comment));
        }
        });
    }
    else {
        loginSection.appendChild(createLoggedOutSection(userLoginInfo));    
        document.getElementById('post-content').style.display = "none";
    }
}

/** Creates a section based on user being logged in. */
function createLoggedInSection(userInfo) {
    const divForLogin = document.createElement('div')
    const greetUser = document.createElement('h2');
    greetUser.innerText = `Hello ${userInfo.userEmail}!`;
    const logoutElement = document.createElement('button');
    logoutElement.innerHTML = `Logout`;
    logoutElement.onclick = () => {
        location.href=`${userInfo.logoutUrl}`;
    }
    divForLogin.setAttribute('class', 'login');
    divForLogin.appendChild(greetUser);
    divForLogin.appendChild(logoutElement);
    return divForLogin;
}

/** Creates a section based on user being logged out. */
function createLoggedOutSection(userInfo) {
    const divForLogout = document.createElement('div')
    divForLogout.setAttribute('class', 'login');
    const greetUser = document.createElement('h2');
    greetUser.innerText = `Hello, please login!`;
    const loginElement = document.
    createElement('button');
    loginElement.innerHTML = `Login`;
    loginElement.onclick = () => {
        location.href=`${userInfo.loginUrl}`;
    }
    divForLogout.setAttribute('class', 'login');
    divForLogout.appendChild(greetUser);
    divForLogout.appendChild(loginElement);
    return divForLogout;
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