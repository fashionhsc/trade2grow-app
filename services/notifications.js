import api from "./api";

export async function sendNotificationToAll(title, body, data) {
    try {
        await api.post(`/notify/send/notification`, { title, body, data });
        console.log("Notification request sent ✅");
    } catch (error) {
        console.error("Error sending notification:", error.response?.data || error.message);
    }
}

export async function sendNotification(userId, title, body, data) {
    try {
        await api.post(`/notify/send/notification/${userId}`, { title, body, data });
        console.log("Notification request sent ✅");
    } catch (error) {
        console.error("Error sending notification:", error.response?.data || error.message);
    }
}
