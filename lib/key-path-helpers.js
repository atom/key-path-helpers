const ESCAPED_DOT = /\\\./g

function hasKeyPath (object, keyPath) {
  var keys = splitKeyPath(keyPath)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    if (object == null || !object.hasOwnProperty(key)) {
      return false
    }
    object = object[key]
  }
  return true
}

function getValueAtKeyPath (object, keyPath) {
  if (!keyPath) return object

  var keys = splitKeyPath(keyPath)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    object = object[key]
    if (object == null) {
      return object
    }
  }
  return object
}

function setValueAtKeyPath (object, keyPath, value) {
  var keys = splitKeyPath(keyPath)
  while (keys.length > 1) {
    var key = keys.shift()
    if (object[key] == null) {
      object[key] = {}
    }
    object = object[key]
  }
  object[keys.shift()] = value
}

function splitKeyPath (keyPath) {
  if (keyPath == null) return []

  var startIndex = 0, keyPathArray = []
  for (var i = 0, len = keyPath.length; i < len; i++) {
    var char = keyPath[i]
    if (char === '.' && (i === 0 || keyPath[i - 1] !== '\\')) {
      keyPathArray.push(keyPath.substring(startIndex, i).replace(ESCAPED_DOT, '.'))
      startIndex = i + 1
    }
  }
  keyPathArray.push(keyPath.substr(startIndex, keyPath.length).replace(ESCAPED_DOT, '.'))

  return keyPathArray
}

module.exports = {
  hasKeyPath: hasKeyPath,
  getValueAtKeyPath: getValueAtKeyPath,
  setValueAtKeyPath: setValueAtKeyPath,
  splitKeyPath: splitKeyPath
}
