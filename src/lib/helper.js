import merge from "lodash/merge";

export function getName(prefix, name) {
  return prefix + "-" + name;
}

export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function isStorable(value) {
  const type = getType(value);
  return "Number,String,Boolean,Null,Object,Array".indexOf(type) !== -1;
}

export function mergeObject(object, sources) {
  return merge(object, sources);
}

// export function mergeArray(array, sources) {
//   for (let i = 0, len = sources.length; i < len; i++) {
//     const sourcesItem = sources[i];
//     const type = getType(item);

//     switch (type) {
//       case "Object":
//         mergeObject();
//         break;
//       case "Array":
//       case "String":
//       case "Number":
//       case "Undefined":
//       case "Null":
//         $vm[key] = value;
//         break;
//       default:
//     }
//   }
// }
