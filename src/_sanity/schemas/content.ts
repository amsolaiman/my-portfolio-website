import { format } from 'date-fns';
import { defineType, defineField } from 'sanity';

// ----------------------------------------------------------------------

const BUSINESS_DAYS = [
  { title: 'Sunday', value: 0 },
  { title: 'Monday', value: 1 },
  { title: 'Tuesday', value: 2 },
  { title: 'Wednesday', value: 3 },
  { title: 'Thursday', value: 4 },
  { title: 'Friday', value: 5 },
  { title: 'Saturday', value: 6 },
];

const BUSINESS_HOURS = Array.from({ length: 24 }, (_, i) => {
  const date = new Date();
  date.setHours(i + 1, 0, 0, 0);

  return {
    title: format(date, 'h:00 a'),
    value: i + 1,
  };
});

const content = defineType({
  name: 'content',
  title: 'Global Content',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Global Content',
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Must be a valid email address'),
    }),

    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
      description: 'Accepts PDF files only.',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'socialLink',
      title: 'Social links',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Name of the platform (e.g., GitHub, LinkedIn).',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required()
                  .uri({
                    scheme: ['http', 'https'],
                  })
                  .error('Must be a valid URL'),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'businessDays',
      title: 'Business days',
      type: 'object',
      description: 'Defaults to Monday-Friday if not specified.',
      fields: [
        defineField({
          name: 'start',
          title: 'Start day',
          type: 'number',
          options: {
            list: BUSINESS_DAYS,
          },
          validation: (Rule) => Rule.required().min(0).max(6),
        }),

        defineField({
          name: 'end',
          title: 'End day',
          type: 'number',
          options: {
            list: BUSINESS_DAYS,
          },
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .max(6)
              .custom((end, context) => {
                const doc = context.document as {
                  businessDays?: { start?: number; end?: number };
                };
                const start = doc?.businessDays?.start;

                if (!!start && !!end && end <= start) {
                  return 'Must be after or equal to start day';
                }

                return true;
              }),
        }),
      ],
    }),

    defineField({
      name: 'businessHours',
      title: 'Business hours',
      type: 'object',
      description: 'Defaults to 8:00 AM-5:00 PM if not specified.',
      fields: [
        defineField({
          name: 'start',
          title: 'Start hour',
          type: 'number',
          options: {
            list: BUSINESS_HOURS,
          },
          validation: (Rule) => Rule.required().min(1).max(24),
        }),

        defineField({
          name: 'end',
          title: 'End hour',
          type: 'number',
          options: {
            list: BUSINESS_HOURS,
          },
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .max(24)
              .custom((end, context) => {
                const doc = context.document as {
                  businessDays?: { start?: number; end?: number };
                };
                const start = doc?.businessDays?.start;

                if (!!start && !!end && end <= start) {
                  return 'Must be greater than start hour';
                }

                return true;
              }),
        }),
      ],
    }),

    defineField({
      name: 'skills',
      title: 'Skill set',
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
          .min(5)
          .custom((skills) => {
            if (!skills) return true;

            if (!Array.isArray(skills)) return true;

            const normalized = skills.map((s) => {
              if (typeof s !== 'string') {
                return '';
              }

              return s.toLowerCase().trim();
            });

            const unique = new Set(normalized);

            return unique.size === normalized.length
              ? true
              : 'Values must be unique';
          }),
    }),

    defineField({
      name: 'portraitImage',
      title: 'Portrait image',
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
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description: `Value will be displayed with a "©${new Date().getFullYear()}" prefix in the live preview.`,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default content;
