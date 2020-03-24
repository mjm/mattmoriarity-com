export default {
  name: 'musicAlbum',
  type: 'document',
  title: 'Music Album',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Album name'
    },
    {
      name: 'artist',
      type: 'string',
      title: 'Artist'
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Album artwork'
    },
    {
      name: 'url',
      type: 'url',
      title: 'Apple Music URL'
    }
  ],
  preview: {
    select: {
      name: 'name',
      artist: 'artist',
      image: 'image'
    },
    prepare({ name, artist, image }) {
      return { title: name, subtitle: artist, media: image }
    }
  }
}
