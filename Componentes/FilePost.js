class FilePost {
    constructor(UserContent) {
        this.UserContent = UserContent;
    }

    render = () => {
        let database = firebase.database();

        let component = document.createElement("div");
        component.className = "fileFresh";

        let postFeed = document.createElement("div"); // publicacion de content
        postFeed.innerHTML = this.UserContent.post;

        let nameFeed = document.createElement("div"); // User name
        nameFeed.className = "nameFresh";
        nameFeed.innerHTML = this.UserContent.user;

        let divComent = document.createElement("div"); //comentarios
        divComent.className = "comentSection";

        database
            .ref("user/blog" + this.UserContent.id + "/comentarios")
            .on("value", function (data) {
                divComent.innerHTML = "";
                data.forEach((postComment) => {
                    let value = postComment.val();
                    console.log(value.Coment);

                    let divMessage = document.createElement("div");

                    divMessage.className = "MessageAnswer";
                    divMessage.innerHTML = value.Coment;
                    divComent.appendChild(divMessage);
                });
            });

        let inputAnswer = document.createElement("input"); //input responde
        inputAnswer.className = "inputAnswerPost";
        inputAnswer.innerHTML = "";

        let ButtonAnswer = document.createElement("button"); //boton de respuesta
        ButtonAnswer.className = "ButtonAnswerPost";
        ButtonAnswer.innerHTML = "Answer";

        ButtonAnswer.addEventListener("click", () => {
            let Coment = {
                Coment: inputAnswer.value,
            };

            database
                .ref("user/blog" + this.UserContent.id + "/comentarios")
                .push()
                .set(Coment);
        });

        component.appendChild(postFeed);
        component.appendChild(nameFeed);
        component.appendChild(divComent);
        component.appendChild(inputAnswer);
        component.appendChild(ButtonAnswer);

        return component;
    };
}
