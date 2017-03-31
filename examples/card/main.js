const defaultStyle = cmz(`
  flex: 1;
  margin: .5rem;
  padding: .5rem;
  outline: 2px solid #000;
`)

function createSingleMediaItem (lines) {
  return createMediaItem(container(500), lines)
}

function createMediaItem (rootAtom, lines) {
  if (lines === undefined) { lines = randomInt(1, 3) }

  const MediaItem = wire('MediaItem', [
    'Pic',
    group('Body', [
      'Title',
      'Description'
    ])
  ])

  MediaItem.compose(
    defaultStyle,
    rootAtom
  )

  MediaItem.setDefaultStyle(defaultStyle)

  MediaItem.Pic.compose(circle(64))
  MediaItem.Body.css('flex: 1')

  MediaItem.Title.compose(
    text({ color: '#F66' })
  ).css(`
    width: 75%;
    font-size: 2rem;
  `)

  MediaItem.Description.compose(
    multiLineText(lines)
  ).content(
    `<div class="content"></div>`.repeat(lines)
  )

  return MediaItem
}

const listItemContainer = cmz(`
  display: flex;
  min-width: 200px;
  max-width: 400px;
  width: 40%;
`)

const List = wire('MediaItemList', [
  createMediaItem(listItemContainer),
  createMediaItem(listItemContainer),
  createMediaItem(listItemContainer)
])

List.css(`
& {
  display: flex;
  flex-wrap: wrap;
}
`)

// ----

const el = document.getElementById('root')
el.innerHTML = `
<h1>Single</h1>
${render(createSingleMediaItem())}

<h1>List</h1>
${render(List)}
`

// ----
// atoms

function padding (factor) {
  return cmz(`padding: ${factor}rem`)
}

function border (size) {
  return cmz(`
border: ${size}px solid #000;
margin-top: -${size}px;
`)
}

function container (width) {
  return cmz(`
width: ${width}px;
display: flex;
align-items: flex-start;
`)
}

function circle (size) {
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
}

function text (opts) {
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
}

function multiLineText (numLines) {
  const output = []
  for (var i=0; i < numLines-1; i += 1) {
    output.push(`& > .content:nth-child(${i+1}) {
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
