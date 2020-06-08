const userId = localStorage.getItem('annieUser').userId || '';
const userName = JSON.parse(localStorage.getItem('annieUser')).mobile || '';
const orgId = JSON.parse(localStorage.getItem('annieUser')).orgId || '';
export {userId,userName,orgId}
