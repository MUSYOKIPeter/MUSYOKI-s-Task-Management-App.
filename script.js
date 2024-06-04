firebase.initializeApp({
    apiKey: "AIzaSyAMBeYLSERHnZEiPwRlSG1viq7V2dtgQgo",
    authDomain: "a-task-management-application.firebaseapp.com",
    projectId: "a-task-management-application",
    storageBucket: "a-task-management-application.appspot.com",
    messagingSenderId: "874167862191",
    appId: "1:874167862191:web:03372b507e78dab77be55a" 
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

// Function to render tasks

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
}
