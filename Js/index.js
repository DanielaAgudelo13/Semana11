const userName = document.getElementById("userName"); //input
const postUser = document.getElementById("postUser"); //input
const publicButton = document.getElementById("publicButton"); //boton
const answerContainer = document.getElementById("answerContainer");

publicSometing = () => {
    if (userName.value === "" || postUser === "") {
        alert("Por favor llene los campos");
        return;
    }

    let reference = db.ref("user/blog").push();
    let userPublication = {
        id: reference.key,
        user: userName.value,
        post: postUser.value,
    };

    reference.set(userPublication);

    userName.value = "";
    postUser.value = "";
};

publicButton.addEventListener("click", publicSometing);

db.ref("user/blog").on("value", function (data) {
    data.forEach((userPublication) => {
        let value = userPublication.val();
        console.log(value.post);

        let colum = new FilePost(value);
        answerContainer.appendChild(colum.render());
    });
});
