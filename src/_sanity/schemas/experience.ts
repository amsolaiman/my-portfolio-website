import { defineType, defineField } from 'sanity';
import { parseISO, isBefore, isEqual } from 'date-fns';

// ----------------------------------------------------------------------

const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Self-employed', value: 'self-employed' },
          { title: 'Freelance', value: 'freelance' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
          { title: 'Apprenticeship', value: 'apprenticeship' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Student', value: 'student' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isCurrent',
      title: 'I am currently working in this role',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Leave empty if this item is a current role.',
      readOnly: ({ document }) => !!document?.isCurrent,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isCurrent = context.document?.isCurrent as boolean | undefined;
          const startDate = context.document?.startDate as string | undefined;

          if (isCurrent && value) {
            return 'Must be empty';
          }
          if (!isCurrent && !value) {
            return 'Required';
          }
          if (value && startDate) {
            const start = parseISO(startDate);
            const end = parseISO(value);

            if (isBefore(end, start) || isEqual(end, start)) {
              return 'Must be later than start date';
            }
          }
          return true;
        }),
    }),

    defineField({
      name: 'employer',
      title: 'Company or organization',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value?.name) {
            return 'Name is required';
          }
          return true;
        }),
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),

        defineField({
          name: 'link',
          title: 'Website link',
          type: 'url',
        }),
      ],
    }),
  ],
});

export default experience;
