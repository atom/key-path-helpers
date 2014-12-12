{hasKeyPath, getValueAtKeyPath, setValueAtKeyPath, splitKeyPath} = require '../src/key-path-helpers'

describe "hasKeyPath(object, keyPath)", ->
  it "determines whether or not the given key path exists", ->
    object = {a: {b: {c: 2}, d: null}}
    expect(hasKeyPath(object, 'a.b.c')).toBe true
    expect(hasKeyPath(object, 'a.b')).toBe true
    expect(hasKeyPath(object, 'a.x')).toBe false
    expect(hasKeyPath(object, 'a.d')).toBe true
    expect(hasKeyPath(object, 'a.d.e')).toBe false

describe "getValueAtKeyPath(object, keyPath)", ->
  it "gets the value at the given key path or undefined if none exists", ->
    object = {a: {b: {c: 2}, d: null}}
    expect(getValueAtKeyPath(object, 'a.b.c')).toBe 2
    expect(getValueAtKeyPath(object, 'a.b')).toEqual {c: 2}
    expect(getValueAtKeyPath(object, 'a.x')).toBeUndefined()
    expect(getValueAtKeyPath(object, 'a.d')).toBeNull()
    expect(getValueAtKeyPath(object, 'a.d.e')).toBeNull()
    expect(getValueAtKeyPath(object, '')).toBe object
    expect(getValueAtKeyPath(object, null)).toBe object
    expect(getValueAtKeyPath(object, undefined)).toBe object

describe "setValueAtKeyPath(object, keyPath)", ->
  it "sets the value at the given key path, creating intermediate objects if necessary", ->
    object = {}
    setValueAtKeyPath(object, 'a.b.c', 1)
    setValueAtKeyPath(object, 'd', 2)
    setValueAtKeyPath(object, 'e.f', null)
    expect(object).toEqual {a: {b: c: 1}, d: 2, e: {f: null}}

describe "splitKeyPath(keyPath)", ->
  it "splits key paths on . characters, unless they're escaped", ->
    expect(splitKeyPath('a.b.c')).toEqual ['a', 'b', 'c']
    expect(splitKeyPath('a\\.b.c\\.d')).toEqual ['a\\.b', 'c\\.d']
