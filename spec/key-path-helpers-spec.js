const helpers = require('../lib/key-path-helpers')
const hasKeyPath = helpers.hasKeyPath
const getValueAtKeyPath = helpers.getValueAtKeyPath
const setValueAtKeyPath = helpers.setValueAtKeyPath
const splitKeyPath = helpers.splitKeyPath
const pushKeyPath = helpers.pushKeyPath
const deleteValueAtKeyPath = helpers.deleteValueAtKeyPath

describe("hasKeyPath(object, keyPath)", function () {
  it("determines whether or not the given key path exists", function () {
    const object = {
      a: {
        b: {
          c: 2
        },
        d: null
      }
    }

    expect(hasKeyPath(object, 'a.b.c')).toBe(true)
    expect(hasKeyPath(object, 'a.b')).toBe(true)
    expect(hasKeyPath(object, 'a.x')).toBe(false)
    expect(hasKeyPath(object, 'a.d')).toBe(true)
    expect(hasKeyPath(object, 'a.d.e')).toBe(false)
  })
})

describe("getValueAtKeyPath(object, keyPath)", function () {
  it("gets the value at the given key path or undefined if none exists", function () {
    const object = {
      a: {
        b: {
          c: 2
        },
        d: null
      }
    }

    expect(getValueAtKeyPath(object, 'a.b.c')).toBe(2)
    expect(getValueAtKeyPath(object, 'a.b')).toEqual({
      c: 2
    })
    expect(getValueAtKeyPath(object, 'a.x')).toBeUndefined()
    expect(getValueAtKeyPath(object, 'a.d')).toBeNull()
    expect(getValueAtKeyPath(object, 'a.d.e')).toBeNull()
    expect(getValueAtKeyPath(object, '')).toBe(object)
    expect(getValueAtKeyPath(object, null)).toBe(object)
    expect(getValueAtKeyPath(object, void 0)).toBe(object)
  })
})

describe("setValueAtKeyPath(object, keyPath, value)", function () {
  it("sets the value at the given key path, creating intermediate objects if necessary", function () {
    const object = {}

    setValueAtKeyPath(object, 'a.b.c', 1)
    setValueAtKeyPath(object, 'd', 2)
    setValueAtKeyPath(object, 'e.f', null)

    expect(object).toEqual({
      a: {
        b: {
          c: 1
        }
      },
      d: 2,
      e: {
        f: null
      }
    })
  })
})

describe("deleteValueAtKeyPath(object, keyPath)", function() {
  it("deletes the given key-path", function () {
    const object = {
      a: {
        b: {
          c: 1,
          d: 2
        }
      }
    };

    deleteValueAtKeyPath(object, 'a.b.c')
    expect(object).toEqual({
      a: {
        b: {
          d: 2
        }
      }
    });

    deleteValueAtKeyPath(object, 'a.b.x.y')
    expect(object).toEqual({
      a: {
        b: {
          d: 2
        }
      }
    });

    deleteValueAtKeyPath(object, 'a.b.d')
    expect(object).toEqual({
      a: {
        b: {}
      }
    });

    deleteValueAtKeyPath(object, 'a.b')
    expect(object).toEqual({
      a: {}
    });
  })
})

describe("splitKeyPath(keyPath)", function () {
  it("splits key paths on . characters, unless they're escaped", function () {
    expect(splitKeyPath('a.b.c')).toEqual(['a', 'b', 'c'])
    expect(splitKeyPath('a\\.b.c\\.d.efg')).toEqual(['a.b', 'c.d', 'efg'])
  })
})

describe("pushKeyPath(keyPath, key)", function () {
  it("adds the given key to the key-path", function () {
    expect(pushKeyPath('a.b', 'c')).toEqual('a.b.c')
    expect(pushKeyPath('a.b', 'c.d')).toEqual('a.b.c\\.d')

    expect(splitKeyPath(pushKeyPath(
      'a',
      'c.d'
    ))).toEqual([
      'a',
      'c.d'
    ])
  })
})
