import { defineType, defineField } from 'sanity';
import { SparkleIcon } from '@sanity/icons';

// ----------------------------------------------------------------------

const projects = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description:
        'Emphasis to certain words or phrases applies stand-out styling to them on the frontend.',
      of: [
        defineField({
          name: 'block',
          type: 'block',
          marks: {
            decorators: [
              {
                title: 'Emphasis',
                value: 'em',
                icon: SparkleIcon,
              },
            ],
            annotations: [], // removes Link and any other annotations
          },
          styles: [], // removes font size options and any other styles
          lists: [], // removes Bullet and Numbered list options and any other list types
        }),
      ],
    }),

    defineField({
      name: 'client',
      title: 'Client name',
      type: 'string',
    }),

    defineField({
      name: 'type',
      title: 'Project type',
      type: 'string',
      options: {
        list: [
          { title: 'Development', value: 'dev' },
          { title: 'Design', value: 'design' },
          { title: 'Design & Development', value: 'design & dev' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'techStack',
      title: 'Techologies',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((techs) => {
            if (!techs) return true;

            if (!Array.isArray(techs)) return true;

            const normalized = techs.map((t) => {
              if (typeof t !== 'string') {
                return '';
              }

              return t.toLowerCase().trim();
            });

            const unique = new Set(normalized);

            return unique.size === normalized.length
              ? true
              : 'Values must be unique';
          }),
    }),

    defineField({
      name: 'isOngoing',
      title: 'I am currently working on this project',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'date',
      title: 'Date completed',
      type: 'date',
      description: 'Leave empty if this item is an ongoing project.',
      readOnly: ({ document }) => !!document?.isOngoing,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isOngoing = context.document?.isOngoing;

          if (isOngoing && value) {
            return 'Must be empty';
          }
          if (!isOngoing && !value) {
            return 'Required';
          }
          return true;
        }),
    }),

    defineField({
      name: 'posterImage',
      title: 'Poster image',
      type: 'image',
      description:
        'Accepts PNG, JPG/JPEG and WEBP images only. Recommended aspect ratio is approximately 3:4 (width to height).',
      options: {
        hotspot: true,
        accept: 'image/png, image/jpeg, image/webp',
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      description:
        'Accepts PNG, JPG/JPEG and WEBP images only. Recommended aspect ratio is approximately 16:9 (width to height).',
      options: {
        hotspot: true,
        accept: 'image/png, image/jpeg, image/webp',
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      description: 'Accepts PNG, JPG/JPEG and WEBP images only.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/png, image/jpeg, image/webp',
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'previewUrl',
      title: 'Preview URL',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value?.type && !value?.link) {
            return 'Link is required';
          }
          if (value?.link && !value?.type) {
            return 'Type is required';
          }
          return true;
        }),
      fields: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),

        defineField({
          name: 'type',
          title: 'Preview type',
          type: 'string',
          options: {
            list: [
              { title: 'Live', value: 'live' },
              { title: 'Demo', value: 'demo' },
            ],
            layout: 'radio',
          },
        }),
      ],
    }),

    defineField({
      name: 'designUrl',
      title: 'Design URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      description: `Sets the item's alignment on the frontend.`,
      options: {
        list: [
          { title: 'Start / top', value: 'start' },
          { title: 'Center', value: 'center' },
          { title: 'End / bottom', value: 'end' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default projects;
