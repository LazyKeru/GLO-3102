export class Notification {
    constructor(type, message){
        this.type = type;
        this.message = message;
        this.element;
    }

    createNotification = (parentElement) => {
        this.element = parentElement.appendChild(this.HTMLcomponent());
        this.coolDownNotification();
    }

    coolDownNotification = () => {
        setTimeout(()=>this.deleteNotification(),3000)
    }

    deleteNotification = () => {
        let fade = setInterval(
            ()=>{
                console.log(this.element.style.opacity);
                if (this.element.style.opacity <= 0.05) {
                    this.element.remove();
                    clearInterval(fade);
                } else {
                    this.element.style.opacity -= 0.05;
                }
            },
            50
        )
        fade;
    }

    HTMLcomponent = () => {
        const container = document.createElement("div");
        const type_p = document.createElement("p").appendChild(document.createTextNode(this.type + " : "));
        const message_p = document.createElement("p").appendChild(document.createTextNode((this.message != "") ? this.message : "empty"));
        container.appendChild(type_p);
        container.appendChild(message_p);
        /*set div style*/
        switch(this.type){
            case "error":
                container.style.backgroundColor = '#ff4122';
                container.style.borderColor = '#c61a09';
                container.style.color = '#ffc9bb';
                break;
            case "success":
                container.style.backgroundColor = '#87ab69';
                container.style.borderColor = '#4b6043';
                container.style.color = '#ddead1';
                break;
            case "information":
                container.style.backgroundColor = '#1663be';
                container.style.borderColor = '#104a8e';
                container.style.color = '#bbd2ec';
                break;
            default:
                container.style.backgroundColor = 'black';
                container.style.borderColor = 'gray';
                container.style.color = 'white';
                break;
        }
        container.style.borderRadius = '0 1rem 1rem 0';
        container.style.borderWidth = '0 0 0 0.25rem'
        container.style.borderStyle = 'solid';
        container.style.margin = '1vh';
        container.style.padding = '1rem';
        container.style.opacity = '1';
        return container;
    };
}