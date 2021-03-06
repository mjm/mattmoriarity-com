import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdNextWeek } from 'react-icons/md'
import IframePreview from '../previews/IframePreview'

// Web preview configuration
const remoteURL = 'https://mattmoriarity-com.netlify.com'
const localURL = 'http://localhost:8000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = props => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props
  if (schemaType === 'post' || schemaType === 'micropost') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .title('Web preview')
        .options({ previewURL })
    ])
  }
  return S.document().views([S.view.form()])
}

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Resume')
        .icon(MdNextWeek)
        .child(
          S.editor().id('resume').schemaType('resume').documentId('resume')
        ),
      S.divider(),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .defaultOrdering([
              {
                field: 'publishedAt',
                direction: 'desc'
              }
            ])
            .title('Blog posts')
        ),
      S.listItem()
        .title('Microblog posts')
        .schemaType('micropost')
        .child(
          S.documentTypeList('micropost')
            .defaultOrdering([
              {
                field: 'publishedAt',
                direction: 'desc'
              }
            ])
            .title('Microblog posts')
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Post series')
        .schemaType('series')
        .child(S.documentTypeList('series').title('Post series')),
      S.divider(),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Music albums')
        .schemaType('musicAlbum')
        .child(
          S.documentTypeList('musicAlbum')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
            .title('Music albums')
        ),
      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      ...S.documentTypeListItems().filter(
        listItem =>
          ![
            'page',
            'post',
            'micropost',
            'series',
            'project',
            'musicAlbum',
            'siteSettings',
            'resume'
          ].includes(listItem.getId())
      )
    ])
