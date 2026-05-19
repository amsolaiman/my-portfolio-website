import type { StructureResolver } from 'sanity/structure';

// ----------------------------------------------------------------------

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Global Content')
        .id('content-singleton')
        .child(S.document().schemaType('content').documentId('global-content')),

      // Add other document types below as usual
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'content'
      ),
    ]);
