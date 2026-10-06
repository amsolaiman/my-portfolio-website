import { defineType, defineField } from 'sanity';

// ----------------------------------------------------------------------

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
      name: 'socialLinks',
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
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description: `Value will be displayed with a "©${new Date().getFullYear()}" prefix in the live preview.`,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default content;
