export class Notification {
    constructor(type, message){
        this.type = type;
        this.message = message;
        this.element;
    }

    createNotification = (parentElement) => {
        this.element = parentElement.appendChild(this.HTMLcomponent());
        setTimeout(() => this.element.remove(),5000);
    }

    coolDownNotification = () => {
        setTimeout(() => this.element.remove(),5000);
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
                container.style.backgroundColor = 'red';
                container.style.color = 'white';
                break;
            case "success":
                container.style.backgroundColor = 'green';
                container.style.color = 'white';
                break;
            case "information":
                container.style.backgroundColor = 'blue';
                container.style.color = 'white';
                break;
            default:
                container.style.backgroundColor = 'black';
                container.style.color = 'white';
                break;

        }
        container.style.margin = '1vh';
        container.style.padding = '1rem';
        return container;
    };
}