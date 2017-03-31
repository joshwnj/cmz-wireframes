function group (name, children) {
  return {
    _type: 'group',
    _name: name,
    _children: children || []
  }
}

function wire (name, children, owner) {
  const moduleName = owner ? owner._name : name

  const atomName = (name === moduleName) ? name : `${moduleName}__${name}`
  const elem = {
    _type: 'wire',
    _name: name,
    _content: null,
    _atomName: atomName,
    _atom: null,
    _defaultStyle: null,
    _children: []
  }

  children && children.forEach((ch) => {
    // add existing wireframe modules as-is
    if (ch._type === 'wire') {
      elem._children.push(ch)
      return
    }

    // incorporate groups to the current module
    if (ch._type === 'group') {
      elem._children.push(wire(ch._name, ch._children, elem))
      return
    }

    // add plain children
    elem._children.push(wire(ch, [], elem))
  })

  // alias children to owner
  elem._children.forEach((ch) => (owner || elem)[ch._name] = ch)

  // functions
  elem.compose = function () {
    const comps = Array.prototype.slice.apply(arguments)
    if (!elem._atom) {
      elem._atom = new cmz.Atom(elem._atomName, ' ')
    }

    elem._atom.compose(comps)
    return elem
  }

  elem.css = function (css) {
    if (!elem._atom) { elem._atom = new cmz.Atom(elem._atomName, css) }
    else { elem._atom.raw += css }

    return elem
  }

  elem.setDefaultStyle = function (comps) {
    elem._defaultStyle = comps
  }

  elem.content = function (content) {
    elem._content = content
    return elem
  }

  return elem
}

function render (node, defaultStyle) {
  if (node._defaultStyle) {
    defaultStyle = node._defaultStyle
  }

  const atom = node._atom || defaultStyle

  const content = node._content || `<div class="content"></div>`
  const children = node._children.length ?
        node._children.map((ch) => render(ch, defaultStyle)).join('\n') :
        content

  return `<div data-name="${node._name}" class="${atom}">${children}</div>`
}

function randomInt (from, to) {
  const r = Math.random()
  const diff = to - from
  return Math.round(r * diff) + from
}
