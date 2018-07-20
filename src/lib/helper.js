export function getName(prefix, name) {
  return prefix + "-" + name;
}

export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function recovery($vm, key, value) {
  const type = getType($vm[key]);

  switch (type) {
    case "Object":
      Object.assign($vm[key], value);
      break;
    case "Array":
    case "String":
    case "Number":
    case "Undefined":
    case "Null":
      $vm[key] = value;
      break;
    default:
  }
}
