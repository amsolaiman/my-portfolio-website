import { format } from 'date-fns';
import { defineField, defineType } from 'sanity';

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

const website = defineType({
  name: 'website',
  title: 'Website Config',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Website Config',
      };
    },
  },
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'Accepts PNG, JPG/JPEG and WEBP images only. Recommended resolution is approximately 512x512 pixels.',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
      validation: (Rule) => Rule.required(),
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

                if (start !== undefined && end !== undefined && end < start) {
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
                  businessHours?: { start?: number; end?: number };
                };
                const start = doc?.businessHours?.start;

                if (start !== undefined && end !== undefined && end <= start) {
                  return 'Must be greater than start hour';
                }

                return true;
              }),
        }),
      ],
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
      name: 'llmsTxt',
      title: 'LLMs content',
      type: 'text',
      rows: 20,
      description:
        'Raw markdown content served at /llms.txt for AI crawlers and LLMs. Written in the llms.txt convention (https://llmstxt.org).',
    }),
  ],
});

export default website;
