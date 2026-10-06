import type { StructureResolver } from 'sanity/structure';

// ----------------------------------------------------------------------

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Website Config')
        .id('website-config-singleton')
        .child(S.document().schemaType('website').documentId('website-config')),

      S.listItem()
        .title('Global Content')
        .id('global-content-singleton')
        .child(S.document().schemaType('content').documentId('global-content')),

      // Add other document types below as usual
      ...S.documentTypeListItems().filter(
        (listItem) => !['website', 'content'].includes(listItem.getId() || '')
      ),
    ]);
