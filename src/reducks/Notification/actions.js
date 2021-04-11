export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const fetchNotificationsAction = (notifications) => {
    return {
        type: "FETCH_NOTIFICATIONS",
        payload: notifications
    }
};