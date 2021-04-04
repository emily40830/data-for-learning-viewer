// export const numberFormat =(number,unit)=>{

// }
export const defaultColors = [
  "#F1BFBD",
  "#EBD9B9",
  "#BACBA9",
  "#7184A6",
  "#C8C1DB",
];

export const formatUserName = (userId) => {
  if (userId.length > 10) {
    return userId.substr(0, 3) + "..." + userId.substr(-3, 3);
  } else {
    return userId.substr(0, 3) + "...";
  }
};

export const formatCourseName = (courseId) => {
  if (courseId.length > 10) {
    return courseId.substr(0, 3) + "..." + courseId.substr(-3, 3);
  } else {
    return courseId.substr(0, 3) + "...";
  }
};

export const orderBy = (data, value, direction) => {
  if (direction === "asc") {
    return [...data].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...data].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return data;
};

export const gredientColors = [
  "#d3e7ff", //0~20
  "e0dfe0", //21~40
  "#e8d8c5", //41~60
  "#f1cd9b", //61~80
  "#f7be57", //81~100
];

export const getColorsMapping = (number) => {
  if (Number(number) < 0 || Number(number) > 100) {
    return "#ffffff";
  }
  if (number > 0 && number < 21) {
    return gredientColors[0];
  } else if (number < 41) {
    return gredientColors[1];
  } else if (number < 61) {
    return gredientColors[2];
  } else if (number < 81) {
    return gredientColors[3];
  } else {
    return gredientColors[4];
  }
};

export const baseURL = "http://localhost:3000/";
