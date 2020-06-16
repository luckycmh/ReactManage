const flag = localStorage.getItem('annieUser');
const userId = flag ? JSON.parse(flag).userId : '';
const userName = flag ? JSON.parse(flag).mobile : '';
const orgId = flag ? JSON.parse(flag).orgId : '';
export {userId,userName,orgId}
