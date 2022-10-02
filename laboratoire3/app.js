import {Notification} from './notification.js';

window.testalert = (e) => {
    let newNotification = new Notification(
        e.id, 
        window.document.getElementById("message").value,
        );
    
    newNotification.createNotification(window.document.getElementById("notifications"));
}