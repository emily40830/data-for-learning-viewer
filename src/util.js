// export const numberFormat =(number,unit)=>{

// }
export const defaultColors = [
  '#F1BFBD',
  '#EBD9B9',
  '#BACBA9',
  '#7184A6',
  '#C8C1DB',
];

export const formatUserName = (userId) => {
  if (userId.length > 10) {
    return userId.substr(0, 3) + '...' + userId.substr(-3, 3);
  } else {
    return userId.substr(0, 3) + '...';
  }
};

export const formatCourseName = (courseId) => {
  if (courseId.length > 10) {
    return courseId.substr(0, 3) + '...' + courseId.substr(-3, 3);
  } else {
    return courseId.substr(0, 3) + '...';
  }
};

export const orderBy = (data, value, direction) => {
  if (direction === 'asc') {
    return [...data].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === 'desc') {
    return [...data].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return data;
};

export const baseURL = 'http://localhost:3000/';
