const {
  circle,
  container,
  multiLineText,
  text
} = helpers

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
    atoms.box,
    rootAtom
  )

  MediaItem.setDefaultStyle(atoms.box)

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
  display: flex;
  flex-wrap: wrap;
`)

// ----

const el = document.getElementById('root')
el.innerHTML = `
<h1>Single</h1>
${render(createSingleMediaItem())}

<h1>List</h1>
${render(List)}
`
