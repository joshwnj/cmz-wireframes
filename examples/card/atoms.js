const atoms = cmz('Atoms', {
  box: `
  flex: 1;
  margin: .5rem;
  padding: .5rem;
  outline: 2px solid #000;
  `
})

const helpers = {
  padding: function (factor) {
    return cmz(`padding: ${factor}rem`)
  },

  border: function (size) {
    return cmz(`
      border: ${size}px solid #000;
      margin-top: -${size}px;
    `)
  },

  container: function (width) {
    return cmz(`
      width: ${width}px;
      display: flex;
      align-items: flex-start;
    `)
  },

  circle: function (size) {
    return cmz(`
      & {
        width: ${size}px;
        height: ${size}px;
        margin-right: .5rem;
      }

      & > .content {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #999;
      }
    `)
  },

  text: function (opts) {
    opts = opts || { color: '#CCC' }
    return cmz(`
      & > .content {
        display: block;
        background: ${opts.color};
        border-radius: 3px;
        height: .75em;
        margin-bottom: .25em;
      }
    `)
  },

  multiLineText: function multiLineText (numLines) {
    const output = []
    for (var i=0; i < numLines-1; i += 1) {
      output.push(`
        & > .content:nth-child(${i+1}) {
          width: ${100 - (Math.random() * 20)}%;
        }`)
    }

    output.push(`
      & > .content:last-child {
        width: 66%;
      }
    `)

    return cmz(output.join('\n')).compose(text())
  }
}
