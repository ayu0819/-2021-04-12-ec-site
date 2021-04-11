import {createSelector} from 'reselect';

const notificationsSelector = (state) => state.notifications;

export const getNotifications = createSelector(
    [notificationsSelector],
    state => state.list
);