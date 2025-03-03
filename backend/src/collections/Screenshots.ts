import type { CollectionConfig } from 'payload'

export const Screenshots: CollectionConfig = {
  slug: 'screenshots',
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
