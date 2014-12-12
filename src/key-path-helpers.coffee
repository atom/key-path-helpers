hasKeyPath = (object, keyPath) ->
  keys = splitKeyPath(keyPath)
  for key in keys
    return false unless object?.hasOwnProperty(key)
    object = object[key]
  true

getValueAtKeyPath = (object, keyPath) ->
  keys = splitKeyPath(keyPath)
  for key in keys
    object = object[key]
    return object unless object?
  object

setValueAtKeyPath = (object, keyPath, value) ->
  keys = splitKeyPath(keyPath)
  while keys.length > 1
    key = keys.shift()
    object[key] ?= {}
    object = object[key]
  object[keys.shift()] = value

splitKeyPath = (keyPath) ->
  return [] unless keyPath?
  startIndex = 0
  keyPathArray = []
  for char, i in keyPath
    if char is '.' and (i is 0 or keyPath[i-1] != '\\')
      keyPathArray.push keyPath.substring(startIndex, i)
      startIndex = i + 1
  keyPathArray.push keyPath.substr(startIndex, keyPath.length)
  keyPathArray

module.exports = {
  hasKeyPath, getValueAtKeyPath, setValueAtKeyPath, splitKeyPath
}
