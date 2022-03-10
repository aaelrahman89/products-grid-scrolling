import moment from 'moment'

export const centsToDollars = cents => cents / 100;

export const customDate = (date) => {
    let agoNumber = Number(moment(date).fromNow().substring(0,2));
    return agoNumber > 7 ? date : moment(date).fromNow();
  }